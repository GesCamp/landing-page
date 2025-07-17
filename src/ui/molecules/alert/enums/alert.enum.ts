export const AlertType = {
  INFO: 'info',
  DANGER: 'danger',
  SUCCESS: 'success',
  WARNING: 'warning',
  DARK: 'dark'
} as const;


export type AlertType = (typeof AlertType) [keyof typeof AlertType];