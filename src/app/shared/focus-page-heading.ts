// After a side-menu navigation, moves focus to the new page's h1. Otherwise
// focus stays on the menu item, and a keyboard user has to Tab through every
// remaining menu item to reach the page (WCAG 2.4.3). The heading also gives
// screen readers the new page's name. Called a tick after the navigation, so
// the routed page has rendered; it works for a click on the current page too.
export function focusPageHeading(host: HTMLElement): void {
  setTimeout(() => {
    const heading = host.querySelector<HTMLElement>('router-outlet ~ * h1');
    if (!heading) return;
    heading.setAttribute('tabindex', '-1');
    heading.focus();
  });
}
