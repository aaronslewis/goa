import { Component, computed, inject, signal } from '@angular/core';
import { GoabBadge, GoabButton, GoabContainer, GoabLink, GoabTab, GoabTabs } from '@abgov/angular-components';
import { NotificationListComponent } from '../notification-list/notification-list.component';
import { AddNotificationDrawerComponent } from '../add-notification-drawer/add-notification-drawer.component';
import { NotificationsService } from '../notifications.service';
import { SEVERITIES, Severity } from '../notifications.data';
import { HUB_NOTIFICATIONS_URL } from '../hub-shell.component';

type TabKey = 'all' | Severity | 'mine';

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
    AddNotificationDrawerComponent,
  ],
  templateUrl: './hub-home.component.html',
  styleUrl: './hub-home.component.scss',
})
export class HubHomeComponent {
  readonly service = inject(NotificationsService);

  readonly firstName = 'Edna';
  readonly notificationsUrl = HUB_NOTIFICATIONS_URL;
  readonly drawerOpen = signal(false);

  // Recomputed on each render per the Figma note, so it tracks the user's local clock.
  get greeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }

  readonly tabs = computed(() => {
    const items = this.service.homeItems();
    const tabs: { key: TabKey; label: string; badge?: 'emergency' | 'important' | 'information' | 'lilac'; items: typeof items }[] = [
      { key: 'all', label: 'All', items },
      ...SEVERITIES.map((s) => ({
        key: s.value as TabKey,
        label: s.label,
        badge: s.badge,
        items: items.filter((n) => n.severity === s.value),
      })),
      { key: 'mine', label: 'My reminders', badge: 'lilac', items: items.filter((n) => n.createdByUser) },
    ];
    return tabs;
  });

  dismissAll(): void {
    this.service.dismissMany(this.service.homeItems().map((n) => n.id));
  }
}
