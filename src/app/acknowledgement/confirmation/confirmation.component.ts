import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GoabButton, GoabCallout, GoabLink, GoabText } from '@abgov/angular-components';
import { ACCOUNT, PROGRAMS, TERMS } from '../shared/acknowledgement-data';
import { AcknowledgementStateService } from '../shared/acknowledgement-state.service';

@Component({
  selector: 'app-acknowledgement-confirmation',
  standalone: true,
  imports: [GoabButton, GoabCallout, GoabLink, GoabText],
  templateUrl: './confirmation.component.html',
})
export class ConfirmationComponent implements OnInit {
  private readonly state = inject(AcknowledgementStateService);
  private readonly router = inject(Router);

  readonly account = ACCOUNT;
  readonly programCount = PROGRAMS.length;

  ngOnInit(): void {
    if (!this.state.submitted()) {
      this.router.navigate(['/acknowledgement'], { replaceUrl: true });
    }
  }

  continueToPortal(): void {
    this.router.navigate(['/home-page-design']);
  }

  download(): void {
    const lines = [
      'Child Care Accountability Program and Portal Access Acknowledgement',
      '',
      `Signed by: ${ACCOUNT.legalName}`,
      `Organization: ${ACCOUNT.organization}`,
      `Date: ${new Date().toLocaleDateString('en-CA', { dateStyle: 'long' })}`,
      '',
      'Programs covered:',
      ...PROGRAMS.map((p) => `  ${p}`),
      '',
      ...TERMS.flatMap((s, i) => [`${i + 1}. ${s.heading}`, ...s.clauses.map((c) => `  - ${c}`), '']),
    ];
    const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/plain' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'acknowledgement-abc-group-inc.txt';
    a.click();
    URL.revokeObjectURL(url);
  }
}
