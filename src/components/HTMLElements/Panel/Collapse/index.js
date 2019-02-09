import React from 'react';
import _ from 'lodash';

class CollapsePanel extends React.Component {
  constructor() {
    super();

    this.state = {
      opened: true
    };

    this.toggleOpened = this.toggleOpened.bind( this );
  }

  componentWillMount() {
    if( !_.isUndefined( this.props.opened ) && this.props.opened !== this.state.opened ) {
      this.setState( { opened: this.props.opened } )
    }
  }

  /**
   * Toggle opened state
   */
  toggleOpened() {
    this.setState( { opened: !this.state.opened } );
  }

  render() {
    const { bodyClass, centerContent, children, iconClass, rightHeaderContent, titleContent } = this.props;

    return (
      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between">
          <div className="d-inline-flex align-items-center pointer" onClick={this.toggleOpened}>
            <i className={`material-icons mr-2 ${iconClass}`}>
              {this.state.opened ? 'remove_circle_outline' : 'add_circle_outline'}
            </i>
            {_.isFunction( titleContent ) ? titleContent() : titleContent}
          </div>

          {centerContent &&
          <div className="w-50">
            {_.isFunction( centerContent ) ? centerContent() : centerContent}
          </div>}

          {rightHeaderContent && _.isFunction( rightHeaderContent ) ? rightHeaderContent() : rightHeaderContent}
        </div>
        {this.state.opened &&
        <div className={`card-body ${bodyClass}`}>
          {children}
        </div>
        }
      </div>
    )
  }
}

module.exports = CollapsePanel;
