import axios from 'axios';

const baseEndpoint = 'v1.0/posts';

const PostService = {

  deletePost( id ) {
    return axios
      .delete( `${baseEndpoint}/${id}` )
  },

  getPosts( params ) {
    return axios
      .get( baseEndpoint, { params } )
  },

  getPost( id ) {
    return axios
      .get( `${baseEndpoint}/${id}` )
  },

  savePost( data ) {
    return axios
      .post( baseEndpoint, data )
  },

  updatePost( id, data ) {
    return axios
      .put( `${baseEndpoint}/${id}`, data )
  },
};

export default PostService;
