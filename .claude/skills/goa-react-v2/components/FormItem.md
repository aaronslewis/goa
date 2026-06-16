# `GoabFormItem` — form field wrapper (React, V2)

Wrap **every** input.

```tsx
import { GoabFormItem, GoabInput } from '@abgov/react-components';

<GoabFormItem label="Your full name"
  helpText="We use your name to find your file if you've applied before.">
  <GoabInput name="fullName" value={fullName}
    onChange={(detail) => setFullName(detail.value)} />
</GoabFormItem>

<GoabFormItem label="Middle name" requirement="optional">
  <GoabInput name="middleName" value={middleName} onChange={onMiddleName} />
</GoabFormItem>

<GoabFormItem label="Date of birth" error={dobError}>
  <GoabInputDate name="dob" value={dob} onChange={onDob} error={!!dobError} />
</GoabFormItem>
```

## Props (from `@abgov/react-components@7.2`)

| Prop | Type | Notes |
|---|---|---|
| `label` | string | Sentence case. |
| `labelSize` | `"regular" \| "large"` | |
| `helpText` | string \| ReactNode | One short sentence. |
| `error` | string \| ReactNode | Specific ("Enter your date of birth"); empty = valid. Also set `error` on the inner input. |
| `requirement` | `"optional" \| "required"` | **Mark optional, not required.** |
| `maxWidth` | string | Default `none`. |
| `type` | `GoabFormItemType` | For checkbox-list / radio-group message spacing. |
| `children` | ReactNode | The input control. |
| `id`, `testId` | string | |
