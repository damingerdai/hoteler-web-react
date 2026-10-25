import { createLazyFileRoute } from '@tanstack/react-router';
import Room from '../../pages/room-page';

export const Route = createLazyFileRoute('/_authenticated/room')({
  component: Room
});
