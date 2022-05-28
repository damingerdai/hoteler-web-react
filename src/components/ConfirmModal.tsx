import React from 'react';
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

interface ConfirmModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  closeText?: string;
  confirmText?: string;
  onClose: (confirm: boolean) => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  description,
  closeText,
  confirmText,
  isOpen,
  onClose,
}) => {
  const handleClose = (confirm = false) => {
    onClose(confirm);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>{description}</Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={() => handleClose(false)}>
            {closeText ?? '关闭'}
          </Button>
          <Button variant='ghost' onClick={() => handleClose(true)}>
            {confirmText ?? '确定'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
