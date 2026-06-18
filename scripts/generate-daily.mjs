import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { XMLParser } from 'fast-xml-parser';

const ROOT = new URL('..', import.meta.url).pathname;
const OUTPUT_DIR = path.join(ROOT, 'src/content/writing');
const isSunday = new Date().getUTCDay() === 0;
const DRY_RUN = process.env.DRY_RUN === '1';

const feeds = [
  ['OpenAI News', 'https://openai.com/news/rss.xml'],
  ['Google DeepMind', 'https://deepmind.google/blog/rss.xml'],
  ['TechCrunch AI', 'https://techcrunch.com/category/artificial-intelligence/feed/'],
  ['Lenny’s Newsletter', 'https://www.lennysnewsletter.com/feed']
];

const parser = new XMLParser({ ignoreAttributes: false, removeNSPrefix: true });

function asArray(value) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function clean(value = '') {
  return String(value)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

async function readFeed([source, url]) {
  try {
    const response = await fetch(url, { headers: { 'user-agent': 'kritikarastogi.com editorial research/1.0' } });
    if (!response.ok) throw new Error(`${response.status}`);
    const data = parser.parse(await response.text());
    const items = asArray(data?.rss?.channel?.item ?? data?.feed?.entry).slice(0, 5);
    return items.map((item) => ({
      source,
      title: clean(item.title),
      url: clean(item.link?.['@_href'] ?? item.link),
      date: clean(item.pubDate ?? item.published ?? item.updated),
      summary: clean(item.description ?? item.summary ?? item.content).slice(0, 600)
    })).filter((item) => item.title && item.url);
  } catch (error) {
    console.warn(`Skipped ${source}: ${error.message}`);
    return [];
  }
}

function editorialPrompt(signals) {
  return `You are the research and drafting system for Kritika Rastogi, an analytical, warm, sophisticated product marketer with experience in AI, B2B SaaS, platform GTM, customer research, lifecycle, and enablement.

Write one ${isSunday ? '900-1200 word evidence-led essay' : '450-700 word sharp field note'} for a portfolio read by startup founders and product leaders. Develop one non-obvious product marketing implication from the source packet. Do not summarize the news. Make an argument a working PMM can use.

VOICE
- First person is allowed for analysis ("I think"), never for experiences Kritika did not have.
- Clear, specific, commercially literate, and human. Use connected prose with natural paragraph rhythm.
- Avoid staccato sequences of short declarative sentences. Do not manufacture drama with one-line fragments or transitions such as "Then everything changed" and "This is where...".
- Avoid the stock contrast template "X is not Y. It is Z." Express contrasts through a developed sentence or concrete explanation instead.
- No hype, generic inspiration, fake quotes, invented data, or phrases such as "in today's fast-paced landscape", "game-changer", "delve", "unlock", or "revolutionize".
- Separate sourced facts from your inference. Do not imply endorsement by a source.

QUALITY BAR
- One defensible thesis in the opening 100 words.
- 2-4 useful section headings.
- At least one concrete framework, diagnostic, or set of questions.
- Cite factual source-dependent claims as Markdown links to packet URLs.
- End with a clear implication, not a generic summary.
- Do not copy more than 10 consecutive words from a source.

Return strict JSON only with this shape:
{"title":"...","description":"...","topic":"AI & PMM|Positioning|Customer Insight|GTM|Enablement","kind":"${isSunday ? 'Essay' : 'Field Note'}","body":"Markdown without an H1","sources":[{"label":"...","url":"https://..."}]}

SOURCE PACKET
${signals.map((item, i) => `[${i + 1}] ${item.source}: ${item.title}\nURL: ${item.url}\nPublished: ${item.date}\nContext: ${item.summary}`).join('\n\n')}`;
}

async function callModel(prompt) {
  if (process.env.ANTHROPIC_API_KEY) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5-20250929',
        max_tokens: isSunday ? 2200 : 1500,
        temperature: 0.6,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    if (!response.ok) throw new Error(`Anthropic API ${response.status}: ${await response.text()}`);
    const data = await response.json();
    return data.content?.find((block) => block.type === 'text')?.text;
  }

  if (process.env.OPENAI_API_KEY) {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-5.4-mini',
        input: prompt,
        max_output_tokens: isSunday ? 2600 : 1800
      })
    });
    if (!response.ok) throw new Error(`OpenAI API ${response.status}: ${await response.text()}`);
    const data = await response.json();
    const outputText = asArray(data.output)
      .flatMap((item) => asArray(item.content))
      .filter((content) => content.type === 'output_text')
      .map((content) => content.text)
      .join('\n')
      .trim();
    if (!outputText) throw new Error(`OpenAI response contained no output text (status: ${data.status ?? 'unknown'}).`);
    return outputText;
  }

  throw new Error('Set ANTHROPIC_API_KEY or OPENAI_API_KEY. Codex subscriptions do not expose an unattended publishing API.');
}

function parseDraft(raw) {
  const match = raw?.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('Model did not return JSON.');
  const draft = JSON.parse(match[0]);
  const allowedTopics = ['AI & PMM', 'Positioning', 'Customer Insight', 'GTM', 'Enablement'];
  const packetUrls = new Set(globalThis.packet.map((item) => item.url));
  const words = String(draft.body || '').trim().split(/\s+/).length;
  const hasStaccatoParagraph = String(draft.body || '').split(/\n\s*\n/).some((paragraph) => {
    const sentences = paragraph.replace(/[#>*_`-]/g, '').match(/[^.!?]+[.!?]+/g) || [];
    let shortRun = 0;
    return sentences.some((sentence) => {
      shortRun = sentence.trim().split(/\s+/).length <= 7 ? shortRun + 1 : 0;
      return shortRun >= 3;
    });
  });

  if (!draft.title || !draft.description || !draft.body) throw new Error('Draft is missing required fields.');
  if (!allowedTopics.includes(draft.topic)) throw new Error(`Invalid topic: ${draft.topic}`);
  if (words < (isSunday ? 700 : 350)) throw new Error(`Draft is too short: ${words} words.`);
  if (words > (isSunday ? 1400 : 850)) throw new Error(`Draft is too long: ${words} words.`);
  if (draft.title.length > 85 || draft.description.length > 180) throw new Error('Title or description is too long.');
  if (/in today'?s|fast-paced landscape|game-changer|\bdelve\b|\bunlock\b|revolutioni[sz]e/i.test(draft.body)) throw new Error('Draft failed the language quality gate.');
  if (hasStaccatoParagraph || /\bThis is where\b|\bThen everything changed\b|\bThe goal is not\b/i.test(draft.body)) throw new Error('Draft failed the prose rhythm quality gate.');
  if (!asArray(draft.sources).length) throw new Error('Draft has no sources.');
  if (asArray(draft.sources).some((source) => !packetUrls.has(source.url))) throw new Error('Draft cited a URL outside the source packet.');

  return { ...draft, words };
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 72);
}

function yamlString(value) {
  return JSON.stringify(String(value).replace(/\s+/g, ' ').trim());
}

function toMarkdown(draft) {
  const date = new Date().toISOString().slice(0, 10);
  const sourceList = draft.sources.map((source) => `- [${source.label}](${source.url})`).join('\n');
  return `---
title: ${yamlString(draft.title)}
description: ${yamlString(draft.description)}
publishedAt: ${date}
topic: ${yamlString(draft.topic)}
kind: ${yamlString(draft.kind)}
readTime: ${yamlString(`${Math.max(2, Math.ceil(draft.words / 220))} min`)}
featured: false
generated: true
---

${draft.body.trim()}

## Sources

${sourceList}
`;
}

globalThis.packet = (await Promise.all(feeds.map(readFeed)))
  .flat()
  .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
  .slice(0, 14);

if (globalThis.packet.length < 4) throw new Error(`Only found ${globalThis.packet.length} usable source items.`);

const prompt = editorialPrompt(globalThis.packet);
if (DRY_RUN) {
  console.log(`Dry run: ${globalThis.packet.length} source items ready.\n\n${prompt.slice(0, 2600)}\n...`);
} else {
  const draft = parseDraft(await callModel(prompt));
  const date = new Date().toISOString().slice(0, 10);
  const file = path.join(OUTPUT_DIR, `${date}-${slugify(draft.title)}.md`);
  await fs.writeFile(file, toMarkdown(draft), { flag: 'wx' });
  console.log(`Published ${path.relative(ROOT, file)} (${draft.words} words).`);
}
