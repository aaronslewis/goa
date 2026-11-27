import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GoabLink } from '@abgov/angular-components';
import { NotificationsService } from '../notifications.service';

// Prototype-only control for reviewing the empty states. It keeps `?empty=1`
// in the address bar while the preview is on, so the view can be shared.
@Component({
  selector: 'hub-empty-preview-toggle',
  standalone: true,
  imports: [GoabLink],
  template: `
    <p class="toggle">
      <goab-link [leadingIcon]="on() ? 'eye' : 'eye-off'">
        <a href="#" (click)="toggle($event)">{{ on() ? 'Show sample notifications' : 'Preview empty state' }}</a>
      </goab-link>
    </p>
  `,
  styles: `
    .toggle {
      margin: var(--goa-space-xl) 0 0;
      font: var(--goa-typography-body-s);
    }
  `,
})
export class EmptyPreviewToggleComponent {
  private readonly service = inject(NotificationsService);
  private readonly router = inject(Router);
  readonly on = this.service.previewEmpty;

  toggle(event: Event): void {
    event.preventDefault();
    const next = !this.on();
    this.service.previewEmpty.set(next);
    this.router.navigate([], { queryParams: { empty: next ? 1 : null }, queryParamsHandling: 'merge' });
  }
}
