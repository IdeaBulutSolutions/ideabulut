import type { IconName } from '@/components/ui/icons';
import { salesforceDevopsFaq } from '@/data/faqs/salesforce-devops';
import { marketingCloudMigrationFaq } from '@/data/faqs/marketing-cloud-migration';
import { aiFaq } from '@/data/faqs/ai';
import { customSoftwareFaq } from '@/data/faqs/custom-software';

export type CopySection = { eyebrow: string; heading: string; body: string };
export type ServicePath = '/services/salesforce-devops' | '/services/marketing-cloud-migration' | '/services/ai' | '/services/custom-software';
export type Capability = { title: string; description: string; icon: IconName; link?: { label: string; href: string } };
export type Step = { title: string; description: string; outcome: string };
export type ServiceContent = {
  path: ServicePath;
  title: string;
  metaDescription: string;
  breadcrumb: string;
  eyebrow: string;
  heading: string;
  sub: string;
  /** Label for the booking button at the bottom of the page. */
  ctaLabel: string;
  intro: CopySection;
  checks?: { label: string; items: readonly string[] };
  capabilities: { eyebrow: string; heading: string; items: readonly Capability[] };
  statement?: CopySection;
  principles?: { eyebrow: string; heading: string; items: readonly { title: string; description: string; icon?: IconName }[] };
  process: { eyebrow: string; heading: string; steps: readonly Step[] };
  experience: CopySection & { chips?: readonly { label: string; icon: IconName }[] };
  product?: { label: string; description: string; linkLabel: string; href: string };
  notice?: { label: string; body: string };
  faq: { heading: string; items: readonly { question: string; answer: string }[] };
};

export const serviceUi = {
  youGet: 'You get:',
  faqHeading: 'Frequently Asked Questions',
  relatedReading: 'Related reading',
  readingLink: 'Read article',
  indexMarker: 'Explore the practices',
  productLink: 'Products',
} as const;

export const servicesIndex = {
  path: '/services',
  title: 'Services | Idea Bulut Solutions',
  metaDescription: 'Salesforce DevOps, Marketing Cloud migration, Claude-based AI and custom software, built right and handed over ready to run.',
  breadcrumb: 'Services',
  eyebrow: 'SERVICES',
  heading: 'Built right. Ready to run.',
  sub: 'Whatever we build, we start with the architecture, work in stages and hand over a system your team can run without us.',
  ctaLabel: 'Talk through your goal',
  goalsHeading: 'What do you want to achieve?',
  goalsIntro: 'Start with your goal, and we’ll choose the technology together.',
  goals: [
    { goal: 'Predictable releases, from commit to production.', practice: 'Salesforce DevOps', href: '/services/salesforce-devops' },
    { goal: 'Move to Marketing Cloud Next, keeping everything that works.', practice: 'Marketing Cloud Migration', href: '/services/marketing-cloud-migration' },
    { goal: 'Claude-powered skills and agents built around your process.', practice: 'Artificial Intelligence', href: '/services/ai' },
    { goal: 'Whatever you need, built to keep running.', practice: 'Custom Software', href: '/services/custom-software' },
  ],
  principlesHeading: 'One standard, every practice',
  principles: [
    { title: 'Think before building.', description: 'We define what you need, the constraints and what "done" looks like before we write anything.' },
    { title: 'Build in stages.', description: 'You see working software early, tested against real cases, not a big reveal at the end.' },
    { title: 'Engineer for change.', description: 'Systems are designed so the next change is easier, not harder.' },
    { title: 'Hand over ready to run.', description: 'Documentation, knowledge transfer and clear ownership, so your team is never dependent on us.' },
  ],
} as const;

export const servicePages: Record<ServicePath, ServiceContent> = {
  '/services/salesforce-devops': {
    path: '/services/salesforce-devops',
    title: 'Salesforce DevOps, Copado & CI/CD | Idea Bulut',
    metaDescription: 'Release pipelines, environment strategy, Copado implementation and optimisation, and GitHub Actions CI/CD. Predictable Salesforce releases.',
    breadcrumb: 'Salesforce DevOps',
    ctaLabel: 'Talk about your pipeline',
    eyebrow: 'SALESFORCE DEVOPS',
    heading: 'Salesforce releases your team can run without heroics.',
    sub: 'We design the pipeline, environments and automation that take every change from commit to production predictably, with Copado, GitHub Actions or both.',
    intro: {
      eyebrow: 'RELIABLE RELEASES',
      heading: 'Reliable releases are built long before release day.',
      body: "Predictable Salesforce releases start long before release day: sandboxes that match production, one agreed path for every change, and a process your whole team can follow. Tooling works best on top of that.",
    },
    checks: { label: 'What good looks like', items: [
      'Every change follows one path to production.',
      'Sandboxes stay in step with production.',
      'Issues surface in validation, not on release day.',
      "Everyone can see what's in the next release.",
      "Releases don't depend on any one person.",
    ] },
    capabilities: { eyebrow: 'THE PIPELINE, END TO END', heading: 'What we design and build.', items: [
      { title: 'Release pipeline architecture', description: 'The path every change takes from commit to production, designed around your team and your governance needs.', icon: 'branch' },
      { title: 'Copado implementation', description: 'Copado set up for your org, teams and process, so the tool matches how you work.', icon: 'infinity' },
      { title: 'Copado optimisation', description: 'A running Copado setup brought back into shape: faster, more consistent and easier to maintain.', icon: 'check' },
      { title: 'GitHub Actions and CI/CD', description: 'Automated validation, testing and deployment, so quality checks run on every change and not only before a release.', icon: 'code' },
      { title: 'Environment strategy', description: 'Which sandboxes you need, what each one is for, and how they stay in sync with production.', icon: 'layers' },
      { title: 'Release management', description: 'A clear release process with promotion rules, approvals and rollback paths.', icon: 'upload' },
    ] },
    statement: { eyebrow: 'Copado & Github Actions', heading: 'Each one does a different job.', body: "Copado brings structure: pipelines, promotion, governance and visibility. GitHub Actions brings flexibility: custom automation and CI checks. Many teams use both. We design the split around your team's size, your governance needs and the tools you already use, not around a vendor preference." },
    process: { eyebrow: 'HOW AN ENGAGEMENT RUNS', heading: 'From current setup to a pipeline you own.', steps: [
      { title: 'Assess.', description: 'We map your current pipeline, environments and release process, including the steps that aren’t written down.', outcome: 'a written assessment with prioritised findings.' },
      { title: 'Design.', description: 'We define the target pipeline, environment strategy and promotion rules.', outcome: 'a blueprint your team can review and refine.' },
      { title: 'Implement.', description: 'We configure Copado and GitHub Actions, build the automation and move your teams onto it.', outcome: 'a working pipeline used on real releases.' },
      { title: 'Hand over.', description: 'We document everything and train your team.', outcome: 'a release process your team runs confidently on its own.' },
    ] },
    experience: { eyebrow: 'COPADO TECHNICAL PARTNER', heading: 'We build the tools we recommend.', body: 'We’re a Copado Technical Partner with 12+ years of Salesforce delivery experience, and we build tools for the Copado community ourselves.' },
    product: { label: 'Toolbelt for Copado', description: 'Toolbelt for Copado, a free tool built by our team for Copado customers.', linkLabel: 'View all products', href: '/products' },
    faq: { heading: serviceUi.faqHeading, items: salesforceDevopsFaq },
  },
  '/services/marketing-cloud-migration': {
    path: '/services/marketing-cloud-migration',
    title: 'ExactTarget to Marketing Cloud Next Migration | Idea Bulut',
    metaDescription: 'Specialist migration from ExactTarget / Marketing Cloud Engagement to Marketing Cloud Next. Audited, mapped and validated. Migration only.',
    breadcrumb: 'Marketing Cloud Migration',
    ctaLabel: 'Plan your migration',
    eyebrow: 'MARKETING CLOUD MIGRATION',
    heading: 'Move from ExactTarget to Marketing Cloud Next, keeping everything that works.',
    sub: 'Specialist migration for teams already on Marketing Cloud Engagement: audited, mapped, rebuilt and validated before you cut over.',
    notice: { label: 'Migration only.', body: 'We do not implement new Marketing Cloud Engagement environments. This service is for organisations that already have one.' },
    intro: { eyebrow: 'THE ROADMAP', heading: 'A clear path to Marketing Cloud Next.', body: 'Marketing Cloud Next is built around Data Cloud, so the route from Marketing Cloud Engagement (ExactTarget) is a planned convergence, often in phases, rather than a switch you flip. We map that route first: what moves, in what order, and how your campaigns keep running along the way.' },
    statement: { eyebrow: 'EVERY ELEMENT GETS A DECISION', heading: 'Move it, rebuild it, or retire it.', body: 'Years of ExactTarget use build up a lot. We take stock of it all, decide the right treatment for each part, and leave you with a cleaner environment.' },
    capabilities: { eyebrow: 'EVERY ELEMENT GETS A DECISION', heading: 'Move it, rebuild it, or retire it.', items: [
      { title: 'Data and data models', description: 'Data extensions, subscriber data and how they map to the new platform.', icon: 'layers' },
      { title: 'Journeys', description: 'Existing customer journeys, rebuilt where needed.', icon: 'branch' },
      { title: 'Automations', description: 'Automated processes and scheduled activities, carried over or simplified.', icon: 'swap' },
      { title: 'Email and content', description: 'Templates, content and assets.', icon: 'window' },
      { title: 'Audiences and segments', description: 'The audiences your campaigns depend on.', icon: 'person' },
      { title: 'Integrations', description: 'Connections with Salesforce and other systems.', icon: 'link' },
    ] },
    process: { eyebrow: 'FROM AUDIT TO CUT-OVER', heading: 'Five steps to Marketing Cloud Next.', steps: [
      { title: 'Assess.', description: 'We inventory what exists, what is used and what can be retired.', outcome: 'a complete picture of your current environment.' },
      { title: 'Plan.', description: 'We define how each element translates to Marketing Cloud Next.', outcome: 'a migration plan with dependencies and order.' },
      { title: 'Migrate.', description: 'We move and rebuild in a controlled sequence.', outcome: 'the new environment built up in stages.' },
      { title: 'Validate.', description: 'We test against real campaigns and data.', outcome: 'evidence it works before you rely on it.' },
      { title: 'Hand-over.', description: 'Go-live, documentation and support.', outcome: 'a clean switch and a team that knows the new platform.' },
    ] },
    experience: { eyebrow: 'A FOCUSED PRACTICE', heading: 'Migration is the whole point.', body: 'We plan what moves, what gets rebuilt and what retires, then validate everything before you cut over.' },
    faq: { heading: serviceUi.faqHeading, items: marketingCloudMigrationFaq },
  },
  '/services/ai': {
    path: '/services/ai',
    title: 'Claude AI Solutions: Custom Skills, Agents and Automation | Idea Bulut',
    metaDescription: 'Custom Claude skills, AI agents and automation built around your process, with people in control. Book a free 15-minute discovery call.',
    breadcrumb: 'AI',
    ctaLabel: 'Find your first AI use case',
    eyebrow: 'AI',
    heading: 'AI that does real work in your process, built around Claude.',
    sub: 'We build custom Claude skills, agents and automation that fit how your team works, and that your team can maintain.',
    intro: { eyebrow: 'ONE PROCESS AT A TIME', heading: 'AI earns its place in real work.', body: 'The AI that lasts starts with a specific piece of work your team already does, then handles it reliably, with people in control of the decisions that matter. We choose that process with you, build a working version quickly, and test it on your real cases before anyone relies on it.' },
    capabilities: { eyebrow: 'WHAT WE BUILD', heading: 'Skills, agents and automation.', items: [
      { title: 'Custom Claude skills', description: "Reusable, task-specific capabilities that make Claude dependable for your team's recurring work.", icon: 'chip' },
      { title: 'AI agents', description: 'Agents that carry out multi-step tasks within clear limits and with human oversight.', icon: 'branch' },
      { title: 'AI-assisted delivery workflows', description: 'Claude built into how a delivery team plans, builds, reviews and documents its work.', icon: 'code' },
      { title: 'Internal automation', description: 'Repetitive internal processes handled by AI-supported workflows.', icon: 'swap' },
      { title: 'Custom AI solutions', description: 'Purpose-built systems around your data and your process.', icon: 'cube' },
      { title: 'Security and governance', description: 'Access, data handling and human review designed into every solution from the start.', icon: 'shield' },
    ] },
    principles: { eyebrow: 'HOW WE BUILD AI', heading: 'Three principles.', items: [
      { title: 'Start with a process, not a tool.', description: 'We begin with real work your team does today.', icon: 'branch' },
      { title: 'Keep people in control.', description: 'Decisions that matter stay with humans.', icon: 'person-check' },
      { title: 'Build it to be maintained.', description: 'Your team can understand, adjust and run it.', icon: 'wrench' },
    ] },
    process: { eyebrow: 'FROM IDEA TO DAILY USE', heading: 'Four steps.', steps: [
      { title: 'Pick a process.', description: 'One workflow with a clear before and after.', outcome: 'a scoped use case and a definition of success.' },
      { title: 'Build a small working version.', description: 'Not a slide deck.', outcome: 'something your team can try on real work.' },
      { title: 'Test on real cases.', description: 'We check quality and edge cases.', outcome: 'evidence of where it works and where it needs refinement.' },
      { title: 'Roll out and improve.', description: 'We expand once it has earned trust.', outcome: 'a system in daily use and a team that can maintain it.' },
    ] },
    experience: { eyebrow: 'EXPERIENCE', heading: 'Built by a team that delivers technical work every day.', body: 'Our AI work is built primarily around Claude, and it comes from a team that delivers Salesforce and DevOps projects daily. We understand the processes, systems and constraints involved, and we build AI the way we build software: scoped, tested and maintainable.', chips: [
      { label: 'Scoped access', icon: 'shield' },
      { label: 'Human review', icon: 'person-check' },
      { label: 'Tested before rollout', icon: 'check' },
    ] },
    faq: { heading: serviceUi.faqHeading, items: aiFaq },
  },
  '/services/custom-software': {
    path: '/services/custom-software',
    title: 'Custom Software Development | Idea Bulut Solutions',
    metaDescription: 'Integrations, internal tools, data pipelines, developer tooling and AI agents. Custom software built right and handed over ready to run.',
    breadcrumb: 'Custom Software',
    ctaLabel: 'Scope your build',
    eyebrow: 'CUSTOM SOFTWARE',
    heading: 'Custom software, built right and handed over ready to run.',
    sub: 'When your platform reaches its edge, we design and build the integrations, tools and products that take your team further.',
    intro: { eyebrow: 'BEYOND THE PLATFORM', heading: 'Software that fits how you work.', body: 'Every platform is designed for the typical case. We build around what is specific to you, connecting your platforms and tools so information moves on its own and your team works in one place.' },
    capabilities: { eyebrow: 'WHAT WE BUILD', heading: 'From integrations to whole products.', items: [
      { title: 'Integrations and APIs', description: 'Reliable connections between Salesforce and your other systems, with monitoring built in so every sync is visible.', icon: 'link' },
      { title: 'Internal tools and portals', description: 'Custom applications built around how your team actually works, extending what your platform can do.', icon: 'window' },
      { title: 'Automation and data pipelines', description: 'Scheduled and event-driven flows that move, transform and sync data between systems, with clear logging at every step.', icon: 'swap' },
      { title: 'Developer and release tooling', description: "Tools that make delivery teams' daily work smoother. Toolbelt for Copado is one we built ourselves.", icon: 'code' },
      { title: 'AI agents and skills', description: 'Claude built into how your team delivers and operates, from custom skills to agents.', icon: 'chip', link: { label: 'See our AI practice', href: '/services/ai' } },
      { title: 'Custom products', description: 'From prototype to product, standalone or connected to Salesforce, built to be maintained for the long term.', icon: 'cube' },
    ] },
    process: { eyebrow: 'FROM IDEA TO RUNNING SYSTEM', heading: 'How a build unfolds.', steps: [
      { title: 'Shape the idea.', description: 'We start with what needs to happen, not with a technology.', outcome: 'a clear scope and agreed success criteria.' },
      { title: 'Design the architecture.', description: 'Data, integrations, security and how it will grow.', outcome: 'an architecture you can review before anything is built.' },
      { title: 'Build in stages.', description: 'Working software early, tested against real cases and real data.', outcome: 'something to use and comment on at each stage.' },
      { title: 'Hand over ready to run.', description: 'Documentation, knowledge transfer and monitoring.', outcome: 'a system your team can operate and change without us.' },
    ] },
    experience: { eyebrow: 'ANY SOFTWARE YOU NEED', heading: 'Whatever you need, built to keep running.', body: '' },
    faq: { heading: serviceUi.faqHeading, items: customSoftwareFaq },
  },
};