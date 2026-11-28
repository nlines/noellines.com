// Contact details, shared by the Contact page and the Home call-to-action so
// each is written down once.
export const contacts = [
  { label: 'Email', value: 'nlines@gmail.com', href: 'mailto:nlines@gmail.com' },
  { label: 'GitHub', value: 'github.com/nlines', href: 'https://github.com/nlines' },
  { label: 'LinkedIn', value: 'linkedin.com/in/noel-lines', href: 'https://www.linkedin.com/in/noel-lines/' },
]

// Web links open in a new tab so the visitor keeps this site; a mailto: link
// hands off to the mail app and must not open a blank tab.
export const isExternal = (href: string) => href.startsWith('http')
