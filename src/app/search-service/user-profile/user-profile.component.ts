import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GoabBadge, GoabIcon, GoabContainer } from '@abgov/angular-components';
import { SearchShellComponent } from '../shared/search-shell/search-shell.component';
import { USERS } from '../shared/search-data';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [GoabBadge, GoabIcon, GoabContainer, RouterLink, SearchShellComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  searchValue = 'Sunny Jane';

  readonly user = {
    name: 'Sunny Jane',
    email: 'sunnyjane@company.com',
    portalStatus: 'No account' as string,
  };

  readonly programAccess = [
    { programId: '12347546', programName: 'SunnySide Daycare', orgId: '14327546', orgName: 'SunnySide Daycare Ltd.', role: 'Supervisor', status: 'Active' },
    { programId: '12345546', programName: 'SunnySide Licenced Dayhome', orgId: '14335546', orgName: 'SunnySide Daycare Licenced Dayhome South Edmonton', role: 'Educator', status: 'Active' },
  ];

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    const match = id ? USERS.find((u) => u.id === id) : undefined;
    if (match) {
      this.user.name = match.name;
      this.user.email = match.email;
      this.user.portalStatus = match.portalStatus;
      this.searchValue = match.name;
    }
  }
}
