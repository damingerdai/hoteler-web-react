import { Suspense, type ReactElement } from 'react';
import GlobalLoading from './GlobalLoading';

export const withSuspense = (ui: ReactElement) => (
  <Suspense fallback={<GlobalLoading />}>{ui}</Suspense>
);
