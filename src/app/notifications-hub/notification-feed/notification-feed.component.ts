import { Component, DestroyRef, computed, inject, input, output, signal } from '@angular/core';
import { GoabIconType } from '@abgov/ui-components-common';
import { GoabBadge, GoabButton, GoabIcon, GoabIconButton } from '@abgov/angular-components';
import { HubNotification, SEVERITIES, Severity } from '../notifications.data';
import { groupByDay, relativeTime } from '../notifications.service';

const SEVERITY_ICON: Record<Severity, GoabIconType> = {
  urgent: 'warning',
  important: 'alert-circle',
  information: 'information-circle',
};

// Row anatomy from the Figma "In-App Notifications" pattern (1933:79701): type
// icon, title and message, then time and an action button. New rows keep their
// severity tint until the user acts on them. Used by the v3 hub only; the other versions keep
// NotificationListComponent.
@Component({
  selector: 'hub-notification-feed',
  standalone: true,
  imports: [GoabBadge, GoabButton, GoabIcon, GoabIconButton],
  templateUrl: './notification-feed.component.html',
  styleUrl: './notification-feed.component.scss',
})
export class NotificationFeedComponent {
  readonly items = input.required<HubNotification[]>();
  readonly emptyMessage = input('No notifications.');

  readonly open = output<string>();
  readonly dismiss = output<string>();

  readonly groups = computed(() => groupByDay(this.items()));

  // Every row gets its badge, informational included, unlike NotificationListComponent.
  readonly severityMeta = Object.fromEntries(SEVERITIES.map((s) => [s.value, s]));

  // A single clock for every relative label (see NotificationListComponent).
  private readonly now = signal(new Date());

  constructor() {
    const timer = setInterval(() => this.now.set(new Date()), 60_000);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }

  icon(n: HubNotification): GoabIconType {
    if (n.createdByUser || !n.severity) return 'alarm';
    return SEVERITY_ICON[n.severity];
  }

  timeLabel(n: HubNotification): string {
    return relativeTime(n.createdAt, this.now());
  }
}
