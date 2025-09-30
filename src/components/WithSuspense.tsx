import * as React from 'react';
import GlobalLoading from './GlobalLoading';

export const withSuspense = (ui: React.ReactElement) => {
  const Wrapper = ({ children }: React.PropsWithChildren<{}>): JSX.Element => (
    <React.Suspense fallback={<div>loading...</div>}>
      {children}
    </React.Suspense>
  );
  return <Wrapper>{ui}</Wrapper>;
};
