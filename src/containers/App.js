import React, {Component} from 'react';
import {connect} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Route, Switch} from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import {ToastContainer, toast} from 'react-toastify';
import IdleTimer from 'react-idle-timer';

import MainApp from './../routes/app';
import Login from './../routes/login';
import {toggleAlertError, logoutUser} from './../store/actions';
import APPCONFIG from './../constants/Config';

import './../styles/font-awesome/font-awesome.css';
import './../styles/bootstrap.scss';
import './../styles/layout.scss';
import './../styles/theme.scss';
import './../styles/ui.scss';
import 'react-toastify/dist/ReactToastify.min.css';

import lightTheme from './themes/lightTheme';

class App extends Component {
  componentWillReceiveProps( nextProps ) {
    if( nextProps.errorMessage && this.props.errorMessage !== nextProps.errorMessage ) {
      toast(
        <div dangerouslySetInnerHTML={{ __html: nextProps.errorMessage }}/>, {
          onClose: ( props ) => this.props.toggleAlertError( '' )
        } )
    }
  }

  render() {
    const { isLoading, user } = this.props;

    return (
      <IdleTimer
        idleAction={() => {if( user.access_token ) this.props.logoutUser()}}
        timeout={APPCONFIG.idleTimeout}
      >
       <MuiThemeProvider muiTheme={getMuiTheme( lightTheme )}>
          <div id="app-inner">
            <div className="full-height fixed-header">

              {isLoading ?
                <div className="app-loading">
                  <CircularProgress size={60} thickness={7}/>
                </div> : null
              }

              <ToastContainer
                position={toast.POSITION.TOP_RIGHT}
                toastClassName="dark-toast"
                progressClassName="transparent-progress"
                autoClose={5000}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
              />

              <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/" component={user.access_token ? MainApp : Login}/>
              </Switch>
            </div>
          </div>
        </MuiThemeProvider>
      </IdleTimer>
    );
  }
}

const mapStateToProps = ( state ) => ({
  isLoading: state.settings.isLoading,
  errorMessage: state.settings.errorMessage,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => {
    dispatch( logoutUser() );
  },
  toggleAlertError: ( message ) => {
    dispatch( toggleAlertError( message ) );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
