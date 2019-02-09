import axios from 'axios';

const baseEndpoint = 'v1.0/classifications';

const ClassificationService = {

  deleteClassification( id ) {
    return axios
      .delete( `${baseEndpoint}/${id}` )
  },

  getClassifications( params ) {
    return axios
      .get( baseEndpoint, { params } )
  },

  getClassification( id ) {
    return axios
      .get( `${baseEndpoint}/${id}` )
  },

  saveClassification( data ) {
    return axios
      .post( baseEndpoint, data )
  },

  updateClassification( id, data ) {
    return axios
      .put( `${baseEndpoint}/${id}`, data )
  },
};

export default ClassificationService;
