import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import FlatButton from 'material-ui/FlatButton/FlatButton';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {logoutUser} from './../../../../../store/actions';

const HeaderIconButtonStyle = {
  width: '60px',
  height: '60px'
};

const HeaderButtonStyle = {
  height: 60, color: 'white'
};

class Header extends React.Component {

  getHeaderActiveBackground( url ) {
    if( url !== '/' )
      return this.props.location.pathname.indexOf( url ) !== -1 ? "rgba(153,153,153,0.4)" : null;
    else
      return this.props.location.pathname === url ? "rgba(153,153,153,0.4)" : null;
  }

  render() {
    console.log(this.props);
    return (
      <section className="app-header">
        <div className="app-header-inner bg-color-purple">
          <div className="brand d-flex align-items-center full-height">
            <Link to="/">
               <strong><h5>Reactjs Challenge</h5></strong>
            </Link>
          </div>
          <div className="top-nav-left full-height">
            <ul className="list-unstyled list-inline d-flex align-items-center full-height">
              <li className="list-inline-item pointer">
                <FlatButton style={HeaderButtonStyle}
                            label="Posts"
                            backgroundColor={ this.getHeaderActiveBackground( '/posts' )}
                            onClick={() => {this.props.history.push( '/posts' )}}/>
              </li>
            </ul>
          </div>
          <div className="top-nav-right">
            <ul className="list-unstyled list-inline">
              <li>
                <IconMenu
                  iconButtonElement={
                    <IconButton style={HeaderIconButtonStyle}>
                      <img src=" assets/images/icons/user.png" className="rounded-circle img30_30" alt=''/>
                    </IconButton>}
                  onChange={this.handleChange}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                  menuStyle={{ minWidth: '150px' }}
                >
                <MenuItem
                    onClick={() => {
                      this.props.logoutUser();
                      this.props.history.push( '/login' )
                    }}
                    primaryText="Log Out"
                    style={{ fontSize: '14px' }}
                    leftIcon={<i className="material-icons">forward</i>}
                  />
                 </IconMenu>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logoutUser: () => {
    dispatch( logoutUser() );
  },
});

export default withRouter( connect(
  null,
  mapDispatchToProps
)( Header ) );
