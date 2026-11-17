import { formatAddress, siteConfig } from '@/config/site';

export type LegalDocumentContent = {
  title: string;
  lastUpdated: string;
  body: string;
};

// Ported from the previous site's /privacy-policy/ page. Paid-consultation (Stripe) booking is
// not offered on this site, so Stripe is not listed.
export const privacyPolicy: LegalDocumentContent = {
  title: 'Privacy Policy',
  lastUpdated: '2026-11-17',
  body: `This policy explains what personal data ${siteConfig.name} collects through this website, why, and what your rights are. It is provided in good faith for transparency and is not legal advice.

## 1. Who is the data controller
The data controller is **${siteConfig.legalName}** ("${siteConfig.name}", "we", "us"), tax ID (CIF) ${siteConfig.taxId}, with its registered office at ${formatAddress()}. You can reach us about privacy at **[${siteConfig.contactEmail}](mailto:${siteConfig.contactEmail})**.

## 2. What we collect
We collect what you give us and, only with your consent, how you use the site:

- **Contact form:** your name, work email, company (optional), the area you're asking about, your message, your **consent** choice and the time it was given, and whether you ticked the optional box to receive marketing emails. If you have accepted marketing cookies, your enquiry is also linked to the pages you viewed on this site.
- **Booking a call:** when you book a discovery call, the booking is handled by Google Calendar appointment scheduling, which collects the details you enter (such as name and email) to schedule the meeting and generate a Google Meet link.
- **Website usage (only if you accept cookies):** pages you visit, how you arrived, and device and browser details, collected by Google Analytics (analytics cookies) and Salesforce Account Engagement (marketing cookies). See section 7.

We do **not** use third-party advertising networks, and we don't sell your data or share it with others for their marketing.

## 3. Why we use it, and the legal basis
We use your data to **respond to your enquiry**, arrange any call you request, send marketing emails **only if you opt in**, and, if you accept cookies, understand how the site is used and which services interest you.

- **Contact form:** the legal basis is your **consent** (GDPR Art. 6(1)(a)), which you give via the form's consent checkbox, and our **legitimate interest** in responding to business enquiries (Art. 6(1)(f)).
- **Marketing emails:** the legal basis is your **consent** (Art. 6(1)(a)), given by ticking the optional box on the contact form. Every email includes an unsubscribe link, and you can also ask us to stop at any time.
- **Analytics and marketing cookies:** the legal basis is your **consent** (Art. 6(1)(a)), given in the cookie banner. You can withdraw it at any time with **Cookie settings** at the bottom of every page.
- **Bookings:** the legal basis is taking steps at your request prior to or during an engagement (Art. 6(1)(b)) and consent.

## 4. Where it's stored and who processes it
Your data is stored in **Google Workspace** (Google Sheets, Google Calendar) and **Salesforce Account Engagement**. We use a small number of processors:

- **Google (Google Workspace, Calendar, Meet)**: form storage and booking.
- **Cloudflare Turnstile**: bot protection on the contact form (no tracking cookies).
- **GitHub Pages**: serves this website.
- **Google Analytics 4 (GA4)**: web analytics to understand how the site is used. GA4 is loaded **only after you accept analytics cookies** in our cookie banner; if you decline, it is not loaded and no analytics cookies are set.
- **Salesforce Account Engagement** (formerly Pardot): stores contact form enquiries so we can follow up, sends marketing emails to people who opted in, and records which pages you visit so we know which of our services interest you. Page tracking is loaded **only after you accept marketing cookies** in our cookie banner.

Some of these providers may process data outside the EU/EEA under appropriate safeguards (e.g. Standard Contractual Clauses).

## 5. How long we keep it
We keep enquiry data for up to **24 months** after our last contact with you, then delete it, unless we are required to keep it longer to comply with a legal obligation. If you opted in to marketing emails, we keep your name and email for that purpose until you unsubscribe or ask us to delete them.

## 6. Your rights
Under the GDPR you have the right to **access, rectify, erase, restrict, object to**, and **port** your personal data, and to **withdraw consent** at any time. To exercise any of these, email **[${siteConfig.contactEmail}](mailto:${siteConfig.contactEmail})**. You also have the right to lodge a complaint with the Spanish supervisory authority, the **Agencia Española de Protección de Datos (AEPD)**.

## 7. Cookies
Cloudflare Turnstile may set a strictly necessary token on the contact form to verify you're not a bot, and your browser's local storage remembers your cookie choice. Everything else is optional and loads **only if you accept** it in the cookie banner shown on your first visit:

- **Analytics:** Google Analytics 4 sets \`_ga\` cookies to count visits and see which pages are used.
- **Marketing:** Salesforce Account Engagement sets \`visitor_id\` and related cookies to recognise returning visitors and the pages they view.

You can accept all, reject all, or choose each category. If you decline, those cookies are not set. You can change your choice at any time with **Cookie settings** at the bottom of every page; withdrawing consent stops the tracking straight away. You can also delete cookies at any time in your browser settings.

## 8. Changes
We may update this policy; the "last updated" date above reflects the latest version.`,
};

export const termsOfService: LegalDocumentContent = {
  title: 'Terms of Service',
  lastUpdated: '2026-11-17',
  body: `## 1. Acceptance
By using this website you agree to these Terms. If you do not agree, please do not use the website.

## 2. About us
This website is operated by **${siteConfig.legalName}**, a company registered in Spain:

- **Registered office:** ${formatAddress()}
- **Tax ID (CIF):** ${siteConfig.taxId}
- **Commercial registry:** ${siteConfig.registryEntry}
- **Email:** [${siteConfig.contactEmail}](mailto:${siteConfig.contactEmail})

## 3. Use of the website
You agree to use the website lawfully. You must not interfere with its operation, attempt unauthorised access, scrape it in bulk, or use it to send unlawful or harmful content.

## 4. Services and engagements
The information on this website describes our services in general and is not a binding offer. Any consulting, implementation or development work is governed by a separate written agreement or statement of work signed by both parties.

## 5. Discovery calls
Our 15-minute discovery call is free and carries no obligation on either side. Unless we have signed a separate non-disclosure agreement, please do not share confidential or sensitive data on the call or in the booking form.

## 6. Intellectual property
The content, design, logo and text of this website belong to ${siteConfig.legalName} or its licensors. You may view and share it for personal or internal business use. Commercial copying or reuse needs our written permission.

## 7. Toolbelt for Copado and our products
Toolbelt for Copado is offered free of charge through the Copado DevOps Exchange. It is provided "as is", without warranty. You are responsible for testing it in a sandbox before using it in production. Other products may have their own terms and domains.

## 8. Third-party names and links
Salesforce, Copado, GitHub, Google, Claude and other names are trademarks of their respective owners. We use them only to identify those companies, and this does not imply endorsement. We link to third-party websites and are not responsible for their content or practices.

## 9. Disclaimer
The website and its content are provided "as is" and "as available". We do not guarantee that the website will be uninterrupted or error-free, or that its content is complete or current. The content is general information and not professional advice for your specific situation.

## 10. Limitation of liability
To the fullest extent allowed by law, we are not liable for indirect, incidental or consequential loss arising from your use of the website or the free tools we provide. Nothing in these Terms excludes liability that cannot be excluded by law, including liability for fraud or for death or personal injury caused by negligence.

## 11. Privacy
Our [Privacy Policy](/privacy/) explains how we handle personal data. By using the website you acknowledge it.

## 12. Governing law
These Terms are governed by the laws of Spain, and the courts of Madrid have jurisdiction, without affecting any mandatory consumer rights you have in your own country.

## 13. Changes to these Terms
We may update these Terms at any time. Changes take effect when posted on this page. Continuing to use the website means you accept the updated Terms.

Questions about these Terms? Contact us at [${siteConfig.contactEmail}](mailto:${siteConfig.contactEmail}).`,
};
