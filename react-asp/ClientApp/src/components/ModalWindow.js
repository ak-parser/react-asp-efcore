import React from "react";
import { Modal } from 'react-bootstrap';

export function ModalWindow(props) {
  return (
    <Modal size="sm" centered autoFocus {...props}>
      <Modal.Header closeButton>
        <Modal.Title>{props.header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.children}
      </Modal.Body>
      <Modal.Footer>{props.footer}</Modal.Footer>
    </Modal>
  );
}