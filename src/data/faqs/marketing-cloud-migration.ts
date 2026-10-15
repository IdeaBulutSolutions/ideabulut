import type { FaqItem } from '@/lib/content/schemas';

export const marketingCloudMigrationFaq: readonly FaqItem[] = [
  { question: 'How do you migrate from ExactTarget to Marketing Cloud Next?', answer: 'We audit what exists, map how each element translates, rebuild and migrate in a controlled sequence, validate against real campaigns and data, then cut over and hand over. Every element gets a clear decision: move it, rebuild it or retire it.' },
  { question: 'What is the difference between ExactTarget, Marketing Cloud Engagement and Marketing Cloud Next?', answer: 'ExactTarget is the original name of what is now called Marketing Cloud Engagement. Marketing Cloud Next is the newer Salesforce marketing platform, built around Data Cloud. The route from one to the other is a planned convergence, often in phases.' },
  { question: 'Where do we start?', answer: 'With an audit. We inventory what exists, what is used and what can be retired, so you get a complete picture of your current environment and a migration plan with dependencies and order. A free 15-minute discovery call is the easiest way to talk through your starting point.' },
  { question: 'Do we need Data Cloud?', answer: 'Marketing Cloud Next is built around Data Cloud, so we plan for it as part of the route. We map what is needed during the audit and include it in your migration plan.' },
  { question: 'Can the migration happen in phases?', answer: 'Yes. The move to Marketing Cloud Next is often a planned convergence in phases rather than a single switch. We map what moves, in what order, and how your campaigns keep running along the way.' },
  { question: 'Can our campaigns keep running during the migration?', answer: 'Yes. We migrate in a controlled sequence and validate against real campaigns and data before cut-over, so your campaigns keep running along the way.' },
  { question: 'What gets migrated?', answer: 'Data extensions and data models, journeys, automations, email templates and content, audiences and segments, and integrations. Each element gets a decision: move it, rebuild it or retire it.' },
  { question: 'Do you work with existing Marketing Cloud Engagement environments?', answer: 'Yes. This service is dedicated to migrating existing Marketing Cloud Engagement environments to Marketing Cloud Next.' },
];
