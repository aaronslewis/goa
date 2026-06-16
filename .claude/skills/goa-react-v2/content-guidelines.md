# Content guidelines — UI copy for the Government of Alberta

Authority sources:
- [Alberta.ca web writing style guide](https://www.alberta.ca/web-writing-style-guide-writing-style)
- [v1.design.alberta.ca/foundations/content](https://v1.design.alberta.ca/foundations/content)

Every piece of UI copy this skill produces — headings, labels, body, button text,
error messages, help text, empty states, confirmations — follows these rules.

## Reading level

- **Grade 8 or lower whenever possible.** Plain language is the default.
- **Aim for Grade 6–8** on citizen-facing service flows (eligibility checks,
  application wizards, payments, status pages). The audience is the general public.
- **Grade 8** is acceptable on staff/admin tools and clearly technical pages, but
  never an excuse for jargon when a plain word would do.
- Lightweight self-check: short sentences + common words = roughly Grade 6–8. Long
  polysyllabic words + nested clauses = too high; rewrite.

## Voice & person

- **Second person to the reader — "you".** Address the user directly.
- **First person plural for the government — "we"** / "the Government of Alberta".
  Use sparingly; the focus is the reader's action, not what the ministry did.
- **Never** third-person ministry names in the body of a page ("the Ministry of
  Children and Family Services said…"). It distances the reader.
- Calm, factual, conversational — never marketing-hype, never bureaucratic.

## Sentence structure

- **Short sentences. Short paragraphs.** One idea per sentence.
- **Active voice — subject-verb-object.** "We review your application within
  10 business days." Not "Applications are reviewed within 10 business days."
- Break long lists into bullets. Use definition lists for label-value pairs.
- Front-load the important information — the reader scans, they don't read.

## Word choice

- **No jargon. No legalese. No internal acronyms.** If you must use an acronym,
  spell it out on first use.
- **Plain alternatives, always.** Prefer:
  - "use" not "utilize"
  - "help" not "assist"
  - "about" not "regarding"
  - "start" not "commence"
  - "end" not "terminate"
  - "tell" not "inform"
  - "ask" not "enquire"
  - "show" not "demonstrate"
  - "need" not "require"
- **No filler.** Cut "in order to", "at this time", "please note that".
- **No emoji. No exclamation marks. No ALL CAPS.** No marketing fluff ("amazing",
  "fantastic", "exciting").

## Headings

- **Sentence case.** "Who can apply", not "Who Can Apply".
- **Action-first or plain questions.** "How to apply", "Estimate your subsidy",
  "Who can apply".
- **Never clever or abstract.** "Your journey begins" is wrong. "Apply for child
  care subsidy" is right.
- Page titles describe what the page is *for*, not what the page is *called*.

## Buttons & calls to action

- **Sentence case.** "Apply now", not "Apply Now".
- **Name the action.** "Apply now", "Save and continue", "Estimate subsidy",
  "Add a child", "Remove".
- **Never "Submit"** as a primary button label — say what's being submitted.
  "Send application", "Save changes", "Confirm appointment".
- **Never "Click here"** as link text — the link text *is* the action.
- The destructive variant on `<goa-button>` is for irreversible actions: "Delete",
  "Withdraw application", "Cancel registration".

## Numbers, money, dates

- **Always numerals.** "10 business days", "20 minutes", "3 children".
- **Money:** "$1,540", "$1,540 / month", "up to $2,400 per child per year".
- **Dates: day month year, no commas.** "5 June 2026". Month spelled out.
- **Times:** "9 am", "4:30 pm" — lowercase am/pm, space before.
- **Phone:** "780-555-0100".

## Tone calibration

- **Calm and factual.** The reader is often anxious — applying for support, waiting
  on a decision, navigating a hard moment.
- **Heavier** for somber topics (emergency benefits, bereavement leave, child
  protection): even simpler language, no bullet-list humour, no "you've got this".
- **Lighter** for family-life topics where it fits: "Tell us about your kids" is
  warmer than "Provide dependent information".
- **State caveats plainly.** "This isn't a guarantee of funding." "Your information
  is saved automatically. You can leave and come back later."

## Inclusion & accessibility

- **Gender-neutral.** "They" not "he or she". "Parent or guardian" not "mother or
  father" unless legally required.
- **Never rely on colour alone.** Error states need an icon + text, not just red.
  Success states need a checkmark + text, not just green.
- **Label every form field.** No placeholder-only inputs.
- **Match button copy to the action.** No mystery boxes.
- **Spell out acronyms on first use.** "ACS (Alberta Child Subsidy)" the first
  time, then "ACS" after.

## Verification — copy review before preview

Before previewing the screen:

1. Read every visible string in the template aloud.
2. Check each against this file — especially headings, button labels, error
   messages, empty states.
3. Flag any string that feels Grade-9+: long polysyllabic words, nested clauses,
   passive voice, jargon. Rewrite.
4. Confirm: no emoji, no "Submit"/"Click here", sentence case, dates as
   "5 June 2026", numerals for all numbers.

## When in doubt

- Default to the simpler word.
- Default to the shorter sentence.
- Default to "you" over "the applicant".
- Default to the verb over the noun ("apply" over "application submission").
- Read the [Alberta.ca writing guide](https://www.alberta.ca/web-writing-style-guide-writing-style) — it's the canonical source.
