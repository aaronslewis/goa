import { Component, OnInit } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GoabBadge, GoabContainer, GoabIcon, GoabTab, GoabTabs } from '@abgov/angular-components';
import { SearchShellComponent } from '../shared/search-shell/search-shell.component';
import { getOrgDetail, OrgDetail } from '../shared/search-data';

@Component({
  selector: 'app-organization-details',
  standalone: true,
  imports: [NgTemplateOutlet, RouterLink, GoabBadge, GoabContainer, GoabIcon, GoabTab, GoabTabs, SearchShellComponent],
  templateUrl: './organization-details.component.html',
  styleUrl: './organization-details.component.scss',
})
export class OrganizationDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  searchValue = '';
  org!: OrgDetail;

  ngOnInit(): void {
    this.org = getOrgDetail(this.route.snapshot.queryParamMap.get('id'));
    this.searchValue = this.org.name;
  }
}
