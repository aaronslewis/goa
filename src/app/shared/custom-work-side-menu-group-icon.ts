/**
 * goa-work-side-menu-group's `icon` only takes a name from the Ionicons set,
 * which has no icon for some menu entries (e.g. a house with people for Family
 * Day Home). The group renders that name through goa-icon → ion-icon inside
 * nested shadow roots, and ion-icon's `src` outranks its `name`, so pointing
 * `src` at our own SVG swaps the artwork while keeping the menu's size,
 * colour, hover and collapsed states.
 *
 * The SVG must follow Ionicons' outline conventions (a `class="ionicon"` root
 * and `ionicon-fill-none ionicon-stroke-width` on each shape, on a 512 grid);
 * without the root class ion-icon draws it with no stroke, i.e. invisibly.
 *
 * This reaches into the library's shadow DOM, like provider-portal-menu's
 * line-height patch, so re-check it on any @abgov/web-components bump.
 *
 * Call once from the host component's ngAfterViewInit with its own host
 * element. Keep a real `icon` name on the group as the fallback.
 */
export function useCustomWorkSideMenuGroupIcon(hostEl: HTMLElement, heading: string, src: string): void {
  const findGroup = () =>
    [...hostEl.querySelectorAll('goa-work-side-menu-group')].find((g) => g.getAttribute('heading') === heading);

  const apply = (group: Element): boolean => {
    const ionIcon = group.shadowRoot?.querySelector('goa-icon')?.shadowRoot?.querySelector('ion-icon');
    if (!ionIcon) return false;
    if (ionIcon.getAttribute('src') !== src) ionIcon.setAttribute('src', src);
    return true;
  };

  // The menu and its groups render a tick or more after mount, and their
  // shadow roots aren't visible to a MutationObserver on the host, so poll
  // briefly until the icon exists.
  let tries = 0;
  const timer = setInterval(() => {
    const group = findGroup();
    if (group?.shadowRoot && apply(group)) {
      clearInterval(timer);
      // Re-apply if the group re-renders its icon (e.g. collapsing the menu).
      new MutationObserver(() => apply(group)).observe(group.shadowRoot, { childList: true, subtree: true });
    } else if (++tries > 100) {
      clearInterval(timer);
    }
  }, 100);
}
