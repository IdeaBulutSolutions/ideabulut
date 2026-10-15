import type { FaqItem } from '@/lib/content/schemas';

export const customSoftwareFaq: readonly FaqItem[] = [
  { question: 'What kind of custom software do you build?', answer: 'Integrations and APIs, automation and data pipelines, internal tools and portals, developer and release tooling, AI agents and skills, and complete products. We start with what needs to happen, then choose the right technology.' },
  { question: 'Can you build software that works beyond Salesforce?', answer: 'Yes. We build software that connects to Salesforce and software that stands on its own. Tools and products can be standalone or connected, depending on what your team needs.' },
  { question: 'Can you integrate Salesforce with our other systems?', answer: 'Yes. We build reliable connections between Salesforce and the other platforms and systems around it, with error handling and monitoring designed in, so every sync is visible and recoverable.' },
  { question: 'Can you build an internal tool or portal for our team?', answer: 'Yes. We build custom applications around how your team actually works, extending what your platform can do.' },
  { question: 'Can you work with our existing team?', answer: 'Yes. We work alongside your developers, admins and stakeholders. You review the architecture before anything is built, and you can try and comment on working software at each stage.' },
  { question: 'How do you keep custom software maintainable?', answer: 'We document it from day one, build in monitoring and logging, and design it to be maintained over the long term. Everything is built so your team can operate and change it.' },
  { question: 'What happens after handover?', answer: 'You receive documentation, knowledge transfer and monitoring. Your team can operate and change the system without us.' },
  { question: 'How do we get started?', answer: 'With a free 15-minute discovery call. Tell us what needs to happen, and we shape it into a clear scope, agreed success criteria and a timeline.' },
];
