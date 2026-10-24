import { useId, useState } from 'react';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { errorMessage } from '../lib/request';
export default function ConfirmModal({
  name,
  onConfirm,
  onClose
}: {
  name: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}) {
  const id = useId();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  return (
    <Dialog
      open
      onClose={() => {
        if (!busy) onClose();
      }}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
    >
      <DialogTitle id={`${id}-title`}>确定删除{name}？</DialogTitle>
      <DialogContent>
        <DialogContentText id={`${id}-description`}>
          一旦删除，将不能够恢复。
        </DialogContentText>
        {error && <Alert severity="error">{error}</Alert>}
      </DialogContent>
      <DialogActions>
        <Button autoFocus disabled={busy} onClick={onClose}>
          取消
        </Button>
        <Button
          color="error"
          loading={busy}
          onClick={async () => {
            setBusy(true);
            try {
              await onConfirm();
              onClose();
            } catch (cause) {
              setError(errorMessage(cause));
              setBusy(false);
            }
          }}
        >
          删除
        </Button>
      </DialogActions>
    </Dialog>
  );
}
