import { createLazyFileRoute } from '@tanstack/react-router';
import Customer from '../../pages/Customer';

export const Route = createLazyFileRoute('/_authenticated/customer')({
  component: Customer
});
