import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

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
    return (
      <div>
        <div className={classNames( 'box m-0', {
          'bg-app-dark-gray': this.props.theme === 'default'
        } )}>
          <div className="box-header pointer font-weight-normal">
            <div className="d-inline-flex align-items-center" onClick={this.toggleOpened}>
              <i className="material-icons mr-2">
                {this.state.opened ? 'remove_circle_outline' : 'add_circle_outline'}
              </i>
              {_.isFunction(this.props.titleContent) ? this.props.titleContent() : this.props.titleContent}
            </div>
            {this.props.rightHeaderContent ?
              <div className="float-right">
                {this.props.rightHeaderContent()}
              </div> :
              null
            }
          </div>
          {this.state.opened ?
            <div className="box-body bg-color-white p-0">
              {this.props.children}
            </div>
            : null
          }
        </div>
      </div>
    )
      ;
  }
}

module.exports = CollapsePanel;
