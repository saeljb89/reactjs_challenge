import React from 'react';
import _ from 'lodash';

import {Checkbox, CheckboxGroup} from 'components/FormElements/';

export default ( { btnLabel, rightLabel, selectedProducts, setValue, options } ) => {

  /**
   * Check if all products are selected
   */
  function checkAllSelected( isSelected ) {
    const products = isSelected ? selectedProducts.length + 1 : selectedProducts.length - 1;
    setValue( 'allProductsSelected', products === options.length )
  }

  /**
   * Select/Deselect all products in dropdown
   * @param {int}       isSelected    index in the product array
   */
  function toggleAllProducts( isSelected ) {
    const products = isSelected ? options : [];
    setValue( 'products', products )
  }

  return (
    <div className="dropdown">
      <button type="button" className="btn btn-outline-white">
        <span className="badge badge-dark badge-pill mx-2">{selectedProducts.length}</span>
        <span className="text-uppercase">{btnLabel}</span>
      </button>
      <div className="dropdown-menu p-0">
        <div className="border-secondary border-bottom py-1">
          <Checkbox field="allProductsSelected"
                    label="<span class='text-small'>Select all</span>"
                    rounded
                    onClick={( e ) => toggleAllProducts( e.target.checked )}
          />
        </div>
        <CheckboxGroup className="border-secondary border-bottom py-1"
                       field="products"
                       options={_.map( options, ( option ) => {
                         return {
                           id: option.id,
                           name: `
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class='text-small ws-normal'>${option.name}</span>
                                    ${rightLabel === false ? '' :
                             `<span class="text-muted text-extra-small pr-2 ml-5">${option.related_marketing_claims_count} Claim Attached</span>`
                             }
                                </div>
                               `
                         }
                       } )}
                       onClick={( e ) => checkAllSelected( e.target.checked )}
                       rounded
        />
      </div>
    </div>
  );
}
