
export const BadgeType ={
    INFO: 'info',
    DARK: 'dark',
    ERROR: 'error',
    SUCCESS: 'success',
    WARNING: 'warning',
    PURPE: 'purpe',
} as const;

export type BadgeType = (typeof BadgeType) [keyof typeof BadgeType];

