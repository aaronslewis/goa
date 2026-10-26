import { Component, inject } from '@angular/core';
import { GoabLink, GoabTemporaryNotificationCtrl } from '@abgov/angular-components';
import { HubVariant } from '../hub-variant';

// Home for the versions whose notifications live only in the side-menu panel,
// so the page itself carries no notifications.
@Component({
  selector: 'hub-home-plain',
  standalone: true,
  imports: [GoabLink, GoabTemporaryNotificationCtrl],
  templateUrl: './hub-home-plain.component.html',
  styleUrls: ['../home/hub-home.component.scss', './hub-home-plain.component.scss'],
})
export class HubHomePlainComponent {
  readonly hub = inject(HubVariant);
  readonly firstName = 'Edna';

  // Recomputed on each render, so it tracks the user's local clock.
  get greeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }

  // The demo's data lives in memory, so a reload starts it over.
  restartDemo(event: Event): void {
    event.preventDefault();
    location.reload();
  }
}
