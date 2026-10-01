import { Component, DestroyRef, computed, inject, input, output, signal } from '@angular/core';
import { GoabBadge, GoabIconButton, GoabLink } from '@abgov/angular-components';
import { HubNotification, SEVERITIES } from '../notifications.data';
import { groupByDay, relativeTime } from '../notifications.service';

@Component({
  selector: 'hub-notification-list',
  standalone: true,
  imports: [GoabBadge, GoabIconButton, GoabLink],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.scss',
})
export class NotificationListComponent {
  readonly items = input.required<HubNotification[]>();
  readonly emptyMessage = input('No notifications.');
  // On the Notifications page dismissed items stay visible and can be restored.
  readonly allowRestore = input(false);

  readonly dismiss = output<string>();
  readonly restore = output<string>();

  readonly groups = computed(() => groupByDay(this.items()));

  readonly severityMeta = Object.fromEntries(SEVERITIES.map((s) => [s.value, s]));

  // Row badges (severity, "My reminder") on every row, all in the muted
  // subtle style. Pass false to hide them on active rows.
  readonly showBadges = input(true);

  // Program names are marked bold in the message data; flip to true to render them bold.
  readonly boldProgramNames = false;

  // Relative time ("5 minutes ago") on the right of each row; flip to false to hide it.
  readonly showTimestamp = true;

  // A single clock for every relative label: reading Date.now() during render
  // lets "5 minutes ago" change between Angular's check passes (NG0100).
  private readonly now = signal(new Date());

  constructor() {
    const timer = setInterval(() => this.now.set(new Date()), 60_000);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }

  timeLabel(n: HubNotification): string {
    return relativeTime(n.createdAt, this.now());
  }
}
