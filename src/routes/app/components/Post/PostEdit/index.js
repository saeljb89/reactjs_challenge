import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import async from 'async';

import PostService from './../../../../../services/PostService';
import Classification from '../../../../../services/ClassificationService';
import {toggleLoading, toggleAlertError} from './../../../../../store/actions';
import PostForm from './PostForm';

class PostEdit extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      data: {extension: 'short'}
    };

    this.entityId = props.match.params.id;
    this.getData = this.getData.bind( this );
    this.submitForm = this.submitForm.bind( this );
    this.handleOnBack = this.handleOnBack.bind( this );
  }

  componentDidMount() {
    this.getData();
  }

  handleOnBack() {
    this.props.history.goBack();
}

  getData() {
    this.props.toggleLoading( true );

    if(this.entityId) {
      async.parallel( {
        allClassifications: this.getClassifications,
        data: this.getPost.bind( this )
      }, ( error, results ) => {
        this.props.toggleLoading( false );
  
        if( !error ) {
          this.setState( results )
        }
      } )
    }
    else
      {
        async.parallel( {
          allClassifications: this.getClassifications
        }, ( error, results ) => {
          this.props.toggleLoading( false );    
    
          if( !error ) {
            this.setState( results )
          }
        } )
      }
  }

  getClassifications( cb ) {
    Classification.getClassifications()
      .then( ( response ) => cb( response.errors, response.data ? response.data.data : [] ) );
  }

  getPost( cb ) {
    PostService.getPost( this.entityId )
      .then( ( response ) => cb( response.errors, response.data ? response.data : {extension: 'short'} ) );
  }

  submitForm( data ) {
    const { history, toggleAlertError, toggleLoading } = this.props;
    this.formData = _.cloneDeep( data );
  
    toggleLoading( true );

    const classifications = data.classifications.map( classification => classification.id );
    data.classifications = classifications;
    data.category = data.category ? data.category.id : '';

    const promise = this.entityId ? PostService.updatePost( this.entityId, data ) :
      PostService.savePost( data );
    
    promise.then( ( response ) => {
      toggleLoading( false );
      if( response.errors ) return toggleAlertError( response.errors );

      return history.push( `/posts` )
    } )
  }

  render() {
    const { data, allClassifications } = this.state;

    return (
      <div className="box box-default">
        <div className="box-header text-capitalize">{this.entityId ? 'Edit' : 'New'}  Post</div>
        <div className="box-body">
          <PostForm onSubmit={this.submitForm} initialValues={this.formData || data}
          onBack={this.handleOnBack} allClassifications={allClassifications} />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  toggleAlertError: ( message ) => {
    dispatch( toggleAlertError( message ) );
  },
  toggleLoading: ( isLoading ) => {
    dispatch( toggleLoading( isLoading ) );
  },
});

export default connect(
  null,
  mapDispatchToProps
)( PostEdit );
