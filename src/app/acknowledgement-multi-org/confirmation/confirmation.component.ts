import { Component, OnInit, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  GoabButton,
  GoabCallout,
  GoabContainer,
  GoabIcon,
  GoabLink,
  GoabTable,
  GoabText,
} from '@abgov/angular-components';
import { ACCOUNT, Organization, TERMS, programsFor } from '../shared/acknowledgement-data';
import { AckMultiOrgStateService } from '../shared/acknowledgement-state.service';

@Component({
  selector: 'app-ack-multi-org-confirmation',
  standalone: true,
  imports: [GoabButton, GoabCallout, GoabContainer, GoabIcon, GoabLink, GoabTable, GoabText],
  styleUrl: './confirmation.component.scss',
  templateUrl: './confirmation.component.html',
})
export class ConfirmationMultiOrgComponent implements OnInit {
  readonly state = inject(AckMultiOrgStateService);
  private readonly router = inject(Router);

  // Organizations still to do come first, then the acknowledged ones, most recent first.
  readonly orgRows = computed(() => {
    const done = this.state.completedOrgIds();
    return [
      ...this.state.remainingOrgs(),
      ...[...done].reverse().map((id) => this.state.organizations.find((o) => o.id === id)!),
    ];
  });

  ngOnInit(): void {
    if (!this.state.submitted()) {
      this.router.navigate(['/acknowledgement-multi-org'], { replaceUrl: true });
    }
  }

  completionDate(org: Organization): string {
    const date = this.state.completedOn()[org.id];
    return date ? this.formatDate(date) : '-';
  }

  // GoA content guidelines: day month year, month spelled out, no commas ("8 October 2026").
  private formatDate(date: Date): string {
    const month = date.toLocaleDateString('en-CA', { month: 'long' });
    return `${date.getDate()} ${month} ${date.getFullYear()}`;
  }

  startNextOrg(): void {
    this.state.startNextOrg();
    this.router.navigate(['/acknowledgement-multi-org/declaration']);
  }

  continueToPortal(): void {
    this.router.navigate(['/home-page-design']);
  }

  download(): void {
    const org = this.state.currentOrg();
    const lines = [
      'Child Care Accountability Program and Portal Access Acknowledgement',
      '',
      `Signed by: ${ACCOUNT.legalName}`,
      `Organization: ${org.name}`,
      `Date: ${this.formatDate(this.state.completedOn()[org.id] ?? new Date())}`,
      '',
      'Programs covered:',
      ...programsFor(org).map((p) => `  ${p}`),
      '',
      ...TERMS.flatMap((s, i) => [`${i + 1}. ${s.heading}`, ...s.clauses.map((c) => `  - ${c}`), '']),
    ];
    const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/plain' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `acknowledgement-${org.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
