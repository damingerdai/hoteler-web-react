import { createLazyFileRoute } from '@tanstack/react-router';
import Customer from '../../pages/customer-page';

export const Route = createLazyFileRoute('/_authenticated/customer')({
  component: Customer
});
