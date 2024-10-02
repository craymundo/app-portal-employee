// src/components/AlertModal.tsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface AlertModalProps {
  show: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  cancelText?: string;
  confirmText?: string;
}

const AlertModal: React.FC<AlertModalProps> = ({
  show,
  title,
  message,
  onClose,
  onConfirm,
  cancelText = 'Cancelar',
  confirmText,
}) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {cancelText}
        </Button>
        {confirmText && onConfirm && (
          <Button variant="danger" onClick={onConfirm}>
            {confirmText}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AlertModal;
