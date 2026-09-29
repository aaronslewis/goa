import { Component, inject, input, output } from '@angular/core';
import {
  GoabButton,
  GoabButtonGroup,
  GoabDatePicker,
  GoabDrawer,
  GoabDropdown,
  GoabDropdownItem,
  GoabFormItem,
  GoabInput,
  GoabTextArea,
} from '@abgov/angular-components';
import {
  GoabDatePickerOnChangeDetail,
  GoabDropdownOnChangeDetail,
  GoabInputOnChangeDetail,
  GoabTextAreaOnChangeDetail,
} from '@abgov/ui-components-common';
import { NOTIFY_TO, PROGRAMS } from '../notifications.data';
import { NotificationsService } from '../notifications.service';

interface FormState {
  title: string;
  programId: string;
  notifyTo: string;
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
  notifyTo: NOTIFY_TO[0],
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
    GoabFormItem,
    GoabInput,
    GoabTextArea,
  ],
  templateUrl: './add-notification-drawer.component.html',
  styleUrl: './add-notification-drawer.component.scss',
})
export class AddNotificationDrawerComponent {
  private readonly service = inject(NotificationsService);

  readonly open = input(false);
  readonly closed = output<void>();

  readonly programs = PROGRAMS;
  readonly notifyTo = NOTIFY_TO;

  form: FormState = emptyForm();
  submitted = false;

  get errors() {
    return {
      title: !this.form.title.trim() ? 'Enter a title' : '',
      message: !this.form.message.trim() ? 'Enter a message' : '',
      reminderDate: !this.form.reminderDate ? 'Enter a reminder date' : '',
    };
  }

  onTitle(d: GoabInputOnChangeDetail): void {
    this.form = { ...this.form, title: d.value };
  }

  onDropdown(field: 'programId' | 'notifyTo', d: GoabDropdownOnChangeDetail): void {
    this.form = { ...this.form, [field]: d.value ?? '' };
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

    this.service.add({
      title: this.form.title.trim(),
      message: [{ text: this.form.message.trim() }],
      programId: this.form.programId || undefined,
      notifyTo: this.form.notifyTo,
      createdAt,
    });
    this.close();
  }

  close(): void {
    this.form = emptyForm();
    this.submitted = false;
    this.closed.emit();
  }
}
