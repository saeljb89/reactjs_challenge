import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default ( props ) => {
  const { modalShow, handleClose, title, body } = props;

  return (
    <Modal show={modalShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <button className='btn btn-default px-4' onClick={handleClose}>Close</button>
      </Modal.Footer>
    </Modal>
  );
}