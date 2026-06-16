# React translation — `subsidy-application` UI kit

The kit's `FormWizard.jsx` uses cosmetic recreations. Swap for production imports:

| Kit recreation | Production import (`@abgov/react-components@4.x`) |
|---|---|
| `Button` | `GoAButton` |
| `Callout` | `GoACallout` |
| `Badge` | `GoABadge` |
| `FormItem` | `GoAFormItem` |
| `Input` | `GoAInput` / `GoAInputDate` / `GoAInputNumber` |
| `Dropdown` | `GoADropdown` + `GoADropdownItem` |
| `Checkbox` | `GoACheckbox` — note `onChange(name, checked, value)` |
| Stepper | `GoAFormStepper` + `GoAFormStep` exist in 4.x — prefer them over the kit's hand-rolled stepper |
| Child / review cards | `GoAContainer accent="thin"` |

Wizard pattern: service header (wordmark + name + `GoABadge content="Beta"` +
"Save and exit") → stepper → step content → footer nav (Back = tertiary, Save
and continue = primary) → review step with per-section Edit → confirmation gate
checkbox → success screen (`GoAContainer type="success"` + reference number).

Copy checklist: step titles plain ("About you", "Your children"), "Save and
continue"/"Back" not "Next"/"Previous", final button "Send application" never
"Submit".
