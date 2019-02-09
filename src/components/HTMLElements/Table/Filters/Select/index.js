import React from 'react'

import {Select, FormGroup} from 'components/FormElements/'

export default ( { filter, onChange, ...props } ) => {
  return (
    <FormGroup className="m-0">
      <Select className="form-control"
              multi
              onChange={onChange}
              simpleValue={false}
              value={filter && filter.value}
              {...props}
      />
    </FormGroup>
  )
}
