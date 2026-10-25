import { createFileRoute } from '@tanstack/react-router';
import Login from '../pages/Login';

function RegisterPage() {
  return <Login register />;
}

export const Route = createFileRoute('/register')({
  component: RegisterPage
});
