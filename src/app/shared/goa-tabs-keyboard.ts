// Keyboard fixes for a goab-tabs with navigation="none". Both depend on
// goa-tabs internals; re-check them on any @abgov/web-components bump.

// With navigation="none", goa-tabs selects nothing on load unless it gets an
// initial tab, so no tab is focusable or announced as selected (WCAG 2.1.1,
// 4.1.2). Give it [initialTab]="1", then call this from the constructor: the
// wrapper passes the value as an attribute, the string "1", and goa-tabs then
// computes the next tab as "1" + 1 = "11", so the first arrow key press does
// nothing. goa-tabs reads initialtab a tick after its tabs announce themselves
// with "tab:mounted", so this catches that event on the way down and swaps in
// a number.
export function fixInitialTabType(host: HTMLElement): void {
  host.addEventListener(
    'tab:mounted',
    () => {
      const tabs = host.querySelector('goa-tabs') as (HTMLElement & { initialtab?: unknown }) | null;
      if (tabs && typeof tabs.initialtab === 'string') tabs.initialtab = Number(tabs.initialtab);
    },
    { capture: true },
  );
}

// Sends focus to the selected tab, which goa-tabs renders in its shadow root.
// Used after an action removes the focused control (e.g. "Mark all as complete"
// empties its tab and hides itself), so keyboard and screen reader users stay
// in place instead of falling back to the top of the page (WCAG 2.4.3).
export function focusSelectedTab(host: HTMLElement): void {
  const tabs = host.querySelector('goa-tabs');
  const selected = tabs?.shadowRoot?.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]');
  selected?.focus();
}
