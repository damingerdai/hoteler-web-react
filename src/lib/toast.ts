import { ToastPosition } from '@chakra-ui/react';
import { toastInstance } from '../components/Toast';

export const toast = {

  error: (title: string, description: string, position: ToastPosition = 'top-right') => {
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
