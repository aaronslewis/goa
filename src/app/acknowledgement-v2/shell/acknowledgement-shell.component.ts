import { Component, DestroyRef, ElementRef, OnInit, ViewChild, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import {
  GoabAppHeader,
  GoabMenuAction,
  GoabMenuButton,
  GoabMicrositeHeader,
} from '@abgov/angular-components';
import { ACCOUNT } from '../shared/acknowledgement-data';

@Component({
  selector: 'app-acknowledgement-v2-shell',
  host: { class: 'goa-ds-v2' },
  standalone: true,
  imports: [RouterOutlet, GoabAppHeader, GoabMenuAction, GoabMenuButton, GoabMicrositeHeader],
  templateUrl: './acknowledgement-shell.component.html',
  styleUrl: './acknowledgement-shell.component.scss',
})
export class AcknowledgementV2ShellComponent implements OnInit {
  @ViewChild('main', { static: true }) main!: ElementRef<HTMLElement>;

  readonly account = ACCOUNT;

  // Below the header's mobile breakpoint the full name collides with the service name,
  // so the account menu drops to icon-only.
  private readonly mobileQuery = window.matchMedia('(max-width: 623px)');
  readonly compactHeader = signal(this.mobileQuery.matches);

  constructor(
    private router: Router,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    const onMobileChange = (e: MediaQueryListEvent) => this.compactHeader.set(e.matches);
    this.mobileQuery.addEventListener('change', onMobileChange);
    this.destroyRef.onDestroy(() => this.mobileQuery.removeEventListener('change', onMobileChange));

    // Each page swaps the whole body, so start at the top and move focus into the new
    // content rather than leaving it on a link or button that no longer exists.
    const sub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0 });
        this.main.nativeElement.focus({ preventScroll: true });
      });
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }
}
