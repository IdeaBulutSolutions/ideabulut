export type CompanyIntro = {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  sub: string;
  breadcrumb: string;
};

export type CompanyItem = { title: string; body: string };

export const companyNavigation = {
  home: 'Home',
  blogPages: 'Blog pages',
  helpfulPages: 'Helpful pages',
} as const;

export const companyPages = {
  products: {
    title: 'Products by Idea Bulut | Idea Bulut Solutions',
    description: 'Products built by the Idea Bulut team, including Toolbelt for Copado, a free tool for Copado customers.',
    eyebrow: 'PRODUCTS',
    heading: 'Products by Idea Bulut.',
    sub: 'Tools born from real delivery work. Each one is built to stand on its own, and some may grow into companies of their own.',
    breadcrumb: 'Products',
  },
  about: {
    title: 'About | Idea Bulut Solutions',
    description: 'Idea Bulut is a Madrid-based engineering team building custom software and delivering Salesforce, Marketing Cloud migration and AI work across Spain, Türkiye, the UK and the US.',
    eyebrow: 'ABOUT',
    heading: 'We build things that hold up.',
    sub: 'We help teams release, migrate and build with confidence, from Salesforce delivery to custom software and our own products.',
    breadcrumb: 'About',
  },
  blog: {
    title: 'Blog | Salesforce DevOps, Copado & AI | Idea Bulut',
    description: 'Practical guides on Salesforce DevOps, Copado, Marketing Cloud Next migration, Claude AI and custom software engineering.',
    eyebrow: 'BLOG',
    heading: 'The Idea Bulut Blog.',
    sub: 'Practical guides on Salesforce DevOps, Copado, Marketing Cloud Next migration, Claude AI and custom software engineering, written by the engineers doing the work.',
    breadcrumb: 'Blog',
  },
  privacy: {
    title: 'Privacy Policy | Idea Bulut Solutions',
    description: 'Privacy Policy | Idea Bulut Solutions',
    eyebrow: 'PRIVACY',
    heading: 'Privacy Policy',
    sub: '',
    breadcrumb: 'Privacy Policy',
  },
  cookies: {
    title: 'Cookie Policy | Idea Bulut Solutions',
    description: 'Cookie Policy | Idea Bulut Solutions',
    eyebrow: 'COOKIES',
    heading: 'Cookie Policy',
    sub: '',
    breadcrumb: 'Cookie Policy',
  },
} as const satisfies Record<string, CompanyIntro>;

export const productsContent = {
  listHeading: 'Our products',
  byline: 'by Idea Bulut',
  free: 'Free',
  comingSoon: 'Download link not yet available',
  whyEyebrow: 'WHY WE BUILD PRODUCTS',
  whyHeading: 'The best tooling comes from the people who use it.',
  whyBody: "We spend our days inside real delivery work, so we see what could be faster, simpler or more reliable. When an improvement is useful beyond one client, we don't just build it once. We build a product.",
  howEyebrow: 'HOW WE BUILD THEM',
  howHeading: 'How we build them',
  principles: [
    { title: 'Built by the delivery team.', body: 'The engineers who deliver Salesforce projects build the products.' },
    { title: 'Made to stand alone.', body: 'Each product can live on its own domain, with its own identity.' },
    { title: 'Shaped by real needs.', body: "Every product starts with something we've seen teams need." },
  ],
  cta: 'Have a product idea, or want to partner with us?',
} as const satisfies {
  listHeading: string; byline: string; free: string; comingSoon: string;
  whyEyebrow: string; whyHeading: string; whyBody: string; howEyebrow: string;
  howHeading: string; principles: readonly CompanyItem[]; cta: string;
};

export const aboutContent = {
  whoEyebrow: 'WHO WE ARE',
  whoHeading: 'A consultancy and a product company.',
  whoBody: 'Idea Bulut Solutions combines specialist Salesforce delivery with custom software and products of our own. Our products work with Salesforce and beyond, and we work with teams across Spain, Türkiye, the UK and the US.',
  beliefEyebrow: 'WHAT WE BELIEVE',
  beliefHeading: 'How we approach every project.',
  beliefs: [
    { title: 'Intelligent.', body: 'Think before building. The best solutions start with a clear understanding of what you need.' },
    { title: 'Delivery.', body: 'Turn strategy into working systems. A design is finished when your team can run it.' },
    { title: 'Engineered.', body: 'Build with technical precision, so every change makes the next one easier.' },
    { title: 'At scale.', body: "Design for what comes next. What works for today's team should still work for tomorrow's." },
  ],
  workEyebrow: 'HOW WE WORK WITH CLIENTS',
  workHeading: 'Direct, technical and built to be handed over.',
  workBody: 'You work with the engineers doing the work. We explain trade-offs in plain terms, build in stages so you see progress early, and document everything so your team can run what we build with confidence.',
  experienceHeading: 'Experience, certifications and partnerships',
  experience: [
    { title: '12+ years', body: 'Salesforce delivery.' },
    { title: '15x certified', body: 'Across the full range, from Platform App Builder to Integration Architect.' },
    { title: 'Copado certified', body: 'Development, administration and implementation.' },
    { title: 'Technical Partner', body: 'Salesforce Select Partner and Copado Technical Partner.' },
  ],
  productEyebrow: 'PRODUCTS',
  productHeading: 'We build as well as deliver.',
  productBody: 'When something is useful to many teams, we build the tool. Our products come straight from real delivery work, starting with Toolbelt for Copado, free for every Copado customer.',
  productLink: 'Products',
} as const satisfies {
  whoEyebrow: string; whoHeading: string; whoBody: string;
  beliefEyebrow: string; beliefHeading: string; beliefs: readonly CompanyItem[];
  workEyebrow: string; workHeading: string; workBody: string;
  experienceHeading: string; experience: readonly CompanyItem[];
  productEyebrow: string; productHeading: string; productBody: string; productLink: string;
};

export const blogContent = {
  featuredEyebrow: 'START HERE',
  featuredHeading: 'Our best guides.',
  latestHeading: 'Latest articles.',
  empty: "Our first guides are on the way. In the meantime, tell us what you're working on.",
  emptyLink: 'Get in touch',
  readingTime: 'min read',
  previous: 'Previous',
  next: 'Next',
} as const;

export const notFoundContent = {
  heading: 'Page not found.',
  sub: "The page you're looking for doesn't exist or has moved.",
  links: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Products', href: '/products' },
    { label: 'Contact', href: '/contact' },
  ],
} as const;