/**
 * Sets a page's title everywhere it shows up: the browser tab, and the title
 * in link previews (Open Graph and Twitter cards).
 *
 * `title` goes through the site-wide `%s · Noel Lines` template for the tab,
 * and the same text is written out in full for the preview tags, because
 * those tags don't apply the template. Home doesn't use this: its title is
 * the tagline on its own, set directly in pages/index.vue.
 */
export function usePageTitle(title: string) {
  const full = `${title} · Noel Lines`

  useSeoMeta({
    title,
    ogTitle: full,
    twitterTitle: full,
  })
}
