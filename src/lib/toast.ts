import { createStandaloneToast, ToastPositionWithLogical } from '@chakra-ui/react';

const toastInstance = createStandaloneToast();

export const toast = {

  error: (title: string, description: string, position: ToastPositionWithLogical = 'top-right') => {
    toastInstance({
      title,
      description,
      position,
      status: 'error',
      duration: 9000,
      isClosable: true,
    });
  },
};
