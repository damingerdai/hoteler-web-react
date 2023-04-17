import { Box } from '@chakra-ui/react';
import * as React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();
  console.error(error);
  // Uncaught ReferenceError: path is not defined
  return (
    <Box>
      error:
      {JSON.stringify(error, null, 2)}
    </Box>
  );
};

export default ErrorBoundary;
