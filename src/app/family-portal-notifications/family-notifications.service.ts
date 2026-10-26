import { Injectable } from '@angular/core';
import { TemporaryNotification } from '@abgov/ui-components-common';
import { HubNotification } from '../notifications-hub/notifications.data';
import { NotificationsService } from '../notifications-hub/notifications.service';
import { buildFamilyNotifications, familyArrival } from './family-notifications.data';

const ARRIVAL_DELAY_MS = 5_000;

// Provided on this prototype's route only, in place of the hub's root service,
// so the other hub versions keep their own staff data. A reload restarts it.
@Injectable()
export class FamilyNotificationsService extends NotificationsService {
  constructor() {
    super();
    setTimeout(() => {
      const n = familyArrival();
      this.receive(n);
      TemporaryNotification.show(`New notification: ${n.title}`, { duration: 'long' });
    }, ARRIVAL_DELAY_MS);
  }

  protected override seed(): HubNotification[] {
    return buildFamilyNotifications();
  }
}
