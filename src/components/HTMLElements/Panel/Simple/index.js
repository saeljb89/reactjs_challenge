import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

export default ( { className, contentClassName, children, rightHeaderContent, titleContent } ) => {

  return (
    <div className={classNames('card', className)}>
      {(titleContent || rightHeaderContent) &&
      <div className="card-header">
        {_.isFunction( titleContent ) ? titleContent() : titleContent}

        {rightHeaderContent &&
        <div className="float-right">
          {_.isFunction( rightHeaderContent ) ? rightHeaderContent() : rightHeaderContent}
        </div>
        }
      </div>
      }
      <div className={classNames('card-body', contentClassName)}>
        {children}
      </div>
    </div>
  );
}
