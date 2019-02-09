import React, {Component} from 'react';
import classnames from 'classnames';
import {Select, FormGroup} from './../../../FormElements';
import _ from 'lodash';

export default class ReactTablePagination extends Component {
  constructor( props ) {
    super();

    this.getSafePage = this.getSafePage.bind( this );
    this.changePage = this.changePage.bind( this );
    this.applyPage = this.applyPage.bind( this );

    this.state = {
      page: props.page,
    }
  }

  componentWillReceiveProps( nextProps ) {
    this.setState( { page: nextProps.page } )
  }

  getSafePage( page ) {
    if( isNaN( page ) ) {
      page = this.props.page
    }
    return Math.min( Math.max( page, 0 ), this.props.pages - 1 )
  }

  changePage( page ) {
    page = this.getSafePage( page );
    this.setState( { page } );
    if( this.props.page !== page ) {
      this.props.onPageChange( page )
    }
  }

  applyPage( e ) {
    e && e.preventDefault();
    const page = this.state.page;
    this.changePage( page === '' ? this.props.page : page )
  }

  render() {
    let {
      // Computed
      pages,
      // Props
      page,
      data,
      total,
      showPageSizeOptions,
      pageSizeOptions,
      pageSize,
      showPageJump,
      canPrevious,
      canNext,
      onPageSizeChange,
      className,
    } = this.props;

    pageSizeOptions = _.map( pageSizeOptions, ( item ) => {
      return { id: item, name: item }
    } );

    return (
      <div className={classnames( className, '-pagination' )}>
        <span className='-pageInfo'>
          <span className="text-muted text-small">{this.props.pageText}</span>
          <h5 className="d-inline m-0">
          <i className={classnames( 'fa fa-angle-left p-2 pointer', {
            'color-app-pink': canPrevious
          } )}
             onClick={e => {
               if( !canPrevious ) return;
               this.changePage( page - 1 )
             }}
             disabled={!canPrevious}
          />
          </h5>
          {showPageJump
            ? <div className='-pageJump'>
              <input
                type={this.state.page === '' ? 'text' : 'number'}
                onChange={e => {
                  const val = e.target.value;
                  const page = val - 1;
                  if( val === '' ) {
                    return this.setState( { page: val } )
                  }
                  this.setState( { page: this.getSafePage( page ) } )
                }}
                value={this.state.page === '' ? '' : this.state.page + 1}
                onBlur={this.applyPage}
                onKeyPress={e => {
                  if( e.which === 13 || e.keyCode === 13 ) {
                    this.applyPage()
                  }
                }}
              />
            </div>
            : <span className='-currentPage'>
                {page + 1}
              </span>
          }
          <h5 className="d-inline m-0">
            <i className={classnames( 'fa fa-angle-right p-2 pointer', {
              'color-app-pink': canNext
            } )}
               onClick={e => {
                 if( !canNext ) return;
                 this.changePage( page + 1 )
               }}
            />
          </h5>

          <span className="text-muted text-small">{this.props.ofText}{' '}
            <span className='-totalPages'>{pages || 1}</span>
          </span>
        </span>

        <div className="pull-right">
          {showPageSizeOptions &&
          <div className="d-inline border-right border-secondary pr-2 mr-2">
            <FormGroup containerClass="d-inline-flex">
              <Select
                clearable={false}
                onChange={onPageSizeChange}
                options={pageSizeOptions}
                searchable={false}
                value={pageSize}
              />
            </FormGroup>
            {' '}<span className="text-small text-muted">{this.props.rowsText}</span>
          </div>}
        </div>
      </div>
    )
  }
}