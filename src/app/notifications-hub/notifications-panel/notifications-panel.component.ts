import { Component, ElementRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GoabBadge, GoabIconButton, GoabLink, GoabTab, GoabTabs } from '@abgov/angular-components';
import { NotificationListComponent } from '../notification-list/notification-list.component';
import { NotificationsService } from '../notifications.service';
import { HubVariant } from '../hub-variant';

// Opened from the side menu's Notifications item, like the DS workspace demo.
// Built from our own rows rather than the DS Notification Panel, which always
// shows a "Mark all as read" button and only takes Notification Item rows.
@Component({
  selector: 'hub-notifications-panel',
  standalone: true,
  imports: [GoabBadge, GoabIconButton, GoabLink, GoabTab, GoabTabs, NotificationListComponent],
  templateUrl: './notifications-panel.component.html',
  styleUrl: './notifications-panel.component.scss',
})
export class NotificationsPanelComponent {
  readonly service = inject(NotificationsService);
  private readonly router = inject(Router);
  private readonly el = inject(ElementRef<HTMLElement>);
  readonly hub = inject(HubVariant);

  viewAll(event: Event): void {
    event.preventDefault();
    this.close();
    this.router.navigateByUrl(`${this.hub.base}/notifications`);
  }

  // The panel sits in goab-work-side-menu-item's popoverContent slot. The
  // item exposes no close API, but its goa-popover closes when `open` is set
  // to false.
  close(): void {
    const item = (this.el.nativeElement as HTMLElement).closest('goa-work-side-menu-item');
    const popover = item?.shadowRoot?.querySelector('goa-popover') as (HTMLElement & { open?: boolean }) | null;
    if (popover) popover.open = false;
  }
}
