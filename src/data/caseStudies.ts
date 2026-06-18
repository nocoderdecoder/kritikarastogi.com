export type CaseStudy = {
  slug: string;
  company: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  summary: string;
  metric: string;
  metricLabel: string;
  secondaryMetrics: { value: string; label: string }[];
  tags: string[];
  color: string;
  challenge: string;
  insight: string;
  approach: { number: string; title: string; body: string }[];
  artifact: {
    label: string;
    title: string;
    items: { heading: string; body: string }[];
  };
  outcome: string;
  reflection: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'sproutsai-ai-workflows',
    company: 'SproutsAI',
    title: 'Turning recruiting software into AI workflows buyers could believe in',
    shortTitle: 'From legacy tools to agentic workflows',
    eyebrow: 'AI PRODUCT LAUNCH',
    summary: 'Built the market foundation for two zero-to-one AI products, grounding positioning and roadmap decisions in 42+ customer conversations.',
    metric: '12%',
    metricLabel: 'ARR increase',
    secondaryMetrics: [
      { value: '42+', label: 'user and client interviews' },
      { value: '26%', label: 'faster time-to-value' },
      { value: '2', label: 'zero-to-one launches' }
    ],
    tags: ['AI', 'B2B SaaS', 'Positioning', 'Customer research'],
    color: 'coral',
    challenge: 'The product was becoming more capable, but the market story still sounded like a list of recruiting features. Buyers needed to understand why an AI workflow was meaningfully different from another tool added to their stack.',
    insight: 'The strongest value was not “more AI.” It was fewer handoffs between discovering talent, evaluating fit, and acting on evidence. That shifted the story from automation theater to a credible operating advantage.',
    approach: [
      { number: '01', title: 'Find the buying truth', body: 'Mapped decision-makers, influencers, existing workarounds, and trust barriers through 42+ interviews and live competitive intelligence.' },
      { number: '02', title: 'Reframe the category', body: 'Defined the products around completed recruiting workflows and measurable time-to-value, not isolated AI features.' },
      { number: '03', title: 'Make the story usable', body: 'Translated the narrative into demos, one-pagers, pitch decks, FAQs, battlecards, and objection handling for every stage of the sale.' }
    ],
    artifact: {
      label: 'MESSAGING EXCERPT',
      title: 'From feature language to buyer language',
      items: [
        { heading: 'Before', body: 'AI-powered sourcing, ATS, and analytics in one platform.' },
        { heading: 'After', body: 'Move from open role to evidence-backed shortlist without the sourcing and screening handoffs that slow teams down.' },
        { heading: 'Proof', body: 'A workflow narrative backed by customer language, competitive gaps, and a 26% reduction in time-to-value.' }
      ]
    },
    outcome: 'The launches contributed to a 12% increase in ARR while the research program also guided roadmap priorities and the transformation of two legacy products into AI-led workflows.',
    reflection: 'AI positioning becomes credible when it explains a changed way of working. The model is never the message; the user’s new advantage is.'
  },
  {
    slug: 'burger-king-loyalty',
    company: 'Burger King Indonesia',
    title: 'Designing loyalty around behavior, not blanket discounts',
    shortTitle: 'A loyalty system built for 11 distinct audiences',
    eyebrow: 'LIFECYCLE & ADOPTION',
    summary: 'Turned behavioral data from more than one million users into a segmented value system that increased frequency and retention.',
    metric: '2x',
    metricLabel: 'purchase frequency',
    secondaryMetrics: [
      { value: '14%', label: 'retention improvement' },
      { value: '33%', label: 'feature adoption increase' },
      { value: '1M+', label: 'users analyzed' }
    ],
    tags: ['B2C', 'Lifecycle', 'Segmentation', 'Experimentation'],
    color: 'green',
    challenge: 'A broad loyalty proposition treated very different customers as if they were motivated by the same reward. That made communications easy to send but less relevant to receive.',
    insight: 'Frequency, recency, basket behavior, and reward sensitivity revealed 11 useful customer groups. Each segment had a different reason to return, so the product story had to adapt without fragmenting the brand.',
    approach: [
      { number: '01', title: 'Model real behavior', body: 'Partnered with data teams to cluster 1M+ users into 11 actionable personas based on observed purchase patterns.' },
      { number: '02', title: 'Create dynamic value', body: 'Designed rewards and lifecycle messages around the next behavior each persona was most likely to adopt.' },
      { number: '03', title: 'Learn in market', body: 'Used A/B tests across CRM, in-app, paid, organic, and social channels to refine message and offer combinations.' }
    ],
    artifact: {
      label: 'SEGMENTATION LOGIC',
      title: 'One program, different reasons to return',
      items: [
        { heading: 'Routine loyalists', body: 'Reinforce habit with progress, recognition, and low-friction repeat orders.' },
        { heading: 'Deal explorers', body: 'Use novelty and time-bound value to create a reason to choose Burger King now.' },
        { heading: 'At-risk regulars', body: 'Acknowledge the lapse and offer a relevant path back, rather than another generic promotion.' }
      ]
    },
    outcome: 'The combined loyalty, gamification, and lifecycle program doubled purchase frequency, improved retention by 14%, increased adoption by 33%, and contributed to 24% YoY app revenue growth.',
    reflection: 'Personalization is not inserting a name. It is choosing the next promise based on what a customer has already shown you.'
  },
  {
    slug: 'gojek-ads-platform',
    company: 'Gojek',
    title: 'Building an ads story that worked from SMB counter to enterprise boardroom',
    shortTitle: 'One platform story for two very different buyers',
    eyebrow: 'PLATFORM GTM',
    summary: 'Launched four zero-to-one products and built a scalable enablement system for a complex ads and promotions portfolio.',
    metric: '$11M',
    metricLabel: 'incremental revenue',
    secondaryMetrics: [
      { value: '35%', label: '30-day adoption' },
      { value: '34%', label: 'ARR growth' },
      { value: '23%', label: 'merchant satisfaction lift' }
    ],
    tags: ['B2B', 'Platform', 'GTM', 'Sales enablement'],
    color: 'blue',
    challenge: 'SMBs wanted simple growth they could see. Enterprise advertisers needed reach, control, and evidence. A single product catalog had to make sense to both without becoming generic.',
    insight: 'The common job was not “buy ads.” It was to turn moments of customer intent inside a super app into measurable merchant growth. Proof and packaging could then flex by buyer maturity.',
    approach: [
      { number: '01', title: 'Build from demand', body: 'Combined voice-of-customer, competitive, performance, and sales data to identify unmet jobs and prioritize the portfolio roadmap.' },
      { number: '02', title: 'Launch a coherent portfolio', body: 'Created product narratives and full-funnel launch strategies for four new products and three innovative ad formats.' },
      { number: '03', title: 'Scale the field', body: 'Built a centralized library spanning 13+ asset types, including 40+ case studies and 26+ pitch decks.' }
    ],
    artifact: {
      label: 'VALUE ARCHITECTURE',
      title: 'Same platform. Proof matched to buyer maturity.',
      items: [
        { heading: 'SMB promise', body: 'Reach nearby customers at the moment they are deciding, with a setup simple enough to run yourself.' },
        { heading: 'Enterprise promise', body: 'Turn super-app intent signals into scalable reach, controlled activation, and measurable commercial lift.' },
        { heading: 'Shared proof', body: 'Incrementality, engagement, spend growth, and merchant outcomes, not impressions alone.' }
      ]
    },
    outcome: 'The portfolio generated $11M in incremental revenue. Launches reached 35% adoption in 30 days, while enablement helped drive 21% advertiser spend growth and 34% ARR growth.',
    reflection: 'A platform narrative should unify the value without flattening the buyer. The spine stays consistent; the proof earns relevance.'
  },
  {
    slug: 'multi-agent-trends',
    company: '99P Labs',
    title: 'Prototyping a multi-agent system for trend intelligence',
    shortTitle: 'From information overload to evidence-backed signals',
    eyebrow: 'AI PROTOTYPE',
    summary: 'Co-developed a working prototype that uses specialized agents to discover, challenge, and synthesize emerging market signals.',
    metric: '1',
    metricLabel: 'working prototype',
    secondaryMetrics: [
      { value: 'Multi', label: 'agent research workflow' },
      { value: 'Traceable', label: 'evidence model' },
      { value: '2025', label: 'prototype published' }
    ],
    tags: ['Agentic AI', 'Market intelligence', 'Prototype', 'Systems thinking'],
    color: 'ink',
    challenge: 'Trend research is often a pile of links followed by a confident summary. The harder problem is distinguishing a durable market signal from a temporary spike in attention.',
    insight: 'Separating discovery, validation, contradiction, and synthesis creates productive tension. The system becomes more useful when each conclusion can be traced back to evidence and challenged.',
    approach: [
      { number: '01', title: 'Decompose the judgment', body: 'Assigned distinct roles for signal discovery, source validation, counterargument, and synthesis.' },
      { number: '02', title: 'Preserve provenance', body: 'Designed outputs so claims retained links to supporting evidence instead of disappearing into a summary.' },
      { number: '03', title: 'Prototype the loop', body: 'Built the workflow in OpenCode and documented where human judgment should remain in the system.' }
    ],
    artifact: {
      label: 'AGENT WORKFLOW',
      title: 'A research room, not a single oracle',
      items: [
        { heading: 'Scout', body: 'Finds weak signals across product, customer, company, and cultural sources.' },
        { heading: 'Skeptic', body: 'Looks for contradictory evidence, recycled narratives, and unsupported momentum.' },
        { heading: 'Strategist', body: 'Connects validated signals to customer behavior and commercial implications.' }
      ]
    },
    outcome: 'The prototype demonstrated how multi-agent design can make trend identification more structured, inspectable, and useful for product and marketing decisions.',
    reflection: 'The best AI research systems do not remove disagreement. They design it into the process, then make the final judgment easier to inspect.'
  }
];
