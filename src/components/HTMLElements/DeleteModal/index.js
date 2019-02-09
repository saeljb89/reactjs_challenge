import React from 'react';
import Modal from 'react-responsive-modal';

export default ( props ) => {

  const { label, onConfirm, onToggle, opened } = props;

  return (
    <Modal closeOnEsc={false}
           little
           modalClassName="col-md-4"
           onClose={onToggle}
           open={opened}
           showCloseIcon={false}
    >
      <div className="text-center">
        <i className="fa fa-warning text-large color-warning"/>
        <h5>{label || 'Are you sure?'}</h5>
      </div>
      <hr/>
      <div className="text-right">
        <button className="btn btn-danger mr-3" onClick={onConfirm}>Yes</button>
        <button className="btn btn-outline-secondary" onClick={onToggle}>Cancel</button>
      </div>
    </Modal>
  );
}

