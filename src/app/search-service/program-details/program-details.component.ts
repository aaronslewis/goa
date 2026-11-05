import { Component, OnInit } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  GoabAccordion,
  GoabBadge,
  GoabCallout,
  GoabContainer,
  GoabIcon,
  GoabTab,
  GoabTable,
  GoabTabs,
  GoabTooltip,
} from '@abgov/angular-components';
import { GoabBadgeType, GoabIconType } from '@abgov/ui-components-common';
import { SearchShellComponent } from '../shared/search-shell/search-shell.component';
import { Agreement, getProgramDetail, ProgramDetail } from '../shared/search-data';

interface FundingSection {
  heading: string;
  service: string;
  agreement: Agreement;
}

@Component({
  selector: 'app-program-details',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    RouterLink,
    GoabAccordion,
    GoabBadge,
    GoabCallout,
    GoabContainer,
    GoabIcon,
    GoabTab,
    GoabTable,
    GoabTabs,
    GoabTooltip,
    SearchShellComponent,
  ],
  templateUrl: './program-details.component.html',
  styleUrl: './program-details.component.scss',
})
export class ProgramDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  searchValue = '';
  program!: ProgramDetail;
  fundingSections: FundingSection[] = [];
  statusBadgeType: GoabBadgeType = 'success';
  statusBadgeIcon: GoabIconType = 'shield-checkmark';

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    this.program = getProgramDetail(id);
    this.searchValue = `${this.program.id}: ${this.program.name}`;

    const status = this.program.status.toLowerCase();
    if (status.startsWith('unlicen')) {
      this.statusBadgeType = 'archived';
      this.statusBadgeIcon = 'remove-circle';
    } else if (status.includes('probationary')) {
      this.statusBadgeType = 'important';
    }

    const { fdhac, affordability, eceWorkforce } = this.program.funding;
    this.fundingSections = [
      ...(fdhac ? [{ heading: 'Family Day Home Agency Contract', service: 'FDHAC', agreement: fdhac }] : []),
      { heading: 'Affordability Grant Agreement', service: 'Affordability Grant', agreement: affordability },
      { heading: 'ECE Workforce Supports Grant', service: 'ECE Workforce Supports Grant', agreement: eceWorkforce },
    ];
  }
}
