import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'workspace-shell',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './workspace-shell.component.html',
  styleUrl: './workspace-shell.component.scss',
})
export class WorkspaceShellComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private el = inject(ElementRef);
  private sub!: Subscription;
  isMenuOpen = true;

  ngOnInit(): void {
    // Apply immediately on mount, then on every navigation end
    setTimeout(() => this.applyCurrentState(), 200);
    this.sub = this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => setTimeout(() => this.applyCurrentState(), 200));
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }

  private applyCurrentState(): void {
    document.querySelectorAll('goa-work-side-menu-item').forEach((item: Element) => {
      const url = item.getAttribute('url');
      const should = url ? this.isCurrent(url) : false;
      const anchor = (item as any).shadowRoot?.querySelector('a');
      if (anchor) {
        should ? anchor.classList.add('current') : anchor.classList.remove('current');
      }
    });
  }

  private readonly allNavPaths = ['/ecds-dashboard', '/notifications'];

  isCurrent(path: string | null): boolean {
    if (!path) return false;
    if (this.router.url === path) return true;
    // Default Home as current when no other known nav path matches
    if (path === '/ecds-dashboard' && !this.allNavPaths.includes(this.router.url)) return true;
    return false;
  }

  readonly navItems = [
    { icon: 'home', label: 'Home', path: '/ecds-dashboard' },
    { icon: 'ticket', label: 'Admin penalties', path: null },
    { icon: 'ribbon', label: 'Certification', path: null },
    { icon: 'id-card', label: 'Child registration', path: null },
    { icon: 'list', label: 'Claims', path: null },
    { icon: 'home', label: 'Family portal', path: null },
    { icon: 'file-tray-full', label: 'Funding', path: null },
    { icon: 'key', label: 'GOA user management', path: null },
    { icon: 'shield-checkmark', label: 'Licensing', path: null },
    { icon: 'checkmark-done', label: 'Post verification', path: null },
    { icon: 'document-text', label: 'Registered children report', path: null },
    { icon: 'body', label: 'Subsidy', path: null },
  ];
}
