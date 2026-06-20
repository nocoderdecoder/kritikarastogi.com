import type { APIRoute } from 'astro';
import { buildDemoInputPrompt, buildPrompt, buildSuggestionPrompt, parseBrief, parseBriefData, type BriefInput } from '../../lib/competitiveSignalBrief';

export const prerender = false;

function isBriefInput(value: unknown): value is BriefInput {
  if (!value || typeof value !== 'object') return false;
  const record = value as Record<string, unknown>;
  return [
    'decisionFocus',
    'company',
    'product',
    'category',
    'buyer',
    'competitors',
    'jobToBeDone',
    'alternatives',
    'notes'
  ].every((key) => typeof record[key] === 'string');
}

function textFromResponse(data: any) {
  if (typeof data?.output_text === 'string' && data.output_text.trim()) {
    return data.output_text.trim();
  }
  const output = Array.isArray(data?.output) ? data.output : [];
  return output
    .flatMap((item: any) => (Array.isArray(item?.content) ? item.content : []))
    .filter((item: any) => item?.type === 'output_text')
    .map((item: any) => item.text)
    .join('\n')
    .trim();
}

const suggestionSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['suggestions'],
  properties: {
    suggestions: {
      type: 'array',
      minItems: 3,
      maxItems: 3,
      items: { type: 'string' }
    }
  }
} as const;

const briefSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['overview', 'kiqs', 'marketMap', 'comparison', 'themes', 'whiteSpace', 'actions', 'talkTrack', 'confidence'],
  properties: {
    overview: {
      type: 'object',
      additionalProperties: false,
      required: ['headline', 'summary', 'marketShape'],
      properties: {
        headline: { type: 'string' },
        summary: { type: 'string' },
        marketShape: { type: 'string' }
      }
    },
    kiqs: {
      type: 'array',
      minItems: 3,
      maxItems: 4,
      items: { type: 'string' }
    },
    marketMap: {
      type: 'object',
      additionalProperties: false,
      required: ['direct', 'adjacent', 'replacement'],
      properties: {
        direct: { type: 'array', items: { type: 'string' } },
        adjacent: { type: 'array', items: { type: 'string' } },
        replacement: { type: 'array', items: { type: 'string' } }
      }
    },
    comparison: {
      type: 'array',
      minItems: 3,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'tier', 'target', 'promise', 'proof', 'pricing', 'signal', 'watchout'],
        properties: {
          name: { type: 'string' },
          tier: { type: 'string', enum: ['Direct', 'Adjacent', 'Replacement'] },
          target: { type: 'string' },
          promise: { type: 'string' },
          proof: { type: 'string' },
          pricing: { type: 'string' },
          signal: { type: 'string' },
          watchout: { type: 'string' }
        }
      }
    },
    themes: {
      type: 'array',
      minItems: 3,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['label', 'observation', 'implication'],
        properties: {
          label: { type: 'string' },
          observation: { type: 'string' },
          implication: { type: 'string' }
        }
      }
    },
    whiteSpace: {
      type: 'object',
      additionalProperties: false,
      required: ['audience', 'opportunity', 'whyNow', 'positioning'],
      properties: {
        audience: { type: 'string' },
        opportunity: { type: 'string' },
        whyNow: { type: 'string' },
        positioning: { type: 'string' }
      }
    },
    actions: {
      type: 'array',
      minItems: 3,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['owner', 'action', 'why'],
        properties: {
          owner: { type: 'string' },
          action: { type: 'string' },
          why: { type: 'string' }
        }
      }
    },
    talkTrack: {
      type: 'array',
      minItems: 3,
      maxItems: 4,
      items: { type: 'string' }
    },
    confidence: { type: 'string', enum: ['High', 'Medium'] }
  }
} as const;

const demoInputSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['decisionFocus', 'company', 'product', 'category', 'buyer', 'competitors', 'jobToBeDone', 'alternatives', 'notes'],
  properties: {
    decisionFocus: { type: 'string' },
    company: { type: 'string' },
    product: { type: 'string' },
    category: { type: 'string' },
    buyer: { type: 'string' },
    competitors: { type: 'string' },
    jobToBeDone: { type: 'string' },
    alternatives: { type: 'string' },
    notes: { type: 'string' }
  }
} as const;

function parseSuggestions(raw: string) {
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('The model did not return JSON.');
  const data = JSON.parse(match[0]) as { suggestions?: unknown };
  const suggestions = Array.isArray(data.suggestions)
    ? data.suggestions.map((item) => String(item).trim()).filter(Boolean).slice(0, 3)
    : [];
  if (!suggestions.length) throw new Error('No suggestions were returned.');
  return suggestions;
}

function normalizeString(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function exclusionTokens(input: BriefInput) {
  return Array.from(
    new Set(
      `${input.company} ${input.product}`
        .split(/[^a-zA-Z0-9]+/)
        .map((token) => token.trim().toLowerCase())
        .filter((token) => token.length >= 4 && !['phone', 'phones', 'mobile', 'device', 'devices'].includes(token))
    )
  );
}

function containsExcludedToken(value: string, exclusions: string[]) {
  const normalized = normalizeString(value);
  return exclusions.some((token) => normalized.includes(token));
}

function cleanSuggestionValue(value: string) {
  return value.replace(/\s+/g, ' ').replace(/\s+,/g, ',').trim().replace(/^[-•]\s*/, '');
}

function sanitizeSuggestions(field: keyof BriefInput, suggestions: string[], input: BriefInput) {
  const exclusions = exclusionTokens(input);
  const dedupe = new Set<string>();
  const cleaned = suggestions
    .map(cleanSuggestionValue)
    .map((value) => {
      if (field === 'competitors' || field === 'alternatives') {
        const entries = value
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
          .filter((item) => !containsExcludedToken(item, exclusions));
        return entries.length >= 2 ? entries.join(', ') : '';
      }

      return containsExcludedToken(value, exclusions) ? '' : value;
    })
    .filter(Boolean)
    .filter((value) => {
      const key = value.toLowerCase();
      if (dedupe.has(key)) return false;
      dedupe.add(key);
      return true;
    });

  return cleaned.slice(0, 3);
}

async function callModel(
  prompt: string,
  env: Record<string, string | undefined>,
  options?: { schemaName?: string; schema?: Record<string, unknown>; maxOutputTokens?: number }
) {
  if (env.OPENAI_API_KEY) {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: env.OPENAI_MODEL || 'gpt-5.4-mini',
        input: prompt,
        max_output_tokens: options?.maxOutputTokens || 1800,
        ...(options?.schemaName && options?.schema
          ? {
              text: {
                format: {
                  type: 'json_schema',
                  name: options.schemaName,
                  strict: true,
                  schema: options.schema
                }
              }
            }
          : {})
      })
    });
    if (!response.ok) throw new Error(`OpenAI API ${response.status}: ${await response.text()}`);
    return textFromResponse(await response.json());
  }

  if (env.ANTHROPIC_API_KEY) {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: env.ANTHROPIC_MODEL || 'claude-sonnet-4-5-20250929',
        max_tokens: 1800,
        temperature: 0.4,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    if (!response.ok) throw new Error(`Anthropic API ${response.status}: ${await response.text()}`);
    const data = await response.json();
    return data.content?.find((block: any) => block.type === 'text')?.text?.trim() || '';
  }

  throw new Error('Set OPENAI_API_KEY or ANTHROPIC_API_KEY in the deployment environment.');
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = await request.json();
    const runtimeEnv = ((locals as any).runtime?.env ?? {}) as Record<string, string | undefined>;
    const env: Record<string, string | undefined> = {
      OPENAI_API_KEY: runtimeEnv.OPENAI_API_KEY ?? import.meta.env.OPENAI_API_KEY ?? process.env.OPENAI_API_KEY,
      OPENAI_MODEL: runtimeEnv.OPENAI_MODEL ?? import.meta.env.OPENAI_MODEL ?? process.env.OPENAI_MODEL,
      ANTHROPIC_API_KEY: runtimeEnv.ANTHROPIC_API_KEY ?? import.meta.env.ANTHROPIC_API_KEY ?? process.env.ANTHROPIC_API_KEY,
      ANTHROPIC_MODEL: runtimeEnv.ANTHROPIC_MODEL ?? import.meta.env.ANTHROPIC_MODEL ?? process.env.ANTHROPIC_MODEL
    };

    if (body?.mode === 'suggest') {
      if (!isBriefInput(body.input) || typeof body.field !== 'string') {
        return new Response(JSON.stringify({ error: 'Invalid suggestion input.' }), {
          status: 400,
          headers: { 'content-type': 'application/json' }
        });
      }

      const prompt = buildSuggestionPrompt(body.field as keyof BriefInput, body.input);
      const raw = await callModel(prompt, env, {
        schemaName: 'competitive_signal_suggestions',
        schema: suggestionSchema,
        maxOutputTokens: 320
      });
      const suggestions = sanitizeSuggestions(body.field as keyof BriefInput, parseSuggestions(raw), body.input);
      if (!suggestions.length) throw new Error('No suggestions were returned.');

      return new Response(JSON.stringify({ suggestions }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      });
    }

    if (body?.mode === 'demo') {
      const raw = await callModel(buildDemoInputPrompt(), env, {
        schemaName: 'competitive_signal_demo_input',
        schema: demoInputSchema,
        maxOutputTokens: 500
      });
      if (!raw) throw new Error('The model returned an empty demo input.');

      const input = JSON.parse(raw) as BriefInput;
      if (!isBriefInput(input)) throw new Error('The demo input was invalid.');

      return new Response(JSON.stringify({ input }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      });
    }

    if (body?.mode === 'brief' && isBriefInput(body.input)) {
      const prompt = buildPrompt(body.input);
      const raw = await callModel(prompt, env, {
        schemaName: 'competitive_signal_brief',
        schema: briefSchema,
        maxOutputTokens: 2400
      });
      if (!raw) throw new Error('The model returned an empty response.');
      const brief = env.OPENAI_API_KEY ? parseBriefData(JSON.parse(raw)) : parseBrief(raw);

      return new Response(JSON.stringify({ brief }), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid request.' }), {
      status: 400,
      headers: { 'content-type': 'application/json' }
    });
  } catch (error: any) {
    console.error('competitive-signal-brief error:', error);
    return new Response(JSON.stringify({ error: error?.message || 'Brief generation failed.' }), {
      status: 500,
      headers: { 'content-type': 'application/json' }
    });
  }
};
