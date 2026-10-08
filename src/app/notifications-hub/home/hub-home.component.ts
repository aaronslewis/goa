import { Component, computed, inject, signal } from '@angular/core';
import { GoabTabsOnChangeDetail } from '@abgov/ui-components-common';
import { GoabBadge, GoabButton, GoabContainer, GoabLink, GoabTab, GoabTabs } from '@abgov/angular-components';
import { NotificationListComponent } from '../notification-list/notification-list.component';
import { NotificationsService } from '../notifications.service';
import { HubVariant } from '../hub-variant';

@Component({
  selector: 'hub-home',
  standalone: true,
  imports: [
    GoabBadge,
    GoabButton,
    GoabContainer,
    GoabLink,
    GoabTab,
    GoabTabs,
    NotificationListComponent,
  ],
  templateUrl: './hub-home.component.html',
  styleUrl: './hub-home.component.scss',
})
export class HubHomeComponent {
  readonly service = inject(NotificationsService);

  readonly firstName = 'Edna';
  readonly notificationsUrl = inject(HubVariant).notificationsUrl;

  // goab-tabs reports a 1-based index; 1 is "All".
  readonly activeTab = signal(1);

  // Recomputed on each render per the Figma note, so it tracks the user's local clock.
  get greeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }

  readonly tabs = this.service.homeTabs;

  // "Mark all as done" applies to one severity at a time, never to All.
  readonly activeSeverityTab = computed(() => {
    const tab = this.tabs()[this.activeTab() - 1];
    return tab && tab.key !== 'all' ? tab : null;
  });

  onTabChange(detail: GoabTabsOnChangeDetail): void {
    this.activeTab.set(detail.tab);
  }

  markAllDone(): void {
    const tab = this.activeSeverityTab();
    if (tab) this.service.dismissMany(tab.items.map((n) => n.id));
  }
}
