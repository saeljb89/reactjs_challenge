import React from 'react';
import Dropzone from 'react-dropzone';

export default ( { className, onDrop, ...props } ) => {

  return (
    <Dropzone
      className={`dropzone pointer ${className}`}
      accept="image/*"
      onDrop={onDrop}
    >
      {props.children}
    </Dropzone>
  );
}
