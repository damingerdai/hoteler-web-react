import { createLazyFileRoute } from '@tanstack/react-router';
import Dashboard from '../../pages/dashboard-page';

export const Route = createLazyFileRoute('/_authenticated/dashboard')({
  component: Dashboard
});
