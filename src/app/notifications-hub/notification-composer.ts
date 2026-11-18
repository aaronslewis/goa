import { Injectable, signal } from '@angular/core';

export type ComposerState = 'closed' | 'open' | 'minimized';

// State of the Add notification drawer, shared by the Ctrl+Q
// shortcut and the page buttons. Minimizing hides the drawer without touching
// the draft, so the user can check something on the page and pick up again.
@Injectable()
export class NotificationComposer {
  readonly state = signal<ComposerState>('closed');

  // Whatever had focus when the drawer opened (normally Add notification), so
  // closing or minimizing puts keyboard users back where they were (WCAG 2.4.3).
  private returnFocusTo: HTMLElement | null = null;

  open(): void {
    if (this.state() !== 'open') this.returnFocusTo = deepActiveElement();
    this.state.set('open');
  }

  minimize(): void {
    if (this.state() !== 'open') return;
    this.state.set('minimized');
    this.restoreFocus();
  }

  close(): void {
    const wasOpen = this.state() === 'open';
    this.state.set('closed');
    if (wasOpen) this.restoreFocus();
  }

  // A tick later, once the drawer is inert again; if the opener has gone
  // (e.g. the page changed), focus is left to the browser.
  private restoreFocus(): void {
    const target = this.returnFocusTo;
    this.returnFocusTo = null;
    setTimeout(() => {
      if (target?.isConnected) target.focus();
    });
  }
}

// The focused element itself, inside any shadow roots: the DS buttons focus a
// <button> in their own shadow DOM, which document.activeElement can't name.
function deepActiveElement(): HTMLElement | null {
  let el = document.activeElement;
  while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
  return el instanceof HTMLElement && el !== document.body ? el : null;
}
