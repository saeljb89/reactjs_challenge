import React from 'react';
import ReactTable from './react-table';
import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';

import TablePagination from './../Pagination';
import config from './../../../../constants/Config';

import 'react-table/react-table.css';

class AsyncTable extends React.Component {
  constructor() {
    super();

    this.getData = this.getData.bind( this );
  }

  getData( params ) {
    if( _.isFunction( this.props.onSaveState ) ) {
      this.props.onSaveState( {
        defaultSorted: params.sorted,
        defaultPageSize: params.pageSize,
        defaultFiltered: params.filtered,
        defaultPage: params.page,
      } )
    }

    this.props.onFetchData( params )
  }

  render() {
    const { className, showPageSizeOptions, ...rest } = this.props;

    return (
      <ReactTable className={`app-table -highlight -striped ${className}`}
                  defaultPageSize={10}
                  manual
                  minRows={rest.data.length}
                  pageSizeOptions={[10, 20, 30]}
                  resizable={false}
                  showPaginationBottom={false}
                  showPaginationTop
                  getTheadFilterThProps={() => {
                    return { style: { position: "inherit", overflow: "inherit" } }
                  }}
                  showPageSizeOptions={_.isUndefined( showPageSizeOptions ) ? true : false}
                  getTrProps={() => {
                    return {
                      className: 'pointer'
                    };
                  }}
                  PaginationComponent={( props ) =>
                    <TablePagination {...props} className="bg-app-gray"/>
                  }
                  LoadingComponent={( props ) => {
                    return (
                      props.loading &&
                      <div className="-loading -active">
                        <div className="-loading-inner">
                          <CircularProgress size={50} thickness={7} color={config.color.appDarkGray}/>
                        </div>
                      </div>
                    )
                  }}
                  {...rest}
                  onFetchData={this.getData}
      />
    )
  }
}

export default AsyncTable;
