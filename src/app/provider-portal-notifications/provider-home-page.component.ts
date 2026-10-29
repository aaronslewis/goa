import { Component, computed, inject, signal } from '@angular/core';
import { GoabTabsOnChangeDetail } from '@abgov/ui-components-common';
import { GoabBadge, GoabButton, GoabContainer, GoabLink, GoabTab, GoabTabs } from '@abgov/angular-components';
import { NotificationFeedComponent } from '../notifications-hub/notification-feed/notification-feed.component';
import { NotificationsService } from '../notifications-hub/notifications.service';

// Alberta time is a fixed UTC-6 with no daylight saving. A fixed offset, rather
// than the 'America/Edmonton' zone, because browsers' bundled time zone data
// can lag behind the change and would still shift the cutoff in summer.
const ALBERTA_UTC_OFFSET_HOURS = -6;

const albertaHour = (): number => (new Date().getUTCHours() + ALBERTA_UTC_OFFSET_HOURS + 24) % 24;

// Phrases that suit any time of day mix in with the time-aware ones, so the
// greeting varies without ever being wrong.
const ANYTIME_GREETINGS = ['Hello', 'Welcome back'];

const GREETINGS = {
  morning: ['Good morning', 'Morning', ...ANYTIME_GREETINGS],
  afternoon: ['Good afternoon', 'Afternoon', ...ANYTIME_GREETINGS],
  evening: ['Good evening', 'Evening', ...ANYTIME_GREETINGS],
};

// Providers are in Alberta, so the day turns evening at 5pm Alberta time
// (23:00 UTC) whatever the browser's own time zone is.
function pickGreeting(): string {
  const h = albertaHour();
  const options = h < 12 ? GREETINGS.morning : h < 17 ? GREETINGS.afternoon : GREETINGS.evening;
  return options[Math.floor(Math.random() * options.length)];
}

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

  // Chosen once per visit: re-picking on every render would make the heading flicker.
  readonly greeting = pickGreeting();

  onTabChange(detail: GoabTabsOnChangeDetail): void {
    this.activeTab.set(detail.tab);
  }

  markAllComplete(): void {
    const tab = this.currentTab();
    if (tab) this.service.dismissMany(tab.items.map((n) => n.id));
  }
}
