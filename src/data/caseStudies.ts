export type CaseStudy = {
  slug: string;
  company: string;
  logo: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  eyebrowSuffix?: string;
  companyBio?: string;
  summary: string;
  metric: string;
  metricLabel: string;
  secondaryMetrics: { value: string; label: string }[];
  tags: string[];
  color: string;
  role: string;
  period: string;
  ownership: string;
  measurementNote: string;
  challenge: string;
  insight: string;
  approach: { number: string; title: string; body: string }[];
  artifact: {
    label: string;
    title: string;
    items: { heading: string; body: string }[];
    pdf?: string;
  };
  outcome: string;
  reflection: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'sproutsai-ai-workflows',
    company: 'Sprouts AI',
    logo: '/logos/sproutsai.png',
    title: 'Defining the Market Strategy for an Early-Stage Agentic Recruiting Platform',
    shortTitle: 'Defining the Market Strategy for an Early-Stage Agentic Recruiting Platform',
    eyebrow: 'AI PRODUCT MARKETING',
    eyebrowSuffix: 'B2B SaaS',
    companyBio: 'Sprouts AI is an early-stage AI recruiting startup building agentic hiring solutions that automate the recruiting workflow from job creation to offer management',
    summary: 'Defined the ICP, category strategy, positioning, and go-to-market foundation for two zero-to-one AI recruiting products through customer discovery, competitive intelligence, and 42+ customer interviews',
    metric: '30%',
    metricLabel: 'Lead-to-Opportunity Conversion',
    secondaryMetrics: [
      { value: '30%', label: 'increase in lead-to-opportunity conversion' },
      { value: '3', label: 'startup customers closed with ICP framework' },
      { value: '42+', label: 'customer interviews conducted' }
    ],
    tags: ['AI SaaS', 'Customer Discovery', 'Competitive Intelligence', 'Positioning', 'GTM Strategy'],
    color: 'coral',
    role: 'AI Product Marketing Manager',
    period: 'Jun–Aug 2025',
    ownership: 'Led customer discovery, competitive intelligence, ICP definition, positioning, messaging, and GTM strategy — partnering closely with founders, Product, Sales, and Leadership to define the company\'s market strategy and commercial narrative',
    measurementNote: 'Conversion and pipeline metrics reflect the period following ICP definition and positioning launch. The 12% ARR movement was a company result; the launches contributed to it but are not presented as sole attribution.',
    challenge: 'The recruiting technology market was becoming increasingly crowded with ATS platforms, recruiting automation tools, and AI-powered assistants. While customers were interested in AI, most viewed existing solutions as incremental productivity tools rather than a fundamentally different way of hiring.\n\nThe challenge was identifying the right customer segment and developing a positioning strategy that clearly differentiated Sprouts AI.',
    insight: 'Recruiters weren\'t looking for more AI features. They wanted less manual work.\n\nMost recruiting tools automated individual tasks but still required recruiters to coordinate multiple systems and workflows. This revealed an opportunity to position Sprouts AI around workflow ownership rather than task automation.',
    approach: [
      { number: '01', title: 'Discover the Market', body: 'Conducted 42+ customer interviews across SMB, Mid-Market, and Enterprise organizations while building a competitive intelligence program covering ATS platforms, modern recruiting software, and AI-native competitors.' },
      { number: '02', title: 'Define the Market Opportunity', body: 'Mapped the recruiting technology landscape from Manual → Assisted → Augmented → Agentic and identified whitespace for an Agentic Recruiting Platform that could automate recruiting workflows end-to-end while keeping humans in control of hiring decisions.' },
      { number: '03', title: 'Define the ICP & Positioning', body: 'Validated multiple customer segments and identified high-growth technology companies (10–100 employees) with lean recruiting teams as the strongest fit. Developed positioning around workflow ownership instead of AI productivity, shifting the conversation from features to business outcomes.' },
      { number: '04', title: 'Build the GTM Foundation', body: 'Translated the strategy into repeatable GTM assets, including messaging frameworks, sales decks, product demos, competitive battle cards, objection-handling guides, and a competitive intelligence repository that aligned Product, Founders, and Sales around a common narrative.' }
    ],
    artifact: {
      label: 'MARKET EVOLUTION FRAMEWORK',
      title: 'From task automation to workflow ownership',
      items: [
        { heading: 'Manual', body: 'Recruiters manage every stage of hiring manually.' },
        { heading: 'Assisted', body: 'ATS platforms organize recruiting activities.' },
        { heading: 'Augmented', body: 'AI accelerates individual recruiting tasks.' },
        { heading: 'Agentic', body: 'AI executes the recruiting workflow while recruiters own hiring decisions. This is where Sprouts AI plays.' }
      ],
      pdf: '/sproutsai-market-framework.pdf'
    },
    outcome: 'The ICP and positioning work increased lead-to-opportunity conversion by 30%, closed 3 startup customers using the new framework, improved pipeline quality by concentrating acquisition on the highest-fit segment, and established a repeatable GTM motion and category narrative for future growth.',
    reflection: 'In emerging categories, customers rarely buy technology because it is new. They buy solutions to existing problems.'
  },
  {
    slug: 'burger-king-loyalty',
    company: 'Burger King Indonesia',
    logo: '/logos/burger-king.svg',
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
    role: 'Digital Product Marketing Manager',
    period: 'Jul 2022–Jun 2024',
    ownership: 'Led loyalty and gamification GTM with product, CRM, design, engineering, and data teams; owned segmentation, messaging, and lifecycle experimentation.',
    measurementNote: 'Purchase frequency, retention, adoption, and app revenue were measured across the loyalty and lifecycle program, not a single campaign.',
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
    reflection: 'Our lifecycle work improved when each segment had one observable next behavior, rather than a different promotional message for its own sake.'
  },
  {
    slug: 'gojek-ads-platform',
    company: 'Gojek',
    logo: '/logos/gojek.svg',
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
    role: 'B2B Product Marketing Manager',
    period: 'Apr 2020–Jul 2022',
    ownership: 'Owned portfolio GTM, product narratives, and enablement; worked with product, sales, performance marketing, and merchant teams.',
    measurementNote: '$11M is incremental revenue from the ads and promotions portfolio. Adoption refers to the first 30 days after launch.',
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
    reflection: 'We kept one platform promise, then changed the proof: ease and immediate demand for SMBs; reach, control, and incrementality for enterprise teams.'
  },
  {
    slug: 'multi-agent-trends',
    company: '99P Labs',
    logo: '/logos/99p-labs.png',
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
    role: 'Graduate innovation project, 99P Labs',
    period: '2025',
    ownership: 'Co-developed the research workflow, agent responsibilities, evidence model, and prototype documentation.',
    measurementNote: 'This is a working prototype and learning project. It does not claim a commercial outcome.',
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
    reflection: 'Separating discovery from challenge made the output easier to inspect because the system had to show both the supporting evidence and the objection.'
  }
];
