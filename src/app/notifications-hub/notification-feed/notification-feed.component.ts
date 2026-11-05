import { NgTemplateOutlet } from '@angular/common';
import { Component, DestroyRef, computed, inject, input, output, signal } from '@angular/core';
import { GoabIconType } from '@abgov/ui-components-common';
import { GoabButton, GoabIcon, GoabIconButton, GoabLink } from '@abgov/angular-components';
import { HubNotification, MessagePart, SEVERITIES, Severity } from '../notifications.data';
import { groupByDay, relativeTime } from '../notifications.service';
import { HubVariant } from '../hub-variant';

type Segment = MessagePart & { link?: boolean };

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
  host: {
    '[class.stacked]': 'stacked()',
    '[class.hidden-status]': 'hiddenStatus()',
    '[class.cta-right]': 'ctaRight',
  },
  standalone: true,
  imports: [GoabButton, GoabIcon, GoabIconButton, GoabLink, NgTemplateOutlet],
  templateUrl: './notification-feed.component.html',
  styleUrl: './notification-feed.component.scss',
})
export class NotificationFeedComponent {
  readonly items = input.required<HubNotification[]>();
  readonly emptyMessage = input('No notifications.');
  // On the Notifications page completed items stay visible and can be restored.
  readonly allowRestore = input(false);
  // Narrow containers such as the side-menu panel: always use the stacked
  // layout, whatever the viewport width.
  readonly stacked = input(false);
  // Slimmer cards: no visible status label, since the card's colour and strip
  // icon already show it; screen readers still hear it before the title.
  readonly hiddenStatus = input(false);

  // Set by the hub route (see HubRouteData.feedStyle). The portals have no
  // HubVariant and keep the default card.
  private readonly variant = inject(HubVariant, { optional: true });
  readonly ctaRight = this.variant?.feedStyle === 'cta-right';

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

  // Splits the message so the notification's linkText becomes the link to the
  // record. The link is a phrase in the sentence, never a separate button.
  segments(n: HubNotification): Segment[] {
    if (!n.linkText || this.ctaRight) return n.message;
    const out: Segment[] = [];
    let linked = false;
    for (const part of n.message) {
      const at = linked ? -1 : part.text.indexOf(n.linkText);
      if (at < 0) {
        out.push(part);
        continue;
      }
      linked = true;
      const end = at + n.linkText.length;
      if (at > 0) out.push({ ...part, text: part.text.slice(0, at) });
      out.push({ ...part, text: n.linkText, link: true });
      if (end < part.text.length) out.push({ ...part, text: part.text.slice(end) });
    }
    return out;
  }

  hasInlineLink(n: HubNotification): boolean {
    return !!n.linkText && this.segments(n).some((p) => p.link);
  }

  timeLabel(n: HubNotification): string {
    return relativeTime(n.createdAt, this.now());
  }
}
