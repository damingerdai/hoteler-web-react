import { createFileRoute } from '@tanstack/react-router';
import CommonLayout from '../components/comm-layout';

export const Route = createFileRoute('/_authenticated')({
  component: CommonLayout
});
