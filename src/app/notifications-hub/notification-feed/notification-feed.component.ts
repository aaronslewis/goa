import { Component, DestroyRef, computed, inject, input, output, signal } from '@angular/core';
import { GoabIconType } from '@abgov/ui-components-common';
import { GoabButton, GoabIcon, GoabIconButton } from '@abgov/angular-components';
import { HubNotification, SEVERITIES, Severity } from '../notifications.data';
import { groupByDay, relativeTime } from '../notifications.service';

const SEVERITY_ICON: Record<Severity, GoabIconType> = {
  urgent: 'warning',
  important: 'alert-circle',
  information: 'information-circle',
};

// Card anatomy from the Figma notification item: a tinted strip with the type
// icon, then status, title and message, with the time and a text action on the
// right. Every card carries its severity colours. Used by the v3 hub only; the other versions keep
// NotificationListComponent.
@Component({
  selector: 'hub-notification-feed',
  standalone: true,
  imports: [GoabButton, GoabIcon, GoabIconButton],
  templateUrl: './notification-feed.component.html',
  styleUrl: './notification-feed.component.scss',
})
export class NotificationFeedComponent {
  readonly items = input.required<HubNotification[]>();
  readonly emptyMessage = input('No notifications.');
  // On the Notifications page completed items stay visible and can be restored.
  readonly allowRestore = input(false);

  readonly open = output<string>();
  readonly dismiss = output<string>();
  readonly restore = output<string>();

  readonly groups = computed(() => groupByDay(this.items()));

  private readonly severityMeta = Object.fromEntries(SEVERITIES.map((s) => [s.value, s]));

  // A single clock for every relative label (see NotificationListComponent).
  private readonly now = signal(new Date());

  constructor() {
    const timer = setInterval(() => this.now.set(new Date()), 60_000);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }

  kind(n: HubNotification): Severity | 'reminder' {
    return n.createdByUser || !n.severity ? 'reminder' : n.severity;
  }

  statusLabel(n: HubNotification): string {
    return n.createdByUser || !n.severity ? 'My reminder' : this.severityMeta[n.severity].label;
  }

  icon(n: HubNotification): GoabIconType {
    if (n.createdByUser || !n.severity) return 'alarm';
    return SEVERITY_ICON[n.severity];
  }

  timeLabel(n: HubNotification): string {
    return relativeTime(n.createdAt, this.now());
  }
}
