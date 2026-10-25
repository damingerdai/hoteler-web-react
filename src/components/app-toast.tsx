import { useSyncExternalStore } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { notifications } from '../lib/toast';

export default function Toast() {
  const notification = useSyncExternalStore(
    notifications.subscribe,
    notifications.getSnapshot
  );
  return (
    <Snackbar
      key={notification?.id}
      open={!!notification}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={(_, reason) => {
        if (reason !== 'clickaway') notifications.dismiss();
      }}
    >
      <Alert
        severity={notification?.severity}
        variant="filled"
        onClose={notifications.dismiss}
      >
        {notification?.message}
      </Alert>
    </Snackbar>
  );
}
