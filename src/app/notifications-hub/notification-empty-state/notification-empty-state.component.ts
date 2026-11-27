import { Component, input } from '@angular/core';

// The DS 2.0 Figma "Empty state" component (❖ Component library). The DS has no
// coded equivalent yet, so this rebuilds it from that component's spacing and
// type styles. The illustration is its folder, exported from Figma.
@Component({
  selector: 'hub-notification-empty-state',
  standalone: true,
  template: `
    <div class="empty-state">
      <img class="illustration" src="illustrations/empty-folder.svg" alt="" width="100" height="78" />
      <div class="text">
        @switch (level()) {
          @case (2) {
            <h2 class="heading">{{ heading() }}</h2>
          }
          @default {
            <h3 class="heading">{{ heading() }}</h3>
          }
        }
        @if (message()) {
          <p class="message">{{ message() }}</p>
        }
      </div>
      <ng-content />
    </div>
  `,
  styleUrl: './notification-empty-state.component.scss',
})
export class NotificationEmptyStateComponent {
  readonly heading = input.required<string>();
  readonly message = input('');
  // Keeps the heading in the page's outline: Home nests it under an h2, the
  // Notifications page under its h1.
  readonly level = input<2 | 3>(3);
}
