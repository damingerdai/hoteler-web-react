import { createLazyFileRoute } from '@tanstack/react-router';
import User from '../../pages/user-page';

export const Route = createLazyFileRoute('/_authenticated/user')({
  component: User
});
