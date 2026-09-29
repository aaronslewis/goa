import { Component, DestroyRef, computed, inject, input, output, signal } from '@angular/core';
import { GoabBadge, GoabIconButton, GoabLink } from '@abgov/angular-components';
import { HubNotification, PROGRAM_BY_ID, SEVERITIES } from '../notifications.data';
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

  // Row badges (severity, "Created by you") are hidden on active
  // rows for now; row colour still carries severity. Dismissed rows on the
  // Notifications page (allowRestore) always show them, in the lighter subtle
  // style, since their grey row loses the severity colour. Flip to true to show
  // them on every row.
  readonly showBadges = false;

  // Program names are marked bold in the message data; flip to true to render them bold.
  readonly boldProgramNames = false;

  // Trialling rows without the relative time ("5 minutes ago"); flip to true to restore.
  readonly showTimestamp = false;

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

  programName(id: string): string {
    return PROGRAM_BY_ID.get(id)?.name ?? '';
  }
}
