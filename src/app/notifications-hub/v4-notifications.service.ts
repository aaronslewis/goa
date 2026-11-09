import { Injectable } from '@angular/core';
import { HubNotification, buildSeedNotifications, buildTriggerExamples } from './notifications.data';
import { NotificationsService } from './notifications.service';

// v4's data: the shared seeded history plus examples of the CCPM-3290 triggers.
// Provided on the v4 route only, so the other hub versions keep the root service.
@Injectable()
export class HubV4NotificationsService extends NotificationsService {
  protected override seed(): HubNotification[] {
    return [...buildTriggerExamples(), ...buildSeedNotifications()].sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }
}
