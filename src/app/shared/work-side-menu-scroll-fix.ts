/**
 * goab-work-side-menu's Angular wrapper still renders the plain
 * goa-work-side-menu web component underneath it (no DS 2.0 render mode
 * exists for work-side-menu in the installed @abgov/web-components yet) —
 * same shadow DOM, same goa-scrollable wrapping primary + secondary +
 * profile + the collapse toggle in one flex column with no scroll region of
 * its own. A long (or even moderate — the budget is tight) primary list
 * pushes everything below it off-screen with no way to reach it.
 *
 * This sizes a `.primary-scroll` wrapper (which the caller must place around
 * its primary-slot content) to fit within goa-scrollable's own budget, so
 * only the list scrolls and the rest stays pinned in view — and widens the
 * collapsed 4.5rem icon rail when that wrapper's own scrollbar is present,
 * since the scrollbar otherwise has nowhere to go but on top of the
 * centered icons (which also forces a horizontal scroll).
 *
 * Call once from the host component's ngAfterViewInit, passing its own host
 * element (the one with a `.primary-scroll` descendant and a nested
 * `goab-work-side-menu`).
 */
export function setUpWorkSideMenuScrollFix(hostEl: HTMLElement): void {
  const goabMenu = hostEl.querySelector('goab-work-side-menu');
  if (!goabMenu) return;

  const findTargets = () => {
    const menu = goabMenu.querySelector('goa-work-side-menu');
    const shadow = menu?.shadowRoot;
    const nav = shadow?.querySelector('.menu');
    const scrollableDiv = shadow?.querySelector('goa-scrollable')?.shadowRoot?.querySelector('.goa-scrollable');
    const primaryScroll = hostEl.querySelector('.primary-scroll');
    return menu && nav && scrollableDiv && primaryScroll ? { menu, nav, scrollableDiv, primaryScroll } : null;
  };

  // goab-work-side-menu (and every goab-work-side-menu-item/-group nested
  // inside it) each gate their own render behind an internal "isReady" flag
  // that flips one tick after their own ngOnInit — and since items inside
  // groups only get created once the group's own flag has already flipped,
  // that's one extra tick per nesting level. So the real goa-work-side-menu
  // element (and its shadow DOM) may not exist yet the instant this runs —
  // wait for it before doing anything else.
  const setUpScrollFix = (menu: Element, nav: Element, scrollableDiv: Element, primaryScroll: Element): void => {
    // Once found, the nav's real height still keeps growing for a few more
    // ticks as the same async upgrade cascades through the rest of the
    // list. Measuring too early undercounts "everything below the list" and
    // caps this wrapper too generously, which is exactly what lets an outer
    // scrollbar creep back in. Debounce on resize until the nav stops
    // growing (a one-time layout decision, not a live binding to keep
    // re-deriving), with a fixed-delay fallback for contexts where
    // ResizeObserver never fires (e.g. a backgrounded tab).
    let applied = false;
    const apply = () => {
      if (applied) return;
      applied = true;
      observer.disconnect();
      clearTimeout(settleTimer);
      clearTimeout(fallbackTimer);
      const budget = scrollableDiv.clientHeight;
      const belowPrimary = scrollableDiv.scrollHeight - primaryScroll.scrollHeight;
      hostEl.style.setProperty('--primary-max-height', `${budget - belowPrimary}px`);

      // On some menus, a very last bit of async upgrade/paint still lands a
      // tick after the debounce settles, leaving goa-scrollable a couple of
      // px short of what it actually needs (a real outer scrollbar). A flat
      // safety margin applied to every menu isn't the fix — on a short list
      // that already fits exactly, it just manufactures an unnecessary
      // scrollbar of its own. Instead, check for that gap after applying and
      // trim exactly what's left, so a menu that already fits perfectly
      // (immediately true here) is never touched again.
      const shortfall = scrollableDiv.scrollHeight - scrollableDiv.clientHeight;
      if (shortfall > 0) {
        hostEl.style.setProperty('--primary-max-height', `${budget - belowPrimary - shortfall}px`);
      }

      // Collapsed, the rail narrows to --goa-work-side-menu-width-closed
      // (4.5rem) and this wrapper's own scrollbar — thinned to match
      // goa-scrollable's, but still real width — has nowhere to go but on
      // top of the centered icons. Only widen the rail when a scrollbar is
      // actually present; leave the library's default alone otherwise.
      const needsScroll = primaryScroll.scrollHeight > primaryScroll.clientHeight;
      const updateCollapsedWidth = () => {
        const isOpen = menu.hasAttribute('open');
        if (!isOpen && needsScroll) {
          hostEl.style.setProperty('--goa-work-side-menu-width-closed', 'calc(4.5rem + var(--goa-space-xs))');
        } else {
          hostEl.style.removeProperty('--goa-work-side-menu-width-closed');
        }
      };
      updateCollapsedWidth();
      new MutationObserver(updateCollapsedWidth).observe(menu, { attributes: true, attributeFilter: ['open'] });
    };

    let settleTimer: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(() => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(apply, 100);
    });
    observer.observe(nav);
    const fallbackTimer = setTimeout(apply, 500);
  };

  const initial = findTargets();
  if (initial) {
    setUpScrollFix(initial.menu, initial.nav, initial.scrollableDiv, initial.primaryScroll);
    return;
  }
  const readyObserver = new MutationObserver(() => {
    const targets = findTargets();
    if (targets) {
      readyObserver.disconnect();
      setUpScrollFix(targets.menu, targets.nav, targets.scrollableDiv, targets.primaryScroll);
    }
  });
  readyObserver.observe(goabMenu, { childList: true, subtree: true });
}
