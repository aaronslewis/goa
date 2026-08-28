/**
 * goa-scroll-panel (the scroll region goa-work-side-menu's primary list
 * renders inside as of @abgov/web-components@2.4.0 — see CLAUDE.md) ships no
 * ::-webkit-scrollbar CSS of its own; it just sets overflow-y:auto and lets
 * the OS/browser draw its native scrollbar. On Windows Chrome/Edge that
 * native scrollbar includes up/down arrow buttons, which design wants
 * dropped in favour of a plain thumb-only slider.
 *
 * There's no ::part() exposed on goa-scroll-panel's internal scroll
 * container to reach it from an outer stylesheet, so — same approach as
 * provider-portal-menu's line-height patch — this injects a <style> directly
 * into goa-scroll-panel's own shadow root once it upgrades.
 *
 * Call once from the host component's ngAfterViewInit, passing its own host
 * element (the one with a nested goab-work-side-menu).
 */
export function hideWorkSideMenuScrollbarButtons(hostEl: HTMLElement): void {
  const patch = (): boolean => {
    const shadow = hostEl
      .querySelector('goab-work-side-menu')
      ?.querySelector('goa-work-side-menu')
      ?.shadowRoot?.querySelector('goa-scroll-panel')
      ?.shadowRoot;
    if (!shadow) return false;
    if (shadow.querySelector('style[data-hide-scrollbar-buttons]')) return true;
    const style = document.createElement('style');
    style.setAttribute('data-hide-scrollbar-buttons', '');
    style.textContent = `
      .scroll-panel-scroll-container::-webkit-scrollbar-button {
        display: none;
        width: 0;
        height: 0;
      }
    `;
    shadow.appendChild(style);
    return true;
  };

  // goab-work-side-menu (and goa-scroll-panel nested inside its shadow DOM)
  // gate their own render behind an internal "isReady" flag that flips a
  // tick after mount, so the element may not exist yet the instant this
  // runs — wait for it before giving up.
  if (!patch()) {
    const observer = new MutationObserver(() => {
      if (patch()) observer.disconnect();
    });
    observer.observe(hostEl, { childList: true, subtree: true });
  }
}
