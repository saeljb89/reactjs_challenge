import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import dateformat from 'dateformat';

import AsyncTable from './../../../../../components/HTMLElements/Table/AsyncTable';
import DeleteModal from './../../../../../components/HTMLElements/DeleteModal';
import {toggleAlertError, toggleLoading} from './../../../../../store/actions';
import PostService from './../../../../../services/PostService';
import DetailModal from '../../../../../components/HTMLElements/DetailModal';

class PostList extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      data: [],
      deleteModalOpened: false,
      modalShow: false,
      selectedPost: null,
      params: null
    };

    this.deleteEntity = this.deleteEntity.bind( this );
    this.getData = this.getData.bind( this );
    this.toggleDeleteModal = this.toggleDeleteModal.bind( this );
    this.handleClose = this.handleClose.bind( this );
    this.handleDetail = this.handleDetail.bind( this );
    this.filterAll = this.filterAll.bind( this );
  }

  deleteEntity() {
    this.props.toggleLoading( true );
  
    PostService.deletePost( this.entityToDelete ).then( ( response ) => {
      if( response.errors ) {
        this.props.toggleLoading( false );
        return this.props.toggleAlertError( response.errors );
      }
  
      this.toggleDeleteModal();
      this.getData( this.params )
    } )
  }

  filterAll(e) {
    const { value } = e.target;
    const { params } = this.state;
    this.getData( params, value );
  }

  getData( params, filter = '' ) {
    const { isLoading, toggleLoading } = this.props;
    this.params = params;
  
    if( !isLoading ) toggleLoading( true );
  
    const apiParams = {
      limit: params.pageSize,
      offset: (params.page * params.pageSize) + 1,
    };
    if( params.sorted.length ) apiParams[`order_by[${params.sorted[0].id}]`] = params.sorted[0].desc ? 'DESC' : 'ASC';
    if( filter.length ) apiParams['filters[criteria]'] = filter;

    PostService.getPosts( apiParams ).then( ( response ) => {
      toggleLoading( false );
  
      if( response.data ) {
        this.setState( {
          data: response.data.data || [],
          pages: Math.ceil( response.data.total / params.pageSize ),
          total: response.data.total,
          params
        } );
      }
    } )
  }

  toggleDeleteModal( entityId ) {
    this.entityToDelete = entityId;
    this.setState( { deleteModalOpened: !this.state.deleteModalOpened } )
  };

  handleClose() {
    this.setState({ modalShow: false, selectedPost: null });
  }

  handleDetail( props ) {
    this.setState({modalShow: true, selectedPost: props})
  }

  render() {
    const { selectedPost } = this.state;

    const body = () => {
      return (
        <>
            <div className='row'>
              <div className='col-md-6'>
                <p>
                  <strong>Category: </strong> { selectedPost && selectedPost.category }
                </p>
              </div>
              <div className='col-md-6'>
                <p>
                  <strong>Public: </strong> { selectedPost && (selectedPost.public ? <i className='fa fa-check'/> : <i className='fa fa-close'/>) }
                </p>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <p>
                  <strong>Date expiration: </strong> { selectedPost && dateformat(selectedPost.date_expiration, 'dd-mm-yyyy')  }
                </p>
              </div>
              <div className='col-md-6'>
                <p>
                  <strong>Extension: </strong> { selectedPost && selectedPost.extension }
                </p>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <p>
                  <strong>Classification by ages: </strong>
                  {
                    selectedPost ? 
                    selectedPost.classifications.map( classification => <li key={classification.id}>{classification.name}</li> )
                    : '--'
                  }
                </p>
              </div>
            </div>
            
            
            <div className='row'>
              <div className='col-md-12'>
                <p>
                  <strong>Text: </strong> { selectedPost && selectedPost.text }
                </p>
              </div>
            </div>
        </>
      )
    }

    return (
      <div className='box box-default'>
      <div className='box-header d-flex justify-content-between'>
        <span className='text-capitalize'>Post list</span>
        <Link to={`/posts/new`}>
          <button className='btn btn-info'>Add post</button>
        </Link>
      </div>
      <div className='box-body'>
        <div className="mb-2">
               Search: <input value={this.state.filterAll} onChange={this.filterAll} className="" />
        </div>

        <AsyncTable className='app-table-white'
                    onFetchData={this.getData}
                    rowsText='Posts'
                    {...this.state}
                    columns={[
                      { Header: 'Id', accessor: 'id' },
                      {
                        Header: 'Title', accessor: 'title',  Cell: ( props ) =>
                        (
                          <a href='#' onClick={() => this.handleDetail(props.original)}>{props.value}</a>
                        )
                      },
                      { Header: 'Category', accessor: 'category' },
                      {
                        Header: 'Public', accessor: 'public', Cell: ( props ) =>
                        props.value ? <i className='fa fa-check'/> : <i className='fa fa-close'/>
                      },
                      {
                        Header: '', accessor: 'id', maxWidth: 100,
                        Cell: props =>
                          <div>
                            <Link to={`/posts/edit/${props.value}`}>
                              <button className='btn btn-outline-info btn-sm mr-2'>
                                <i className='fa fa-edit'/>
                              </button>
                            </Link>
                            <button className='btn btn-outline-danger btn-sm'
                                    onClick={() => this.toggleDeleteModal( props.value )}>
                              <i className='fa fa-trash'/>
                            </button>
                          </div>
                      },
                    ]}
        />
      </div>

      <DetailModal modalShow={this.state.modalShow} 
                   handleClose={this.handleClose}
                   title={selectedPost && selectedPost.title}
                   body={body()}
      />

       <DeleteModal onConfirm={this.deleteEntity}
                    opened={this.state.deleteModalOpened}
                    onToggle={this.toggleDeleteModal}
       />
     </div>
    )
  }
}

const mapStateToProps = ( state ) => ({
  isLoading: state.settings.isLoading
});

const mapDispatchToProps = dispatch => ({
  toggleAlertError: ( message ) => {
    dispatch( toggleAlertError( message ) );
  },
  toggleLoading: ( isLoading ) => {
    dispatch( toggleLoading( isLoading ) );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( PostList );