import { Injectable } from '@angular/core';
import { TemporaryNotification } from '@abgov/ui-components-common';
import { HubNotification, buildDemoNotifications, demoArrival } from './notifications.data';
import { NotificationsService } from './notifications.service';

const ARRIVAL_DELAY_MS = 5_000;

// The click-through demo's data: three notifications on landing, then a new
// critical one a few seconds later. Provided on the demo route only, so the
// other hub versions keep the shared root service. A page reload restarts it.
@Injectable()
export class DemoNotificationsService extends NotificationsService {
  constructor() {
    super();
    setTimeout(() => {
      const n = demoArrival();
      this.receive(n);
      TemporaryNotification.show(`New critical notification: ${n.title}`, { duration: 'long' });
    }, ARRIVAL_DELAY_MS);
  }

  protected override seed(): HubNotification[] {
    return buildDemoNotifications();
  }
}
