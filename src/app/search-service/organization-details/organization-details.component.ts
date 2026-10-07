import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import {
  GoabBadge,
  GoabIcon,
  GoabTabs,
  GoabTab,
  GoabContainer,
  GoabGrid,
} from '@abgov/angular-components';
import { SearchShellComponent } from '../shared/search-shell/search-shell.component';
import { ORGANIZATIONS } from '../shared/search-data';

@Component({
  selector: 'app-organization-details',
  standalone: true,
  imports: [GoabBadge, GoabIcon, GoabTabs, GoabTab, GoabContainer, GoabGrid, RouterLink, SearchShellComponent],
  templateUrl: './organization-details.component.html',
  styleUrl: './organization-details.component.scss',
})
export class OrganizationDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  searchValue = 'SunnySide Daycare Pvt. Ltd.';

  readonly org = {
    name: 'SUNNYSIDE DAYCARE PVT. LTD.',
    id: '12345678',
    type: 'Incorporated',
    operatingModel: 'For profit' as 'For profit' | 'Non-profit',
    primaryContact: {
      name: 'Dennis Reynolds',
      phone: '780-345-2691',
      email: 'dennis.reynolds@sunnyside.com',
      address: '12345 104 Avenue NW, Edmonton, AB T5N 0Y9',
    },
    secondaryContact: {
      name: 'Mellissa Smith',
      phone: '-',
      email: 'mellissasmith@sunnyside.com',
      address: '-',
    },
  };

  readonly legalRepresentatives = [
    { name: 'Dennis Reynolds', role: 'Director', status: 'Active' },
    { name: 'Mellissa Smith', role: 'Director', status: 'Active' },
    { name: 'Charlie Kelly', role: 'Officer', status: 'Active' },
    { name: 'Deandra Reynolds', role: 'Officer', status: 'Pending' },
  ];

  readonly programs = [
    { id: '12347546', name: 'SunnySide Daycare' },
    { id: '12345546', name: 'SunnySide Licenced Dayhome' },
  ];

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    const match = id ? ORGANIZATIONS.find((o) => o.id === id) : undefined;
    if (match) this.searchValue = match.name;
  }
}
