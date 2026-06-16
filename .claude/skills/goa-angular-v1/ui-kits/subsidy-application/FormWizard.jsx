/* Apply for child care subsidy — multi-step form wizard. Exports FormWizard to window. */
(function () {
  const DS = window.AlbertaDesignSystemGoA_4f31c8 || {};
  const { Button, Callout, Badge, FormItem, Input, Dropdown, Checkbox, Container } = DS;

  const STEPS = ["About you", "Your children", "Care details", "Review"];

  function ServiceHeader() {
    return (
      <header className="svc-header">
        <div className="svc-header-inner">
          <img className="svc-wordmark" src="../../assets/alberta-wordmark.svg" alt="Government of Alberta" />
          <div className="svc-divider"></div>
          <span className="svc-name">Child care subsidy</span>
          <span className="svc-phase">Beta</span>
          <div className="svc-header-spacer"></div>
          <button className="svc-save"><ion-icon name="bookmark-outline"></ion-icon> Save and exit</button>
        </div>
      </header>
    );
  }

  function Stepper({ step }) {
    return (
      <div className="svc-stepper-wrap">
        <div className="svc-stepper">
          {STEPS.map((label, i) => {
            const cls = i < step ? "done" : i === step ? "current" : "";
            return (
              <div className={"svc-stp " + cls} key={label}>
                <div className="svc-stp-dot">{i < step ? <ion-icon name="checkmark-sharp"></ion-icon> : i + 1}</div>
                <div className="svc-stp-label">{label}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ---------- Step 1 ---------- */
  function StepAbout({ data, set }) {
    return (
      <React.Fragment>
        <p className="svc-eyebrow">Step 1 of 4</p>
        <h1>About you</h1>
        <p className="intro">We use this to confirm your eligibility and work out your subsidy amount.</p>
        <div className="svc-row2">
          <FormItem label="First name"><Input value={data.first} onChange={(e) => set({ first: e.target.value })} /></FormItem>
          <FormItem label="Last name"><Input value={data.last} onChange={(e) => set({ last: e.target.value })} /></FormItem>
        </div>
        <FormItem label="Annual household income" helpText="Line 15000 from last year's Notice of Assessment.">
          <Input prefix="$" value={data.income} onChange={(e) => set({ income: e.target.value })} />
        </FormItem>
        <div className="svc-row2">
          <FormItem label="People in your household">
            <Dropdown value={data.size} onChange={(e) => set({ size: e.target.value })}
              options={[{ value: "2", label: "2" }, { value: "3", label: "3" }, { value: "4", label: "4" }, { value: "5", label: "5 or more" }]} />
          </FormItem>
          <FormItem label="Your reason for care">
            <Dropdown value={data.reason} onChange={(e) => set({ reason: e.target.value })}
              options={["Working", "Looking for work", "In school", "Child has special needs"]} />
          </FormItem>
        </div>
      </React.Fragment>
    );
  }

  /* ---------- Step 2 ---------- */
  function StepChildren({ data, set }) {
    const children = data.children;
    function update(i, patch) {
      const next = children.map((c, idx) => (idx === i ? { ...c, ...patch } : c));
      set({ children: next });
    }
    function add() { set({ children: [...children, { name: "", dob: "", care: "Daycare / day home" }] }); }
    function remove(i) { set({ children: children.filter((_, idx) => idx !== i) }); }
    return (
      <React.Fragment>
        <p className="svc-eyebrow">Step 2 of 4</p>
        <h1>Your children</h1>
        <p className="intro">Add each child who needs licensed care. You can add more than one.</p>
        {children.map((c, i) => (
          <div className="svc-child" key={i}>
            <div className="svc-child-head">
              <h3>Child {i + 1}</h3>
              {children.length > 1 ? (
                <Button type="tertiary" size="compact" variant="destructive" leadingIcon="trash-outline" onClick={() => remove(i)}>Remove</Button>
              ) : null}
            </div>
            <div className="svc-row2">
              <FormItem label="Full name"><Input value={c.name} onChange={(e) => update(i, { name: e.target.value })} /></FormItem>
              <FormItem label="Date of birth"><Input placeholder="YYYY-MM-DD" trailingIcon="calendar-outline" value={c.dob} onChange={(e) => update(i, { dob: e.target.value })} /></FormItem>
            </div>
            <FormItem label="Type of care">
              <Dropdown value={c.care} onChange={(e) => update(i, { care: e.target.value })}
                options={["Daycare / day home", "Preschool", "Out-of-school care"]} />
            </FormItem>
          </div>
        ))}
        <Button type="secondary" leadingIcon="add-outline" onClick={add}>Add another child</Button>
      </React.Fragment>
    );
  }

  /* ---------- Step 3 ---------- */
  function StepCare({ data, set }) {
    return (
      <React.Fragment>
        <p className="svc-eyebrow">Step 3 of 4</p>
        <h1>Care details</h1>
        <p className="intro">Tell us about the licensed provider your children attend.</p>
        <FormItem label="Provider name"><Input value={data.provider} onChange={(e) => set({ provider: e.target.value })} /></FormItem>
        <FormItem label="Provider licence number" helpText="Found on your provider's licence or invoice.">
          <Input value={data.licence} onChange={(e) => set({ licence: e.target.value })} />
        </FormItem>
        <FormItem label="Care start date"><Input placeholder="YYYY-MM-DD" trailingIcon="calendar-outline" value={data.start} onChange={(e) => set({ start: e.target.value })} /></FormItem>
        <div style={{ marginTop: 8 }}>
          <Callout type="information" heading="Almost there">
            <p style={{ margin: 0 }}>On the next step you'll review everything and confirm before submitting.</p>
          </Callout>
        </div>
      </React.Fragment>
    );
  }

  /* ---------- Step 4 ---------- */
  function ReviewGroup({ title, onEdit, rows }) {
    return (
      <div className="svc-review-group">
        <div className="svc-review-head">
          <h3>{title}</h3>
          <button className="svc-review-edit" onClick={onEdit}>Edit</button>
        </div>
        <dl style={{ margin: 0 }}>
          {rows.map((r) => (
            <div className="svc-review-row" key={r[0]}><dt>{r[0]}</dt><dd>{r[1]}</dd></div>
          ))}
        </dl>
      </div>
    );
  }

  function StepReview({ data, goTo, agree, setAgree }) {
    return (
      <React.Fragment>
        <p className="svc-eyebrow">Step 4 of 4</p>
        <h1>Review and submit</h1>
        <p className="intro">Check your answers. You can edit any section before you submit.</p>
        <ReviewGroup title="About you" onEdit={() => goTo(0)} rows={[
          ["Name", `${data.first || "—"} ${data.last || ""}`.trim()],
          ["Household income", "$" + (data.income || "—")],
          ["Household size", data.size],
          ["Reason for care", data.reason],
        ]} />
        <ReviewGroup title="Your children" onEdit={() => goTo(1)} rows={data.children.map((c, i) => [
          `Child ${i + 1}`, `${c.name || "—"} · ${c.dob || "—"} · ${c.care}`,
        ])} />
        <ReviewGroup title="Care details" onEdit={() => goTo(2)} rows={[
          ["Provider", data.provider || "—"],
          ["Licence number", data.licence || "—"],
          ["Start date", data.start || "—"],
        ]} />
        <div style={{ margin: "8px 0 4px" }}>
          <Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)}
            label="I confirm this information is true and complete"
            description="Providing false information may affect your eligibility." />
        </div>
      </React.Fragment>
    );
  }

  /* ---------- Confirmation ---------- */
  function Confirmation({ data }) {
    return (
      <div className="svc-confirm">
        <div className="svc-confirm-icon"><ion-icon name="checkmark-sharp"></ion-icon></div>
        <h1>Application submitted</h1>
        <p>Thanks{data.first ? ", " + data.first : ""}. We've received your child care subsidy application.</p>
        <div className="ref">CCS-2026-04817</div>
        <p>We'll email you a decision within <b>10 business days</b>. You can track your application from your Alberta.ca Account.</p>
        <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center" }}>
          <Button type="primary" trailingIcon="arrow-forward-outline">Go to my account</Button>
          <Button type="tertiary">Print confirmation</Button>
        </div>
      </div>
    );
  }

  function FormWizard() {
    const [step, setStep] = React.useState(0);
    const [submitted, setSubmitted] = React.useState(false);
    const [agree, setAgree] = React.useState(false);
    const [data, setData] = React.useState({
      first: "Jordan", last: "Nakamura", income: "48,500", size: "3", reason: "Working",
      children: [{ name: "Maya Nakamura", dob: "2022-03-14", care: "Daycare / day home" }],
      provider: "Riverbend Early Learning", licence: "", start: "",
    });
    const set = (patch) => setData((d) => ({ ...d, ...patch }));

    if (submitted) {
      return (
        <div className="svc-app">
          <ServiceHeader />
          <div className="svc-main"><Confirmation data={data} /></div>
        </div>
      );
    }

    const last = STEPS.length - 1;
    return (
      <div className="svc-app">
        <ServiceHeader />
        <Stepper step={step} />
        <div className="svc-main">
          <div className="svc-form">
            {step === 0 && <StepAbout data={data} set={set} />}
            {step === 1 && <StepChildren data={data} set={set} />}
            {step === 2 && <StepCare data={data} set={set} />}
            {step === 3 && <StepReview data={data} goTo={setStep} agree={agree} setAgree={setAgree} />}
            <div className="svc-actions">
              {step > 0 ? <Button type="tertiary" leadingIcon="arrow-back-outline" onClick={() => setStep(step - 1)}>Back</Button> : null}
              <div className="spacer"></div>
              {step < last ? (
                <Button type="primary" trailingIcon="arrow-forward-outline" onClick={() => setStep(step + 1)}>Save and continue</Button>
              ) : (
                <Button type="primary" disabled={!agree} onClick={() => setSubmitted(true)}>Submit application</Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  window.FormWizard = FormWizard;
})();
