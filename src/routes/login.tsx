import { createFileRoute } from '@tanstack/react-router';
import Login from '../pages/login-page';

function LoginPage() {
  return <Login />;
}

export const Route = createFileRoute('/login')({
  component: LoginPage
});
