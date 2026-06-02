import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HelpCentreComponent } from './help-centre/help-centre.component';
import { SageWidgetComponent } from './sage-widget/sage-widget.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HelpCentreComponent, SageWidgetComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <help-centre></help-centre>
    <sage-widget></sage-widget>
  `,
})
export class App {}
