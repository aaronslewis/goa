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
    const secondaryMenu = shadow?.querySelector('.secondary-menu');
    const toggleMenu = shadow?.querySelector('.toggle-menu');
    const primaryScroll = hostEl.querySelector('.primary-scroll');
    return menu && nav && scrollableDiv && secondaryMenu && toggleMenu && primaryScroll
      ? { menu, nav, scrollableDiv, secondaryMenu, toggleMenu, primaryScroll }
      : null;
  };

  // goab-work-side-menu (and every goab-work-side-menu-item/-group nested
  // inside it) each gate their own render behind an internal "isReady" flag
  // that flips one tick after their own ngOnInit — and since items inside
  // groups only get created once the group's own flag has already flipped,
  // that's one extra tick per nesting level. So the real goa-work-side-menu
  // element (and its shadow DOM) may not exist yet the instant this runs —
  // wait for it before doing anything else.
  const setUpScrollFix = (
    menu: Element,
    nav: Element,
    scrollableDiv: Element,
    secondaryMenu: Element,
    toggleMenu: Element,
    primaryScroll: Element
  ): void => {
    // secondary + profile + toggle never change size, so "everything below
    // the list" *looks* like a true constant, but isn't quite — its exact
    // value drifted a little in testing between an empty and a fully
    // expanded list, most likely because the internal scrollbar appearing
    // takes a sliver of width away from every child sharing this flex
    // column, including secondary/toggle, and that's enough to reflow their
    // text and change their height slightly. Trying to derive it as
    // scrollableDiv.scrollHeight - primaryScroll.scrollHeight is wrong for a
    // different reason on a short/collapsed list: .primary-menu
    // (shadow-internal) has flex-grow:1 and stretches to fill .menu's own
    // min-height floor whenever content doesn't already reach it, and that
    // stretch would get wrongly counted as space secondary/profile/toggle
    // need, shrinking the cap far more than necessary and manufacturing the
    // exact scrollbar (on lots of visibly free space) this fix exists to
    // prevent. Recomputing this fresh each time — it's a couple of cheap DOM
    // reads — sidesteps both problems at once.
    //
    // Summing each of the three elements' own height plus its own
    // margin-top looked like the right way to measure it, but undercounted:
    // the gap between profile and the toggle turned out to be profile's
    // margin-*bottom*, not the toggle's margin-top, so a purely per-element
    // sum silently drops any gap that isn't implemented as the following
    // element's margin-top. A single position-based span from the top of
    // secondary to the bottom of the toggle captures every margin in
    // between correctly, whichever element declares it — the only piece
    // that still needs its own margin-top read directly is the gap *before*
    // secondary, since there's nothing above it in this span to measure
    // from.
    const belowPrimaryHeight = () =>
      (parseFloat(getComputedStyle(secondaryMenu).marginTop) || 0) +
      (toggleMenu.getBoundingClientRect().bottom - secondaryMenu.getBoundingClientRect().top);

    // Recomputes and reapplies the cap against however tall the primary
    // list actually is *right now* — expanding/collapsing a
    // goab-work-side-menu-group changes that height long after the initial
    // settle, and a cap frozen at page-load time either leaves an
    // unreachable scrollbar or wastes space the outer goa-scrollable budget
    // would happily have given it, since it never shrinks back down to let
    // the list use it.
    const recompute = () => {
      const belowPrimary = belowPrimaryHeight();
      // scrollableDiv.clientHeight is a render-time measurement, not the CSS
      // max-height itself — while content is short of it, .menu's min-height
      // floor keeps clientHeight sitting at its natural (smaller) size, and
      // mid-cascade (several groups toggling in quick succession) it can
      // even read a transient in-between value. The computed max-height is
      // the actual fixed ceiling regardless of current content, so it's the
      // one stable number to build the cap from.
      const budget = parseFloat(getComputedStyle(scrollableDiv).maxHeight);
      hostEl.style.setProperty('--primary-max-height', `${budget - belowPrimary}px`);

      // On some menus, a very last bit of async upgrade/paint still lands a
      // tick after the debounce settles, leaving goa-scrollable a couple of
      // px short of what it actually needs (a real outer scrollbar). Check
      // for that gap after applying and trim exactly what's left, so a menu
      // that already fits perfectly is never touched again.
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
      if (!menu.hasAttribute('open') && needsScroll) {
        hostEl.style.setProperty('--goa-work-side-menu-width-closed', 'calc(4.5rem + var(--goa-space-xs))');
      } else {
        hostEl.style.removeProperty('--goa-work-side-menu-width-closed');
      }
    };

    // The rail-width toggle needs to react to every open/close, for the
    // life of the menu, not just once.
    new MutationObserver(recompute).observe(menu, { attributes: true, attributeFilter: ['open'] });

    // Polls a measurement until it reads the same value twice in a row (or
    // gives up after ~1s), then runs a callback. Used below for two
    // different "has this actually finished changing yet" situations that
    // ResizeObserver can't answer: before the very first cap is applied,
    // primaryScroll has no cap yet, so its outer box grows with its content
    // and ResizeObserver on nav does track that; but once a cap is applied,
    // that same outer box stops growing no matter how much the (now
    // scrolling) content inside it changes on a later expand/collapse — so
    // nav stops resizing too, and nothing would ever tell us to recompute
    // again. Polling primaryScroll's own scrollHeight (its true content
    // extent, unaffected by its own cap) instead of waiting on a resize
    // that will never come is what catches that case.
    const pollUntilStable = (measure: () => number, onStable: () => void): void => {
      let last: number | null = null;
      let attempts = 0;
      const check = () => {
        const current = measure();
        if (current === last || attempts++ > 20) {
          onStable();
          return;
        }
        last = current;
        setTimeout(check, 50);
      };
      check();
    };

    // The nav's real height keeps growing for a few more ticks after view
    // init, as the async upgrade cascades through the rest of the list —
    // measuring too early undercounts "everything below the list" and caps
    // this wrapper too generously, which is exactly what lets an outer
    // scrollbar creep back in. Debounce on resize until nav stops changing
    // before recomputing, with a fixed-delay fallback for contexts where
    // ResizeObserver never fires (e.g. a backgrounded tab).
    let appliedOnce = false;
    const applyOnce = () => {
      if (appliedOnce) return;
      appliedOnce = true;
      resizeObserver.disconnect();
      clearTimeout(settleTimer);
      clearTimeout(fallbackTimer);
      recompute();
    };
    let settleTimer: ReturnType<typeof setTimeout>;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(applyOnce, 100);
    });
    resizeObserver.observe(nav);
    const fallbackTimer = setTimeout(applyOnce, 500);

    // Expanding/collapsing a goab-work-side-menu-group is a click deep
    // inside its own shadow DOM, but click is a composed, bubbling event —
    // it still reaches this light-DOM ancestor regardless of nesting, so
    // this catches every group's toggle without needing a listener on each
    // one individually.
    //
    // Polling primaryScroll.scrollHeight alone isn't enough: the moment
    // content grows past whatever cap is still in effect from before this
    // click, primaryScroll grows its own scrollbar immediately (its cap
    // hasn't been recomputed yet), and that scrollbar's width reflows
    // secondary/toggle by a few px for a handful of frames before settling —
    // the same drift documented above in belowPrimaryHeight, just now
    // happening *during* the poll instead of between two calls to it.
    // primaryScroll's content can finish growing and read stable several
    // polls before that reflow catches up, so recompute() was firing on a
    // belowPrimary reading that was still transiently inflated, applying a
    // cap a good ~15-20px smaller than necessary. Folding belowPrimary into
    // the same polled measurement makes "stable" mean the whole layout has
    // settled, not just the primary list.
    primaryScroll.addEventListener('click', () => {
      pollUntilStable(
        () => primaryScroll.scrollHeight * 1000 + belowPrimaryHeight(),
        recompute
      );
    });
  };

  const initial = findTargets();
  if (initial) {
    setUpScrollFix(
      initial.menu, initial.nav, initial.scrollableDiv,
      initial.secondaryMenu, initial.toggleMenu, initial.primaryScroll
    );
    return;
  }
  const readyObserver = new MutationObserver(() => {
    const targets = findTargets();
    if (targets) {
      readyObserver.disconnect();
      setUpScrollFix(
        targets.menu, targets.nav, targets.scrollableDiv,
        targets.secondaryMenu, targets.toggleMenu, targets.primaryScroll
      );
    }
  });
  readyObserver.observe(goabMenu, { childList: true, subtree: true });
}
