import { Component, computed, inject, signal } from '@angular/core';
import { GoabTabsOnChangeDetail } from '@abgov/ui-components-common';
import {
  GoabBadge,
  GoabButton,
  GoabContainer,
  GoabLink,
  GoabTab,
  GoabTabs,
  GoabTemporaryNotificationCtrl,
} from '@abgov/angular-components';
import { NotificationFeedComponent } from '../notification-feed/notification-feed.component';
import { NotificationsService } from '../notifications.service';
import { HubVariant } from '../hub-variant';

// v3 home: the notification centre is the whole page, with new rows marked
// by their severity tint (Figma "In-App Notifications", 1933:79701).
@Component({
  selector: 'hub-home-v3',
  standalone: true,
  imports: [
    GoabBadge,
    GoabButton,
    GoabContainer,
    GoabLink,
    GoabTab,
    GoabTabs,
    GoabTemporaryNotificationCtrl,
    NotificationFeedComponent,
  ],
  templateUrl: './hub-home-v3.component.html',
  styleUrls: ['../home/hub-home.component.scss', './hub-home-v3.component.scss'],
})
export class HubHomeV3Component {
  readonly service = inject(NotificationsService);

  readonly firstName = 'Edna';
  readonly hub = inject(HubVariant);
  readonly notificationsUrl = this.hub.notificationsUrl;

  // goab-tabs reports a 1-based index; 1 is "All".
  readonly activeTab = signal(1);

  // Recomputed on each render, so it tracks the user's local clock.
  get greeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }

  readonly tabs = this.service.homeTabs;

  // Completed items stay on the Notifications page and can be restored there,
  // so completing every item in a tab, All included, is safe to offer.
  readonly currentTab = computed(() => this.tabs()[this.activeTab() - 1] ?? null);

  onTabChange(detail: GoabTabsOnChangeDetail): void {
    this.activeTab.set(detail.tab);
  }

  // The demo's data lives in memory, so a reload starts it over.
  restartDemo(event: Event): void {
    event.preventDefault();
    location.reload();
  }

  markAllComplete(): void {
    const tab = this.currentTab();
    if (tab) this.service.dismissMany(tab.items.map((n) => n.id));
  }
}
