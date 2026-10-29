import { Injectable } from '@angular/core';
import { TemporaryNotification } from '@abgov/ui-components-common';
import { HubNotification, SEVERITIES } from '../notifications-hub/notifications.data';
import { NotificationsService } from '../notifications-hub/notifications.service';
import { buildProviderNotifications, providerArrival } from './provider-notifications.data';

const ARRIVAL_DELAY_MS = 5_000;

// Provided on this prototype's route only, in place of the hub's root service,
// so the other hub versions keep their own staff data. A reload restarts it.
@Injectable()
export class ProviderNotificationsService extends NotificationsService {
  constructor() {
    super();
    setTimeout(() => {
      const n = providerArrival();
      this.receive(n);
      // The toast has no severity colour or icon, so the wording carries it.
      const severity = SEVERITIES.find((s) => s.value === n.severity)?.label.toLowerCase();
      TemporaryNotification.show(`New ${severity ? `${severity} ` : ''}notification: ${n.title}`, {
        duration: 'long',
      });
    }, ARRIVAL_DELAY_MS);
  }

  protected override seed(): HubNotification[] {
    return buildProviderNotifications();
  }
}
