import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal, effect } from '@angular/core';
import { ProgramService } from '../services/program.service';

@Component({
  selector: 'program-selector',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './program-selector.component.html',
  styleUrl: './program-selector.component.scss',
})
export class ProgramSelectorComponent {
  protected readonly programService = inject(ProgramService);

  protected readonly modalOpen = signal(false);
  protected readonly pendingId = signal<string>('');

  constructor() {
    // React to external open requests (e.g. from My Programs page CTAs)
    effect(() => {
      if (this.programService.selectorOpen()) {
        this.pendingId.set(this.programService.selectedProgram()?.id ?? '');
        this.modalOpen.set(true);
        this.programService.closeSelector();
      }
    });
  }

  get programs() {
    return this.programService.programs;
  }

  openSelector(): void {
    this.pendingId.set(this.programService.selectedProgram()?.id ?? '');
    this.modalOpen.set(true);
  }

  closeModal(): void {
    this.modalOpen.set(false);
  }

  onProgramChange(event: Event): void {
    const detail = (event as CustomEvent<{ value: string }>).detail;
    this.pendingId.set(detail?.value ?? '');
  }

  confirmSelection(): void {
    if (this.pendingId()) {
      this.programService.selectProgram(this.pendingId());
      this.modalOpen.set(false);
    }
  }

  ngOnInit(): void {
    // On My Programs page (first visit), don't force-open the modal —
    // let the page CTA drive it. On other pages, open automatically.
    // We detect "other pages" by checking if the URL is not my-programs.
    // The app uses hash-based routing, so the route lives in location.hash,
    // not location.pathname (which is always just "/").
    const path = window.location.hash.replace(/^#/, '') || '/';
    const isMyPrograms = path === '/' || path.includes('my-programs');
    if (!this.programService.hasProgram() && !isMyPrograms) {
      this.modalOpen.set(true);
    }
  }
}
