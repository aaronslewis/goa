import { Injectable, signal } from '@angular/core';

export type ComposerState = 'closed' | 'open' | 'minimized';

// State of the Add notification drawer, shared by the side menu, the Ctrl+Q
// shortcut and the page buttons. Minimizing hides the drawer without touching
// the draft, so the user can check something on the page and pick up again.
@Injectable()
export class NotificationComposer {
  readonly state = signal<ComposerState>('closed');

  open(): void {
    this.state.set('open');
  }

  minimize(): void {
    if (this.state() === 'open') this.state.set('minimized');
  }

  close(): void {
    this.state.set('closed');
  }
}
