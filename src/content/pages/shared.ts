export const innerCta = {
  heading: "Let's talk about your project.",
  sub: "Tell us what you need. We'll work out the architecture behind it.",
  button: 'Book a free 15-min call',
  href: '/book-a-call',
} as const;
export const cookieConsent = {
  title: 'We use cookies',
  text: 'We use our own and third-party cookies to understand how our website is used and to make our marketing more relevant. Learn more in our',
  privacyLink: 'Privacy Policy',
  acceptAll: 'Accept all',
  rejectAll: 'Reject all',
  customize: 'Manage preferences',
  save: 'Save preferences',
  alwaysOn: 'Always active',
  necessary: { name: 'Strictly necessary', description: 'Required for the website to work, such as spam protection on forms and remembering your cookie choices.' },
  categories: {
    analytics: { name: 'Analytics', description: 'Help us understand how visitors use the website so we can improve it.' },
    marketing: { name: 'Marketing', description: 'Help us understand which services interest you so we can follow up more relevantly.' },
  },
  settings: 'Cookie settings',
} as const;
