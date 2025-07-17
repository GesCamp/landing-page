export const ToastTypeEnum = {
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error' 
} as const;

export type ToastTypeEnum =(typeof ToastTypeEnum)[keyof typeof ToastTypeEnum]; 