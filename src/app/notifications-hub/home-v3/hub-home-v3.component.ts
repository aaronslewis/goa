import { Component, ElementRef, Injector, afterNextRender, computed, inject, signal } from '@angular/core';
import { GoabTabsOnChangeDetail } from '@abgov/ui-components-common';
import {
  GoabBadge,
  GoabButton,
  GoabContainer,
  GoabLink,
  GoabTab,
  GoabTabs,
  GoabTemporaryNotificationCtrl,
} from '@abgov/angular-components';
import { Router } from '@angular/router';
import { fixInitialTabType, focusSelectedTab } from '../../shared/goa-tabs-keyboard';
import { NotificationFeedComponent } from '../notification-feed/notification-feed.component';
import { NotificationEmptyStateComponent } from '../notification-empty-state/notification-empty-state.component';
import { EmptyPreviewToggleComponent } from '../empty-preview-toggle/empty-preview-toggle.component';
import { NotificationComposer } from '../notification-composer';
import { NotificationsService } from '../notifications.service';
import { HubVariant } from '../hub-variant';

// v3 home: the notification centre is the whole page, with new rows marked
// by their severity tint (Figma "In-App Notifications", 1933:79701).
@Component({
  selector: 'hub-home-v3',
  standalone: true,
  imports: [
    GoabBadge,
    GoabButton,
    GoabContainer,
    GoabLink,
    GoabTab,
    GoabTabs,
    GoabTemporaryNotificationCtrl,
    NotificationFeedComponent,
    NotificationEmptyStateComponent,
    EmptyPreviewToggleComponent,
  ],
  templateUrl: './hub-home-v3.component.html',
  styleUrls: ['../home/hub-home.component.scss', './hub-home-v3.component.scss'],
})
export class HubHomeV3Component {
  readonly service = inject(NotificationsService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly injector = inject(Injector);

  constructor() {
    fixInitialTabType(this.host.nativeElement);
  }
  readonly composer = inject(NotificationComposer);
  private readonly router = inject(Router);

  readonly firstName = 'Edna';
  readonly hub = inject(HubVariant);
  readonly notificationsUrl = this.hub.notificationsUrl;

  // goab-tabs reports a 1-based index; 1 is "All".
  readonly activeTab = signal(1);

  // Recomputed on each render, so it tracks the user's local clock.
  get greeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  }

  readonly tabs = this.service.homeTabs;

  // Completed items stay on the Notifications page and can be restored there,
  // so completing every item in a tab, All included, is safe to offer.
  readonly currentTab = computed(() => this.tabs()[this.activeTab() - 1] ?? null);

  onTabChange(detail: GoabTabsOnChangeDetail): void {
    this.activeTab.set(detail.tab);
  }

  // The demo's data lives in memory, so a reload starts it over.
  restartDemo(event: Event): void {
    event.preventDefault();
    location.reload();
  }

  // notificationsUrl is a "#/…" href for links; the router takes the path.
  showAll(): void {
    this.router.navigateByUrl(this.notificationsUrl.replace(/^#/, ''));
  }

  // The dismissed card leaves the list and takes the focused ✕ with it, so
  // focus moves on (WCAG 2.4.3): to the card that takes its place, else the one
  // before it, else, with the tab now empty, to the section heading.
  onDismiss(id: string): void {
    const row = closestAcrossShadow(deepActiveElement(), 'li.row');
    const feed = row?.closest('hub-notification-feed');
    const index = feed ? [...feed.querySelectorAll('li.row')].indexOf(row!) : -1;
    this.service.dismiss(id);
    if (!feed || index < 0) return;
    afterNextRender(
      () => {
        const rows = feed.querySelectorAll<HTMLElement>('li.row');
        const target = rows[index] ?? rows[index - 1];
        if (target) focusCardAction(target);
        else this.host.nativeElement.querySelector<HTMLElement>('.section-title')?.focus();
      },
      { injector: this.injector },
    );
  }

  markAllComplete(): void {
    const tab = this.currentTab();
    if (!tab) return;
    this.service.markAllComplete(tab);
    // The emptied tab hides this button, which would drop focus to the page.
    afterNextRender(() => focusSelectedTab(this.host.nativeElement), { injector: this.injector });
  }
}

function deepActiveElement(): Element | null {
  let el = document.activeElement;
  while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
  return el;
}

// Element.closest that climbs out of shadow roots: the focused ✕ is a <button>
// inside goa-icon-button's shadow DOM.
function closestAcrossShadow(el: Element | null, selector: string): HTMLElement | null {
  while (el) {
    const hit = el.closest<HTMLElement>(selector);
    if (hit) return hit;
    el = (el.getRootNode() as ShadowRoot).host ?? null;
  }
  return null;
}

// A card's first stop: its action (a DS button in v4, an inline link in the
// other versions), or its ✕ when it has no action. The DS buttons keep their
// focusable <button> in their shadow DOM.
function focusCardAction(row: HTMLElement): void {
  const link = row.querySelector<HTMLElement>('.row__message a');
  if (link) return link.focus();
  const ds = row.querySelector('.row__cta goa-button, .row__action goa-button, .row__dismiss goa-icon-button');
  ds?.shadowRoot?.querySelector<HTMLElement>('button')?.focus();
}
