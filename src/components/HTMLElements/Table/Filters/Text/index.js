import React from 'react'

import {Text} from 'components/FormElements/'

export default ( { filter, onChange, ...props } ) => {
  return (
    <Text className="form-control"
          onChange={onChange}
          value={filter && filter.value}
          {...props}
    />
  )
}
