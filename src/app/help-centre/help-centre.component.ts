import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'help-centre',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <goa-microsite-header type="alpha"></goa-microsite-header>
    <goa-app-header url="/" heading="Child Care Platform">
      <a href="#">Programs</a>
      <a href="#">Educators</a>
      <a href="#">Help Centre</a>
    </goa-app-header>

    <main class="page">
      <goa-page-block width="704px">
        <h1 class="page-title">Help Centre</h1>
        <p class="page-lede">
          Find answers, walk-throughs and contact info for everything in the Child Care
          Platform. Try a search, or browse the popular topics below.
        </p>

        <div class="search-row">
          <goa-input
            name="help-search"
            placeholder="Search for a topic, page or task…"
            leadingicon="search"
            width="100%"
            arialabel="Search the help centre">
          </goa-input>
        </div>

        <h2 class="section-title">Popular topics</h2>

        <goa-block direction="column" gap="m">
          <goa-container accent="thin" padding="relaxed">
            <h3 class="card-title">Updating educator certifications</h3>
            <p class="card-body">
              Renew, replace or add an educator's certification record from the staff page.
              Includes file size limits and accepted formats.
            </p>
          </goa-container>

          <goa-container accent="thin" padding="relaxed">
            <h3 class="card-title">Changing the Super Admin for your organization</h3>
            <p class="card-body">
              Transfer the Super Admin role, and what permissions move with it. Requires
              confirmation from the outgoing Super Admin or a platform support agent.
            </p>
          </goa-container>

          <goa-container accent="thin" padding="relaxed">
            <h3 class="card-title">Registering children</h3>
            <p class="card-body">
              Add a child to your program, including consent forms, the wait-list flow,
              and how subsidy eligibility is calculated.
            </p>
          </goa-container>

          <goa-container accent="thin" padding="relaxed">
            <h3 class="card-title">Submitting attendance</h3>
            <p class="card-body">
              Daily attendance, late submissions, and corrections after the period closes.
              Tracks the audit log on each change.
            </p>
          </goa-container>
        </goa-block>

        <h2 class="section-title">Still need help?</h2>
        <p class="page-body">
          Reach out to Platform Support at
          <a href="mailto:support@example.alberta.ca">support&#64;example.alberta.ca</a>
          or call 1-855-555-1234, Mon–Fri 8 am – 5 pm.
        </p>
      </goa-page-block>
    </main>

    <goa-app-footer></goa-app-footer>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .page {
        padding: 32px 0 64px;
        background: #f7f9fb;
        min-height: calc(100vh - 220px);
      }
      .page-title {
        margin: 0 0 8px;
      }
      .page-lede {
        margin: 0 0 24px;
        font-size: 18px;
        line-height: 1.5;
        color: #495a6f;
        max-width: 56ch;
      }
      .search-row {
        margin-bottom: 40px;
      }
      .section-title {
        margin: 40px 0 16px;
        font-size: 24px;
      }
      .card-title {
        margin: 0 0 4px;
        font-size: 18px;
      }
      .card-body {
        margin: 0;
        color: #495a6f;
        line-height: 1.5;
      }
      .page-body {
        line-height: 1.55;
      }
    `,
  ],
})
export class HelpCentreComponent {}
