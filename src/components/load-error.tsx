import { Alert, Button } from '@mui/material';
export default function LoadError({ retry }: { retry: () => unknown }) {
  return (
    <Alert
      severity="error"
      action={<Button onClick={() => retry()}>重试</Button>}
    >
      加载失败，请稍后重试
    </Alert>
  );
}
