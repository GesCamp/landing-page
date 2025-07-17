export const ButtonType = {
    PRIMARY: 'primary',
    SUCCESS: 'success',
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
    NONE: 'none',
    DISABLED: 'disabled',
    NAVBAR: 'navbar'
} as const;

export type ButtonType =(typeof ButtonType)[keyof typeof ButtonType]; 