import { Alert } from '@mui/material';
import { createFileRoute, Link } from '@tanstack/react-router';

function ForbiddenPage() {
  return (
    <Alert severity="warning">
      403 · 没有访问权限 <Link to="/">返回首页</Link>
    </Alert>
  );
}

export const Route = createFileRoute('/403')({
  component: ForbiddenPage
});
