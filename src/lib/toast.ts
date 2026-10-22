import type { AlertColor } from '@mui/material';

export interface Notification {
  id: number;
  message: string;
  severity: AlertColor;
}
let current: Notification | null = null;
let sequence = 0;
const listeners = new Set<() => void>();
export const notifications = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
  getSnapshot: () => current,
  dismiss() {
    current = null;
    listeners.forEach(listener => listener());
  }
};
function show(message: string, severity: AlertColor) {
  current = { id: ++sequence, message, severity };
  listeners.forEach(listener => listener());
}
export const toast = {
  success: (message: string) => show(message, 'success'),
  error: (message: string) => show(message, 'error')
};
