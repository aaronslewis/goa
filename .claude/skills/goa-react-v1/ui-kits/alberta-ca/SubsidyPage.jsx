/* Alberta.ca — Child care subsidy info page. Exports SubsidyPage to window. */
(function () {
  const DS = window.AlbertaDesignSystemGoA_4f31c8 || {};
  const { Button, Container, Callout, Badge, FormItem, Input, Dropdown } = DS;

  function UtilityBar() {
    return (
      <div className="gov-utility">
        <div className="gov-utility-inner">
          <a href="#"><ion-icon name="globe-outline"></ion-icon>Français</a>
          <a href="#"><ion-icon name="person-circle-outline"></ion-icon>Sign in to your account</a>
        </div>
      </div>
    );
  }

  function SiteHeader({ onSearch }) {
    return (
      <header className="gov-header">
        <div className="gov-header-inner">
          <img className="gov-wordmark" src="../../assets/alberta-wordmark.svg" alt="Government of Alberta" />
          <div className="gov-header-divider"></div>
          <span className="gov-service-name">Child care subsidy</span>
          <div className="gov-header-spacer"></div>
          <button className="gov-search-btn" onClick={onSearch}>
            <ion-icon name="search-outline"></ion-icon> Search alberta.ca
          </button>
        </div>
      </header>
    );
  }

  function Breadcrumb() {
    return (
      <nav className="gov-breadcrumb" aria-label="Breadcrumb">
        <a href="#">Alberta.ca</a>
        <ion-icon name="chevron-forward-outline"></ion-icon>
        <a href="#">Family &amp; social supports</a>
        <ion-icon name="chevron-forward-outline"></ion-icon>
        <span>Child care subsidy</span>
      </nav>
    );
  }

  const SECTIONS = [
    ["overview", "Overview"],
    ["eligibility", "Who can apply"],
    ["rates", "Subsidy rates"],
    ["estimate", "Estimate your subsidy"],
    ["apply", "How to apply"],
  ];

  function OnThisPage({ active, onJump }) {
    return (
      <aside className="gov-onthispage">
        <h2>On this page</h2>
        <ul>
          {SECTIONS.map(([id, label]) => (
            <li key={id}>
              <a href={"#" + id} className={active === id ? "active" : ""}
                 onClick={(e) => { e.preventDefault(); onJump(id); }}>{label}</a>
            </li>
          ))}
        </ul>
      </aside>
    );
  }

  function RatesTable() {
    const rows = [
      ["Daycare / day home", "0–kindergarten", "$266", "$1,540"],
      ["Preschool", "3–4 years", "$120", "$240"],
      ["Out-of-school care", "Kindergarten–grade 6", "$160", "$650"],
    ];
    return (
      <table className="gov-table">
        <thead>
          <tr>
            <th>Type of care</th><th>Child's age</th>
            <th className="num">Min. subsidy</th><th className="num">Max. subsidy / month</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              <td>{r[0]}</td><td>{r[1]}</td>
              <td className="num">{r[2]}</td><td className="num">{r[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  function Estimator() {
    const [income, setIncome] = React.useState("48,500");
    const [size, setSize] = React.useState("3");
    const [care, setCare] = React.useState("Daycare / day home");
    const [result, setResult] = React.useState(1540);
    const [shown, setShown] = React.useState(true);

    function estimate() {
      const inc = parseInt(String(income).replace(/[^0-9]/g, ""), 10) || 0;
      const base = { "Daycare / day home": 1540, "Preschool": 240, "Out-of-school care": 650 }[care] || 1540;
      const fam = parseInt(size, 10) || 3;
      const threshold = 90000 + (fam - 2) * 7500;
      let amt = base;
      if (inc > threshold) amt = 0;
      else if (inc > 50000) amt = Math.round(base * (1 - (inc - 50000) / (threshold - 50000)) / 20) * 20;
      setResult(Math.max(0, amt));
      setShown(true);
    }

    return (
      <Container heading="Estimate your monthly subsidy" accent="thick">
        <p style={{ margin: "0 0 20px", font: "var(--goa-typography-body-s)", color: "var(--goa-color-text-secondary)" }}>
          Answer three questions for a rough estimate. This isn't an application or a guarantee of funding.
        </p>
        <div className="gov-estimator">
          <FormItem label="Annual household income">
            <Input prefix="$" value={income} onChange={(e) => setIncome(e.target.value)} />
          </FormItem>
          <FormItem label="People in your household">
            <Dropdown value={size} onChange={(e) => setSize(e.target.value)}
              options={[{ value: "2", label: "2" }, { value: "3", label: "3" }, { value: "4", label: "4" }, { value: "5", label: "5 or more" }]} />
          </FormItem>
          <FormItem label="Type of care" requirement="optional">
            <Dropdown value={care} onChange={(e) => setCare(e.target.value)}
              options={["Daycare / day home", "Preschool", "Out-of-school care"]} />
          </FormItem>
          <div style={{ paddingBottom: 4 }}>
            <Button type="primary" leadingIcon="calculator-outline" onClick={estimate}>Estimate subsidy</Button>
          </div>
        </div>
        {shown ? (
          <div style={{ marginTop: 24 }}>
            <Callout type={result > 0 ? "success" : "information"}
              heading={result > 0 ? "You may be eligible" : "You may not qualify for a subsidy"}>
              {result > 0 ? (
                <div className="gov-result">
                  <span className="amt">${result.toLocaleString()}</span>
                  <span className="per">estimated maximum / month</span>
                </div>
              ) : (
                <p style={{ margin: 0 }}>Based on this income and household size you're likely above the threshold. You can still apply — final eligibility is confirmed on review.</p>
              )}
            </Callout>
          </div>
        ) : null}
      </Container>
    );
  }

  function ApplySteps() {
    const steps = [
      ["Create an Alberta.ca Account", "You'll use it to sign in and track your application."],
      ["Gather your documents", "Last year's Notice of Assessment, each child's birth date, and your care provider's details."],
      ["Complete the online application", "It takes about 20 minutes. You can save and come back."],
      ["Get your decision", "Most decisions are made within 10 business days."],
    ];
    return (
      <div className="gov-steps">
        {steps.map((s, i) => (
          <div className="gov-step" key={i}>
            <div className="gov-step-num"></div>
            <div className="gov-step-body">
              <h3>{s[0]}</h3>
              <p>{s[1]}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function SiteFooter() {
    const cols = [
      ["Child care", ["Find licensed child care", "Subsidy rates", "Approved providers", "Renew your subsidy"]],
      ["Family supports", ["Income Support", "Alberta Child and Family Benefit", "Parenting resources"]],
      ["About", ["Contact us", "News", "Open government", "Privacy"]],
    ];
    return (
      <footer className="gov-footer">
        <div className="gov-footer-inner">
          <div className="gov-footer-links">
            {cols.map((c) => (
              <div className="gov-footer-col" key={c[0]}>
                <h3>{c[0]}</h3>
                {c[1].map((l) => <a href="#" key={l}>{l}</a>)}
              </div>
            ))}
          </div>
          <div className="gov-footer-base">
            <img src="../../assets/alberta-wordmark.svg" alt="Government of Alberta" />
            <span className="copy">©2026 Government of Alberta</span>
          </div>
        </div>
      </footer>
    );
  }

  function SubsidyPage() {
    const [active, setActive] = React.useState("overview");
    function jump(id) {
      setActive(id);
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.offsetTop - 16, behavior: "smooth" });
    }
    return (
      <div className="gov-page">
        <UtilityBar />
        <SiteHeader onSearch={() => {}} />
        <Breadcrumb />
        <div className="gov-titleblock">
          <Badge type="success" subtle content="Accepting applications" />
          <h1 style={{ marginTop: 12 }}>Child care subsidy</h1>
          <p className="lede">Lower the cost of licensed child care. Subsidy is based on your household income, size, and the type of care you use.</p>
        </div>
        <div className="gov-body">
          <OnThisPage active={active} onJump={jump} />
          <div className="gov-content">
            <section id="overview">
              <h2>Overview</h2>
              <p>The child care subsidy helps eligible families pay for licensed daycare, day homes, preschool, and out-of-school care. Most families with a household income under $180,000 qualify for some support.</p>
              <Callout type="information" heading="Before you start">
                <p style={{ margin: 0 }}>Have last year's Notice of Assessment and each child's birth date ready. Applying online is the fastest way to get a decision.</p>
              </Callout>
            </section>
            <section id="eligibility">
              <h2>Who can apply</h2>
              <p>You may be eligible if you:</p>
              <ul className="check">
                <li><ion-icon name="checkmark-circle"></ion-icon> Are an Alberta resident and Canadian citizen or permanent resident</li>
                <li><ion-icon name="checkmark-circle"></ion-icon> Have a child in licensed or approved child care</li>
                <li><ion-icon name="checkmark-circle"></ion-icon> Are working, looking for work, or in school — or your child has special needs</li>
              </ul>
            </section>
            <section id="rates">
              <h2>Subsidy rates</h2>
              <p>Maximum monthly amounts by care type. Your actual subsidy depends on income and attendance.</p>
              <RatesTable />
            </section>
            <section id="estimate">
              <h2>Estimate your subsidy</h2>
              <Estimator />
            </section>
            <section id="apply">
              <h2>How to apply</h2>
              <ApplySteps />
              <div className="gov-cta" style={{ marginTop: 28 }}>
                <div>
                  <h2>Ready to apply?</h2>
                  <p>The online application takes about 20 minutes.</p>
                </div>
                <Button type="start" variant="inverse">Apply now</Button>
              </div>
            </section>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  window.SubsidyPage = SubsidyPage;
})();
