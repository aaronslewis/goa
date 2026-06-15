import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';

@Component({
  selector: 'eligibility-check',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './eligibility-check.component.html',
  styleUrl: './eligibility-check.component.scss',
})
export class EligibilityCheckComponent {
  readonly fullName = signal('');
  readonly monthlyIncome = signal<number | null>(null);
  readonly result = signal<{ income: number } | null>(null);

  onName(event: Event): void {
    const detail = (event as CustomEvent<{ value: string }>).detail;
    this.fullName.set(detail?.value ?? '');
  }

  onIncome(event: Event): void {
    const detail = (event as CustomEvent<{ value: string }>).detail;
    const parsed = Number(detail?.value);
    this.monthlyIncome.set(Number.isFinite(parsed) && parsed > 0 ? parsed : null);
  }

  check(): void {
    const income = this.monthlyIncome();
    if (income === null) return;
    this.result.set({ income });
  }

  formatIncome(value: number): string {
    return value.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 });
  }
}
