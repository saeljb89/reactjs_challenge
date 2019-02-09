import axios from 'axios';
import _ from 'lodash';

import APPCONFIG from './../constants/Config';

const AuthService = {
    
  /**
   * Intercept request
   */
  interceptorRequest() {
    axios.interceptors.request.use(
      function( config ) {
        if( config.url.indexOf( 'ReporterServlet' ) === -1 )
          config.url = `${APPCONFIG.apiUrl}${config.url}`;

        const state = JSON.parse( localStorage.getItem( 'reactjs-challenge' ) );
        const token = _.get( state, 'user.access_token' );
        if( token && config.url.indexOf( 'ReporterServlet' ) === -1 ) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      function( error ) {
        return Promise.reject( error );
      } );
  },

  /**
   * Intercept response
   */
  interceptResponse() {
    return axios.interceptors.response.use( response => {
      return response;
    }, error => {
      let response = error.response;

      if( response.status === 401 ) {
        window.location.replace( `${window.location.origin}/#/login` );
      }
      else {
        let errors = _.get( response, 'data.detail', null );
        errors = _.get( response, 'data.message', errors );
        errors = _.get( response, 'data.error_description', errors );

        if( _.isObject( errors ) && !_.isArray( errors ) ) {
          errors = _.toArray( errors )
        }

        if( _.isArray( errors ) && !_.isString( errors[0] ) ) {
          errors = _
            .chain( errors )
            .map( error => {
              return _.flattenDeep( _.values( error ) )
            } )
            .flattenDeep()
            .value();
        }

        let status = response ? response.status : null;

        if( !errors ) {
          // This error with exactly this message is created by Axios when a network error occurs. Show a
          // meaningful message to the user.
          if( error.message === 'Network Error' ) {
            errors = 'Could not connect to the server (network error).';
          } else {
            errors = error.message;
          }
        }

        return { status, errors: _.isArray( errors ) ? errors.join( '<br/>' ) : errors }
      }
    } );
  },

  /**
   * Login user
   * @param {object}  credentials   user credentials
   */
  login( credentials ) {
    return axios
      .post( 'oauth/v2/token', {
        username: credentials.username,
        password: credentials.password,
        client_id: APPCONFIG.clientId,
        client_secret: APPCONFIG.clientSecret,
        grant_type: 'password'
      } )
      .then( response => {
        return response
      } )
  }
};

export default AuthService;
