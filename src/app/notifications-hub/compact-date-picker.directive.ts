import { DestroyRef, Directive, ElementRef, inject } from '@angular/core';

// goa-date-picker (web-components 2.4.0) supports size="compact", but the
// GoabDatePicker wrapper in @abgov/angular-components 5.4.0 has no `size`
// input to pass it through. Set it on the inner element once the wrapper
// renders it. Drop this when the wrapper exposes `size`.
@Directive({
  selector: 'goab-date-picker[hubCompact]',
  standalone: true,
})
export class CompactDatePickerDirective {
  constructor() {
    const host = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
    const apply = () => host.querySelector('goa-date-picker')?.setAttribute('size', 'compact');
    const observer = new MutationObserver(apply);
    observer.observe(host, { childList: true, subtree: true });
    apply();
    inject(DestroyRef).onDestroy(() => observer.disconnect());
  }
}
