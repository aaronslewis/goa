export interface WidgetSize {
  /** Dropdown value (also used as signal key) */
  value: string;
  /** Display label inside the dropdown */
  label: string;
  /** Actual width in pixels applied to the panel */
  px: number;
}

/** Ordered ascending by width. Named tiers keep their letter prefix; raw widths are labelled by px. */
export const WIDGET_SIZES: WidgetSize[] = [
  { value: '320', label: '320', px: 320 },
  { value: 'S', label: 'S · 360', px: 360 },
  { value: '382', label: '382', px: 382 },
  { value: 'M', label: 'M · 480', px: 480 },
  { value: '492', label: '492', px: 492 },
  { value: 'L', label: 'L · 640', px: 640 },
  { value: 'XL', label: 'XL · 800', px: 800 },
];

export const DEFAULT_SIZE_VALUE = 'M';

export function pxFor(value: string): number {
  return WIDGET_SIZES.find(s => s.value === value)?.px ?? 480;
}

export function isKnownSize(value: string): boolean {
  return WIDGET_SIZES.some(s => s.value === value);
}
