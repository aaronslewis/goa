import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GoabButton, GoabCheckbox, GoabFormItem, GoabLink, GoabText } from '@abgov/angular-components';
import type { GoabCheckboxOnChangeDetail } from '@abgov/ui-components-common';
import { TERMS } from '../shared/acknowledgement-data';
import { AckMultiOrgStateService } from '../shared/acknowledgement-state.service';

@Component({
  selector: 'app-ack-multi-org-terms',
  standalone: true,
  imports: [RouterLink, GoabButton, GoabCheckbox, GoabFormItem, GoabLink, GoabText],
  templateUrl: './terms.component.html',
  styleUrls: ['../shared/question-page.scss'],
})
export class TermsMultiOrgComponent implements OnInit {
  readonly state = inject(AckMultiOrgStateService);
  private readonly router = inject(Router);

  readonly terms = TERMS;
  readonly error = signal('');

  ngOnInit(): void {
    // Reached by URL before the details are confirmed (or after submitting): the task list
    // is where the user can see why this task isn't available.
    const status = this.state.termsStatus();
    if (status === 'cannot-start' || status === 'completed') {
      this.router.navigate(['/acknowledgement-multi-org'], { replaceUrl: true });
    }
  }

  onAgree(detail: GoabCheckboxOnChangeDetail): void {
    this.state.termsAgreed.set(detail.checked);
    if (detail.checked && this.state.termsReviewed()) this.error.set('');
  }

  onScroll(event: Event): void {
    const el = event.target as HTMLElement;
    // A few pixels of slack: sub-pixel rounding can stop scrollTop just short of the end.
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 4) {
      this.state.termsReviewed.set(true);
      if (this.state.termsAgreed()) this.error.set('');
    }
  }

  submit(): void {
    if (!this.state.termsReviewed()) {
      this.error.set('Scroll to the end of the terms before you agree.');
      return;
    }
    if (!this.state.termsAgreed()) {
      this.error.set('You must agree to the terms to continue.');
      return;
    }
    this.state.submit();
    this.router.navigate(['/acknowledgement-multi-org/confirmation']);
  }
}
