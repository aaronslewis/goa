import { Component } from '@angular/core';

// Home for the version whose notifications live only in the side-menu panel,
// so the page itself carries no notifications.
@Component({
  selector: 'hub-home-plain',
  standalone: true,
  templateUrl: './hub-home-plain.component.html',
  styleUrl: '../home/hub-home.component.scss',
})
export class HubHomePlainComponent {
  readonly firstName = 'Edna';

  // Recomputed on each render, so it tracks the user's local clock.
  get greeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }
}
