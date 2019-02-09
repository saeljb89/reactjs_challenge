import axios from 'axios';

const baseEndpoint = 'v1.0/users';

const UserService = {

  deleteUser( id ) {
    return axios
      .delete( `${baseEndpoint}/${id}` )
  },

  getUsers( params ) {
    return axios
      .get( baseEndpoint, { params } )
  },

  getUser( id ) {
    return axios
      .get( `${baseEndpoint}/${id}` )
  },

  getUserSettings( id ) {
    return axios
      .get( `${baseEndpoint}/${id}/settings` )
  },

  saveUser( data ) {
    return axios
      .post( baseEndpoint, data )
  },

  updateUser( id, data ) {
    return axios
      .put( `${baseEndpoint}/${id}`, data )
  },

  updateUserSettings( id, data ) {
    return axios
      .put( `${baseEndpoint}/${id}/settings`, data )
  },
};

export default UserService;
