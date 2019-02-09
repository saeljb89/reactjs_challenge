import React from 'react';
import {connect} from 'react-redux';
import async from 'async';
import Paper from '@material-ui/core/Paper';

import AuthService from './../../services/AuthService';
import UserService from './../../services/UserService';
import {loginUser, logoutUser, toggleAlertError, toggleLoading} from './../../store/actions/';
import LoginForm from './components/LoginForm';

class Login extends React.Component {
  constructor() {
    super();

    this.submitForm = this.submitForm.bind( this );
  }

  componentDidMount() {
    if( this.props.accessToken ) {
      this.props.logoutUser();
    }
    if( this.props.isLoading ) {
      this.props.toggleLoading( false );
    }
  }

  submitForm( credentials ) {
    this.props.toggleLoading( true );

    async.waterfall( [
      this.loginUser.bind( this, credentials ),
      this.getCurrentUser
    ], ( error, results ) => {
      this.props.toggleLoading( false );
      if( error ) return this.props.toggleAlertError( error );

      this.props.loginUser( results );
      return this.props.history.push( '/posts' );
    } );
  };

  loginUser( credentials, cb ) {
    AuthService.login( credentials ).then( ( response ) => {
      if( response.errors ) return cb( response.errors );

      localStorage.setItem( 'reactjs-challenge', JSON.stringify( { user: response.data } ) );
      return cb( null, response.data )
    } )
  }

  getCurrentUser( loginData, cb ) {
    UserService.getUsers( { me: true } ).then( ( response ) => {
      if( response.errors ) return cb( response.errors );
      if( !response.data.roles || !response.data.roles.length || !response.data.roles[0] )
        return cb( 'This user can not access to the application' );

      const { roles } = response.data;
      return cb( null, {
        roles, ...loginData
      } )
    } )
  }

  render() {
    return (
        <Paper elevation={20}>
          <div className='form-page__wrapper'>
            <div className='form-page__form-wrapper'>
              <div className='form-page__form-header'>
                <h4 className='form-page__form-heading'>Reactjs Challenge</h4>
              </div>
                <LoginForm onSubmit={this.submitForm} />
            </div>
          </div>
        </Paper>
    );
  }
}

const mapStateToProps = ( state, ownProps ) => ({
  accessToken: state.user.access_token,
  isLoading: state.settings.isLoading,
});

const mapDispatchToProps = dispatch => ({
  loginUser: ( user ) => {
    dispatch( loginUser( user ) );
  },
  logoutUser: () => {
    dispatch( logoutUser() );
  },
  toggleLoading: ( isLoading ) => {
    dispatch( toggleLoading( isLoading ) );
  },
  toggleAlertError: ( message ) => {
    dispatch( toggleAlertError( message ) );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Login );
