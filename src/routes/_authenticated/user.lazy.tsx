import { createLazyFileRoute } from '@tanstack/react-router';
import User from '../../pages/User';

export const Route = createLazyFileRoute('/_authenticated/user')({
  component: User
});
