import { Component, inject } from '@angular/core';
import {
  GoabButton,
  GoabButtonGroup,
  GoabDatePicker,
  GoabDrawer,
  GoabDropdown,
  GoabDropdownItem,
  GoabDropdownMultiselect,
  GoabFormItem,
  GoabIconButton,
  GoabInput,
  GoabTextArea,
} from '@abgov/angular-components';
import {
  GoabDatePickerOnChangeDetail,
  GoabDropdownMultiselectOnChangeDetail,
  GoabDropdownOnChangeDetail,
  GoabInputOnChangeDetail,
  GoabTextAreaOnChangeDetail,
} from '@abgov/ui-components-common';
import { MessagePart, NOTIFY_TO, PROGRAMS, PROGRAM_BY_ID } from '../notifications.data';
import { NotificationComposer } from '../notification-composer';
import { NotificationsService } from '../notifications.service';

interface FormState {
  title: string;
  programId: string;
  notifyTo: string[];
  message: string;
  reminderDate: string;
}

const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

const emptyForm = (): FormState => ({
  title: '',
  programId: '',
  notifyTo: [NOTIFY_TO[0]],
  message: '',
  reminderDate: todayIso(),
});

@Component({
  selector: 'hub-add-notification-drawer',
  standalone: true,
  imports: [
    GoabButton,
    GoabButtonGroup,
    GoabDatePicker,
    GoabDrawer,
    GoabDropdown,
    GoabDropdownItem,
    GoabDropdownMultiselect,
    GoabFormItem,
    GoabIconButton,
    GoabInput,
    GoabTextArea,
  ],
  templateUrl: './add-notification-drawer.component.html',
  styleUrl: './add-notification-drawer.component.scss',
})
export class AddNotificationDrawerComponent {
  private readonly service = inject(NotificationsService);
  readonly composer = inject(NotificationComposer);

  readonly programs = PROGRAMS;
  readonly notifyTo = NOTIFY_TO;

  form: FormState = emptyForm();
  submitted = false;

  get errors() {
    return {
      notifyTo: !this.form.notifyTo.length ? 'Select at least one recipient' : '',
      title: !this.form.title.trim() ? 'Enter a title' : '',
      message: !this.form.message.trim() ? 'Enter a message' : '',
      reminderDate: !this.form.reminderDate ? 'Enter a reminder date' : '',
    };
  }

  // Anything the user has entered or changed, so closing can keep it safe
  // instead of throwing it away.
  get dirty(): boolean {
    const blank = emptyForm();
    return (
      !!this.form.title.trim() ||
      !!this.form.message.trim() ||
      !!this.form.programId ||
      this.form.reminderDate !== blank.reminderDate ||
      this.form.notifyTo.join() !== blank.notifyTo.join()
    );
  }

  onTitle(d: GoabInputOnChangeDetail): void {
    this.form = { ...this.form, title: d.value };
  }

  onNotifyTo(d: GoabDropdownMultiselectOnChangeDetail): void {
    this.form = { ...this.form, notifyTo: d.value ?? [] };
  }

  onProgram(d: GoabDropdownOnChangeDetail): void {
    this.form = { ...this.form, programId: d.value ?? '' };
  }

  onMessage(d: GoabTextAreaOnChangeDetail): void {
    this.form = { ...this.form, message: d.value };
  }

  onDate(d: GoabDatePickerOnChangeDetail): void {
    this.form = { ...this.form, reminderDate: d.valueStr ?? '' };
  }

  save(): void {
    this.submitted = true;
    if (Object.values(this.errors).some(Boolean)) return;

    const [y, m, day] = this.form.reminderDate.split('-').map(Number);
    const now = new Date();
    // Keep the current time of day so a notification for today sorts as "Just now".
    const createdAt = new Date(y, m - 1, day, now.getHours(), now.getMinutes(), now.getSeconds());

    const program = PROGRAM_BY_ID.get(this.form.programId);
    const text = this.form.message.trim();
    // A reminder about a program leads with it, ID included:
    // "Concerning Bow River Daycare (80002817): <message>".
    const message: MessagePart[] = program
      ? [{ text: 'Concerning ' }, { text: program.name, bold: true }, { text: ` (${program.id}): ${text}` }]
      : [{ text }];

    this.service.add({
      title: this.form.title.trim(),
      message,
      programId: this.form.programId || undefined,
      notifyTo: this.form.notifyTo,
      createdAt,
    });
    this.discard();
  }

  // Escape, the close button and a click outside all land here. A draft in
  // progress is minimized rather than lost; Cancel and the dock's discard
  // button are the ways to throw it away.
  onClose(): void {
    if (this.composer.state() !== 'open') return;
    if (this.dirty) this.composer.minimize();
    else this.discard();
  }

  discard(): void {
    this.form = emptyForm();
    this.submitted = false;
    this.composer.close();
  }
}
