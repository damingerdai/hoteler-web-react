import { createRouter } from '@tanstack/react-router';
import GlobalLoading from './components/global-loading';
import { routeTree } from './routeTree.gen';

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPendingComponent: GlobalLoading
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
