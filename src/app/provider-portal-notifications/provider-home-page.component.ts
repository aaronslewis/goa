import { Component, computed, inject, signal } from '@angular/core';
import { GoabTabsOnChangeDetail } from '@abgov/ui-components-common';
import { GoabBadge, GoabButton, GoabContainer, GoabLink, GoabTab, GoabTabs } from '@abgov/angular-components';
import { NotificationFeedComponent } from '../notifications-hub/notification-feed/notification-feed.component';
import { NotificationsService } from '../notifications-hub/notifications.service';

// Home for the provider portal: the notification centre's Recent notifications
// (severity tabs over the card feed), without the hub's filters. Reuses the
// hub Home's styles so the two stay in step.
@Component({
  selector: 'provider-home-page',
  standalone: true,
  imports: [GoabBadge, GoabButton, GoabContainer, GoabLink, GoabTab, GoabTabs, NotificationFeedComponent],
  templateUrl: './provider-home-page.component.html',
  styleUrls: [
    '../notifications-hub/home/hub-home.component.scss',
    '../notifications-hub/home-v3/hub-home-v3.component.scss',
  ],
})
export class ProviderHomePageComponent {
  readonly service = inject(NotificationsService);

  readonly firstName = 'Sally';
  readonly notificationsUrl = '#/provider-portal-notifications/notifications';

  // goab-tabs reports a 1-based index; 1 is "All".
  readonly activeTab = signal(1);

  readonly tabs = this.service.homeTabs;

  // Completed items stay on the Notifications page and can be restored there,
  // so completing every item in a tab, All included, is safe to offer.
  readonly currentTab = computed(() => this.tabs()[this.activeTab() - 1] ?? null);

  // Recomputed on each render, so it tracks the user's local clock.
  get greeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }

  onTabChange(detail: GoabTabsOnChangeDetail): void {
    this.activeTab.set(detail.tab);
  }

  markAllComplete(): void {
    const tab = this.currentTab();
    if (tab) this.service.dismissMany(tab.items.map((n) => n.id));
  }
}
