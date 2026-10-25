import { createLazyFileRoute } from '@tanstack/react-router';
import Room from '../../pages/Room';

export const Route = createLazyFileRoute('/_authenticated/room')({
  component: Room
});
