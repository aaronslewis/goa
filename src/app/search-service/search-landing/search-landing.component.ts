import { Component } from '@angular/core';
import { GoabIcon } from '@abgov/angular-components';
import { SearchShellComponent } from '../shared/search-shell/search-shell.component';

@Component({
  selector: 'app-search-landing',
  standalone: true,
  imports: [GoabIcon, SearchShellComponent],
  templateUrl: './search-landing.component.html',
  styleUrl: './search-landing.component.scss',
})
export class SearchLandingComponent {}
