import React from 'react';
import classNames from 'classnames';

export default ( props ) => {
  return (
    <div className={classNames( props.containerClass )}>
      <div className={classNames( 'form-group', props.className )}>
        {props.children}
      </div>
    </div>
  )
}