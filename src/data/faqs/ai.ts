import type { FaqItem } from '@/lib/content/schemas';

export const aiFaq: readonly FaqItem[] = [
  { question: 'What are custom Claude skills?', answer: "Custom Claude skills are reusable, task-specific capabilities that make Claude dependable for your team's recurring work. We build them around your process, so your team gets consistent results every time." },
  { question: 'What are AI agents, and how do you keep them under control?', answer: 'AI agents carry out multi-step tasks within clear limits. We define what each agent can do and access, and we keep people in control of the decisions that matter, with human oversight built in.' },
  { question: 'Why build with Claude?', answer: 'Our AI work is built primarily around Claude because it handles complex, multi-step work reliably and fits well into technical workflows. We choose the right approach for each process together with you.' },
  { question: 'Can AI work with our Salesforce and Copado processes?', answer: 'Yes. Our team delivers Salesforce and DevOps projects every day, so we understand the processes and systems involved. We build AI into your existing workflows, including AI-assisted delivery workflows for release teams.' },
  { question: 'How do you keep our data and processes secure?', answer: 'We design access, data handling and human review into every solution from the start, and we scope each solution to the data and systems it needs. We talk through your requirements in the first conversation.' },
  { question: 'Where should we start with AI?', answer: 'With one process your team already does. We choose it together, build a small working version quickly, and test it on your real cases before anyone relies on it. A free 15-minute discovery call is the easiest way to begin.' },
  { question: 'How long does an AI project take?', answer: 'We build a small working version quickly, test it, then expand once it has earned trust. We scope the timeline for your process in a free 15-minute discovery call.' },
  { question: 'Who maintains it afterwards?', answer: 'Your team. Everything we build is designed so your team can understand, adjust and run it, and we hand over documentation so you stay in control.' },
];
