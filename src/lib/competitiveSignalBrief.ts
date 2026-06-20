export interface BriefInput {
  decisionFocus: string;
  company: string;
  product: string;
  category: string;
  buyer: string;
  competitors: string;
  jobToBeDone: string;
  alternatives: string;
  notes: string;
}

export interface CompetitorRow {
  name: string;
  tier: 'Direct' | 'Adjacent' | 'Replacement';
  target: string;
  promise: string;
  proof: string;
  pricing: string;
  signal: string;
  watchout: string;
}

export interface CompetitiveSignalBrief {
  overview: {
    headline: string;
    summary: string;
    marketShape: string;
  };
  kiqs: string[];
  marketMap: {
    direct: string[];
    adjacent: string[];
    replacement: string[];
  };
  comparison: CompetitorRow[];
  themes: Array<{
    label: string;
    observation: string;
    implication: string;
  }>;
  whiteSpace: {
    audience: string;
    opportunity: string;
    whyNow: string;
    positioning: string;
  };
  actions: Array<{
    owner: string;
    action: string;
    why: string;
  }>;
  talkTrack: string[];
  confidence: 'High' | 'Medium';
}

function normalizeTier(value: string): CompetitorRow['tier'] {
  return value === 'Direct' || value === 'Adjacent' || value === 'Replacement' ? value : 'Direct';
}

export const SAMPLE_PRESETS: Array<{ id: string; label: string; input: BriefInput }> = [
  {
    id: 'ai-support',
    label: 'Enterprise AI support',
    input: {
      decisionFocus: 'Find a positioning opportunity',
      company: 'SupportPilot',
      product: 'An AI support workflow platform',
      category: 'AI customer support software',
      buyer: 'VP of Customer Support at a mid-market SaaS company',
      competitors: 'Zendesk AI, Intercom Fin, Forethought, ServiceNow, Salesforce Service Cloud',
      jobToBeDone: 'Help support teams resolve more tickets with quality and control, without scaling headcount at the same pace.',
      alternatives: 'BPOs, internal operations teams, help center deflection, manual triage in spreadsheets',
      notes: 'The team thinks the category is crowded around faster support. We suspect buyers care more about control, visibility, and workflow fit.'
    }
  },
  {
    id: 'sales-enablement',
    label: 'Revenue intelligence',
    input: {
      decisionFocus: 'Pressure-test launch messaging',
      company: 'DealSignal',
      product: 'A revenue intelligence assistant for B2B sales teams',
      category: 'Sales intelligence and enablement',
      buyer: 'Head of Sales Enablement at a Series B SaaS company',
      competitors: 'Gong, Clari Copilot, Attention, HubSpot AI, Salesforce Einstein',
      jobToBeDone: 'Turn call notes, CRM activity, and deal risk signals into usable coaching and forecast guidance.',
      alternatives: 'Manager-led coaching, spreadsheet pipeline reviews, RevOps analysts',
      notes: 'The launch question is whether to lead with forecast accuracy, rep coaching, or operational visibility.'
    }
  }
];

export function emptyInput(): BriefInput {
  return {
    decisionFocus: '',
    company: '',
    product: '',
    category: '',
    buyer: '',
    competitors: '',
    jobToBeDone: '',
    alternatives: '',
    notes: ''
  };
}

export function buildPrompt(input: BriefInput) {
  return `You are the competitive intelligence system for Kritika Rastogi, an AI and B2B product marketer.

Your job is to create a Competitive Signal Brief. The output must feel like a product marketer's structured judgment, not a chatbot answer.

Use this framework:
- Start with the decision, not the competitor list
- Derive Key Intelligence Questions (KIQs)
- Map the market by job-to-be-done
- Separate direct competitors, adjacent competitors, and replacement alternatives
- Track the four strategic fields: target, promise, proof, pricing
- Identify the white space: who should not choose competitor A, but should choose us

Instructions:
- Be specific, commercially literate, and easy to understand
- Do not invent hard facts such as exact pricing plans, customer counts, or funding unless the user explicitly supplied them
- If details are missing, make careful strategic inferences and state them as signals, not facts
- Keep the tone confident but grounded
- Make the output useful for positioning, GTM, and product strategy
- The result should read like a polished PMM brief

Return strict JSON only. No markdown fences. Use this exact schema:
{
  "overview": {
    "headline": "string",
    "summary": "string",
    "marketShape": "string"
  },
  "kiqs": ["string", "string", "string"],
  "marketMap": {
    "direct": ["string"],
    "adjacent": ["string"],
    "replacement": ["string"]
  },
  "comparison": [
    {
      "name": "string",
      "tier": "Direct|Adjacent|Replacement",
      "target": "string",
      "promise": "string",
      "proof": "string",
      "pricing": "string",
      "signal": "string",
      "watchout": "string"
    }
  ],
  "themes": [
    {
      "label": "string",
      "observation": "string",
      "implication": "string"
    }
  ],
  "whiteSpace": {
    "audience": "string",
    "opportunity": "string",
    "whyNow": "string",
    "positioning": "string"
  },
  "actions": [
    {
      "owner": "string",
      "action": "string",
      "why": "string"
    }
  ],
  "talkTrack": ["string", "string", "string"],
  "confidence": "High|Medium"
}

User brief:
Decision focus: ${input.decisionFocus}
Company: ${input.company}
Product: ${input.product}
Category: ${input.category}
Buyer: ${input.buyer}
Competitors: ${input.competitors}
Job to be done: ${input.jobToBeDone}
Alternatives: ${input.alternatives}
Additional notes: ${input.notes || 'None provided'}
`;
}

export function buildSuggestionPrompt(field: keyof BriefInput, input: BriefInput) {
  const fieldPrompts: Record<keyof BriefInput, string> = {
    decisionFocus: 'Suggest 3 concise decision-focus options that a product marketer could use for this brief.',
    company: 'Suggest 3 plausible company-name placeholders only if the provided company field is blank.',
    product: 'Suggest 3 concise product descriptions based on the company and category.',
    category: 'Suggest 3 concise category labels based on the company, product, and decision focus.',
    buyer: 'Suggest 3 realistic target buyer options.',
    competitors: 'Suggest 3 competitor-set options, each as a short comma-separated list of 3 to 5 names.',
    jobToBeDone: 'Suggest 3 concise job-to-be-done statements.',
    alternatives: 'Suggest 3 alternative-solution lists, each as a short comma-separated line.',
    notes: 'Suggest 3 useful hypothesis statements a product marketer might want to test.'
  };

  return `You are helping Kritika Rastogi draft one field for a competitive intelligence tool.

Instructions:
- Keep each suggestion short and practical
- Do not explain your reasoning
- Do not invent detailed facts
- Base suggestions on the information provided
- Never repeat the user's own company, product name, product family, or close brand variant as a competitor or alternative
- If the company is the brand, avoid sibling products from that same brand in competitor suggestions
- For alternatives, suggest non-brand solution paths or substitute approaches rather than the user's own lineup

Requested field:
${fieldPrompts[field]}

Context:
Decision focus: ${input.decisionFocus || 'Not provided'}
Company: ${input.company || 'Not provided'}
Product: ${input.product || 'Not provided'}
Category: ${input.category || 'Not provided'}
Buyer: ${input.buyer || 'Not provided'}
Competitors: ${input.competitors || 'Not provided'}
Job to be done: ${input.jobToBeDone || 'Not provided'}
Alternatives: ${input.alternatives || 'Not provided'}
Notes: ${input.notes || 'Not provided'}
`;
}

export function buildDemoInputPrompt() {
  return `You are generating a polished demo scenario for Kritika Rastogi's Competitive Signal Brief tool.

Create one coherent, believable sample input set for a product, market, and positioning problem.

Instructions:
- Make the scenario feel realistic and commercially literate
- Vary the industry and company from one generation to the next
- Keep it understandable for a quick live demo
- Use concise but specific field values
- Competitors should be direct and recognizable for the category
- Alternatives should be non-competitor fallback options, substitute workflows, or status-quo choices
- Notes should add one or two useful strategic hypotheses, not a long paragraph
- Return values only for the tool fields
`;
}

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.map((item) => asString(item)).filter(Boolean) : [];
}

export function parseBriefData(source: unknown): CompetitiveSignalBrief {
  const data = (source ?? {}) as Record<string, unknown>;
  const overviewRecord = (data.overview ?? {}) as Record<string, unknown>;
  const mapRecord = (data.marketMap ?? {}) as Record<string, unknown>;
  const whiteSpaceRecord = (data.whiteSpace ?? {}) as Record<string, unknown>;
  const comparisonRows = Array.isArray(data.comparison) ? data.comparison : [];
  const themes = Array.isArray(data.themes) ? data.themes : [];
  const actions = Array.isArray(data.actions) ? data.actions : [];
  const confidence = asString(data.confidence) === 'High' ? 'High' : 'Medium';

  const brief: CompetitiveSignalBrief = {
    overview: {
      headline: asString(overviewRecord.headline),
      summary: asString(overviewRecord.summary),
      marketShape: asString(overviewRecord.marketShape)
    },
    kiqs: asStringArray(data.kiqs).slice(0, 4),
    marketMap: {
      direct: asStringArray(mapRecord.direct),
      adjacent: asStringArray(mapRecord.adjacent),
      replacement: asStringArray(mapRecord.replacement)
    },
    comparison: comparisonRows.map((row) => {
      const item = row as Record<string, unknown>;
      return {
        name: asString(item.name),
        tier: normalizeTier(asString(item.tier)),
        target: asString(item.target),
        promise: asString(item.promise),
        proof: asString(item.proof),
        pricing: asString(item.pricing),
        signal: asString(item.signal),
        watchout: asString(item.watchout)
      };
    }).filter((row) => row.name),
    themes: themes.map((row) => {
      const item = row as Record<string, unknown>;
      return {
        label: asString(item.label),
        observation: asString(item.observation),
        implication: asString(item.implication)
      };
    }).filter((row) => row.label && row.observation),
    whiteSpace: {
      audience: asString(whiteSpaceRecord.audience),
      opportunity: asString(whiteSpaceRecord.opportunity),
      whyNow: asString(whiteSpaceRecord.whyNow),
      positioning: asString(whiteSpaceRecord.positioning)
    },
    actions: actions.map((row) => {
      const item = row as Record<string, unknown>;
      return {
        owner: asString(item.owner),
        action: asString(item.action),
        why: asString(item.why)
      };
    }).filter((row) => row.owner && row.action),
    talkTrack: asStringArray(data.talkTrack).slice(0, 4),
    confidence
  };

  if (!brief.overview.headline || !brief.overview.summary) throw new Error('The brief is missing its overview.');
  if (!brief.kiqs.length) throw new Error('The brief is missing Key Intelligence Questions.');
  if (!brief.comparison.length) throw new Error('The brief is missing the competitor comparison.');
  if (!brief.whiteSpace.opportunity || !brief.whiteSpace.positioning) throw new Error('The brief is missing the white-space analysis.');

  return brief;
}

export function parseBrief(raw: string): CompetitiveSignalBrief {
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('The model did not return JSON.');
  return parseBriefData(JSON.parse(match[0]) as Record<string, unknown>);
}

export function toShareText(input: BriefInput, brief: CompetitiveSignalBrief) {
  return [
    'Competitive Signal Brief',
    `${input.company} · ${input.product}`,
    '',
    brief.overview.headline,
    brief.overview.summary,
    '',
    'Key Intelligence Questions',
    ...brief.kiqs.map((kiq, index) => `${index + 1}. ${kiq}`),
    '',
    'White Space',
    `${brief.whiteSpace.opportunity}`,
    `${brief.whiteSpace.positioning}`
  ].join('\n');
}
