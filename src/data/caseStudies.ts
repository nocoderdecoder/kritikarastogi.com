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
    pdfLabel?: string;
    image?: string;
    links?: { label: string; url: string }[];
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
      pdf: '/sproutsai-market-framework.pdf',
      pdfLabel: 'See the full framework'
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
    title: 'Transforming SMB Advertising Through a Product-Led Self-Serve Platform',
    shortTitle: 'From sales-led to product-led SMB advertising growth',
    eyebrow: 'Zero-to-One Launch · Hybrid GTM Motion',
    companyBio: 'Gojek is Southeast Asia\'s leading super app, offering transportation, food delivery, payments, and commerce services',
    summary: 'Led the go-to-market strategy for Gojek\'s first self-serve advertising platform, transforming advertising from a sales-led service into a scalable product-led growth motion through customer research, product strategy, positioning, and lifecycle activation',
    metric: '17.5%',
    metricLabel: 'SMB Ad Adoption',
    secondaryMetrics: [
      { value: '23%', label: 'advertising inventory utilization improvement' },
      { value: '8,000+', label: 'incremental merchant orders' },
      { value: '3', label: 'months to exceed adoption goal' }
    ],
    tags: ['Marketplace', 'Product Launch', 'Product-Led Growth', 'Monetization', 'GTM Strategy'],
    color: 'blue',
    role: 'Product and Growth Marketing Manager',
    period: 'Apr 2020–Jul 2022',
    ownership: 'Led customer research, ICP definition, positioning, messaging, GTM strategy, launch planning, and sales enablement — partnering with Product, Engineering, Sales, Lifecycle Marketing, Customer Success, Design, and Analytics to launch and scale the self-serve advertising platform',
    measurementNote: 'SMB adoption figures reflect the first three months post-launch. Inventory utilization and merchant orders were measured across the self-serve platform launch period.',
    challenge: 'Despite SMBs representing the majority of Gojek\'s merchant base, advertising adoption remained at just 5%, leaving 30–40% of advertising inventory underutilized.\n\nThe initial assumption was that SMBs weren\'t interested in advertising. Customer research revealed a different reality. Merchants wanted to grow but perceived advertising as complicated, expensive, and designed for large brands. At the same time, the sales-assisted model couldn\'t scale to support thousands of SMB merchants.\n\nThe challenge wasn\'t creating demand; it was removing friction and giving merchants the confidence to advertise independently.',
    insight: 'Growth-oriented SMBs didn\'t need more sales support. They needed a product that felt simple enough to use on their own.\n\nThe biggest adoption barrier wasn\'t awareness; it was confidence.\n\nThis shifted our strategy from scaling sales capacity to scaling product adoption.',
    approach: [
      { number: '01', title: 'Define the Right Customer', body: 'Partnered with Sales, Customer Success, and Analytics to identify merchants most likely to adopt self-serve advertising, prioritizing digitally mature SMBs actively investing in business growth.' },
      { number: '02', title: 'Reduce Adoption Friction', body: 'Worked with Product and Engineering to prioritize features that directly addressed customer barriers, including guided campaign creation, pre-configured campaign bundles, and an ROI dashboard.' },
      { number: '03', title: 'Build Positioning Around Simplicity', body: 'Positioned the platform as an accessible business growth tool by emphasizing simplicity, affordability, and merchant empowerment instead of advertising features.' },
      { number: '04', title: 'Launch an Education-Led GTM Motion', body: 'Designed a lifecycle-led launch strategy combining webinars, product demos, merchant success stories, onboarding journeys, in-product education, and sales enablement to build merchant confidence before driving adoption.' },
      { number: '05', title: 'Align the Organization', body: 'Aligned Product, Sales, Marketing, Lifecycle, Customer Success, Design, and Analytics around a shared launch strategy while positioning self-serve as an account expansion opportunity rather than a replacement for the sales motion.' }
    ],
    artifact: {
      label: 'POSITIONING & MESSAGING ARCHITECTURE',
      title: '"Now you can run ads yourself, like a big brand in just a few clicks"',
      items: [],
      image: '/gojek-positioning-architecture.png',
      pdf: '/gojek-smb-ads-gtm.pdf',
      pdfLabel: 'See the full GTM launch strategy'
    },
    outcome: 'The self-serve platform increased SMB advertising adoption from 5% to 17.5% in three months, exceeding the 15% launch goal, improving inventory utilization by 23%, and generating 8,000+ incremental merchant orders',
    reflection: 'Customers don\'t adopt products simply because they\'re available. They adopt them when they feel confident using them. For self-serve products, success comes from reducing friction, simplifying the experience, and building customer confidence through the right combination of product, positioning, and education.'
  },
  {
    slug: 'multi-agent-trends',
    company: 'Honda Research Institute',
    logo: '/logos/99p-labs.png',
    title: 'Building an LLM Multi-Agent System for Trend Identification',
    shortTitle: 'From fragmented research to evidence-based trend intelligence',
    eyebrow: 'AI PRODUCT STRATEGY',
    companyBio: 'Honda Research Institute (HRI) conducts advanced research across AI, robotics, mobility, and neuroscience to identify emerging technologies that shape Honda\'s long-term innovation strategy',
    summary: 'Defined the product vision, AI workflow, and MVP strategy for a multi-agent trend intelligence platform that transformed fragmented research into structured, evidence-based insights through customer discovery and human-centered AI design',
    metric: '30%',
    metricLabel: 'Reduction in Time-to-Insight',
    secondaryMetrics: [
      { value: '8', label: 'information sources unified into one workflow' },
      { value: '27', label: 'researchers and stakeholders supported' },
      { value: '21', label: 'researcher interviews conducted' }
    ],
    tags: ['AI Products', 'Multi-Agent Systems', 'Customer Discovery', 'Product Strategy', 'Human-Centered AI'],
    color: 'ink',
    role: 'AI Product Strategy',
    period: '2025',
    ownership: 'Led customer discovery, product strategy, MVP definition, AI workflow design, and stakeholder alignment — partnering with researchers, AI engineers, and product teams to translate user needs into an AI-powered multi-agent system',
    measurementNote: 'Time-to-insight reduction and adoption figures reflect the MVP development and deployment period at Honda Research Institute.',
    challenge: 'Researchers relied on a fragmented, manual process to identify emerging technology trends across research papers, patents, industry reports, conferences, news, and expert insights.\n\nWhile AI could summarize information, existing tools lacked transparency and explainability, making researchers hesitant to trust AI-generated recommendations.\n\nThe challenge wasn\'t accessing information. It was helping researchers transform fragmented information into evidence-based decisions.',
    insight: 'Customer interviews revealed that researchers didn\'t struggle to find information. They struggled to determine which signals mattered.\n\nThe opportunity wasn\'t to build another AI search tool. It was to create an AI system that could evaluate, prioritize, and synthesize evidence while keeping researchers in control of the final decision.',
    approach: [
      { number: '01', title: 'Understand the Research Workflow', body: 'Interviewed 21 researchers and innovation leaders to map how trends were identified, evaluated, and translated into research recommendations.' },
      { number: '02', title: 'Define the Product Vision', body: 'Shifted the product vision from AI-powered search to an AI-assisted decision support system that could evaluate evidence, identify patterns, and generate transparent trend recommendations.' },
      { number: '03', title: 'Design the Multi-Agent Workflow', body: 'Worked with AI engineers to define a multi-agent architecture where specialized agents collaborated to define research scope, aggregate signals, score evidence quality, and generate explainable trend insights.' },
      { number: '04', title: 'Prioritize the MVP', body: 'Balanced customer value, technical feasibility, and trust by prioritizing multi-source signal aggregation, trend clustering, confidence scoring, AI-generated summaries, and human validation workflows.' },
      { number: '05', title: 'Drive Cross-Functional Development', body: 'Partnered with researchers and engineering teams throughout development, translating user needs into product requirements, validating workflows, and refining agent outputs through continuous feedback.' }
    ],
    artifact: {
      label: 'LLM MULTI-AGENT SYSTEM',
      title: 'A Trend Identification System Using LLMs',
      items: [],
      image: '/hri-trend-identification-system.png',
      links: [
        { label: 'Read full article on Medium', url: 'https://medium.com/99p-labs/a-multi-agent-system-to-identify-trends-using-llms-eff89bd9c983' },
        { label: 'View on GitHub', url: 'https://github.com/kritikarastogi240-crypto/honda-b-trendly' }
      ]
    },
    outcome: 'The multi-agent system reduced researcher time-to-insight by 30%, unified 8 information sources into a single workflow, supported adoption across 27 researchers and cross-functional stakeholders, and established a scalable framework for evidence-based trend intelligence',
    reflection: 'Successful AI products begin with customer problems, not AI capabilities. The most valuable AI systems don\'t replace human expertise — they enhance it by making complex decisions more transparent, explainable, and actionable'
  }
];
