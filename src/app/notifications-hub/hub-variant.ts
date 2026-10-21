import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// The hub is served twice (see app.routes.ts) to compare two ways of reaching
// notifications from the side menu. Each route sets this data; the shell
// provides HubVariant so its pages and panel link within their own version.
export interface HubRouteData {
  hubBase: string;
  // true: the menu's Notifications item opens the panel; false: it links to the page.
  notificationsPanel: boolean;
  // true: clicking a notification greys it as read; it can still be dismissed.
  markReadOnClick?: boolean;
  // true: the click-through demo, which offers a restart link on Home.
  demo?: boolean;
}

@Injectable()
export class HubVariant {
  private readonly data = inject(ActivatedRoute).snapshot.data as HubRouteData;

  readonly base = this.data.hubBase;
  readonly notificationsPanel = this.data.notificationsPanel;
  readonly markReadOnClick = this.data.markReadOnClick ?? false;
  readonly demo = this.data.demo ?? false;
  readonly homeUrl = `#${this.base}/home`;
  readonly notificationsUrl = `#${this.base}/notifications`;
}
