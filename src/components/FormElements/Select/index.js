import React from 'react';
import {FormInput} from 'react-form';
import Select from 'react-select';

import 'react-select/dist/react-select.css';

export default ( { field, ...rest } ) => {
  return (
    field ?
      <FormInput field={field}>
        {( { setValue, getValue, setTouched } ) => {
          return (
            <Select
              simpleValue={true}
              searchable={true}
              labelKey="name"
              valueKey="id"
              {...rest}
              value={getValue()}
              onChange={val => {
                if( val !== getValue() ) {
                  setValue( val );
                  if( rest.onChange ) rest.onChange( val )
                }
              }}
              onBlur={() => setTouched()}
            />
          )
        }}
      </FormInput>
      :
      <Select
        simpleValue={true}
        searchable={true}
        labelKey="name"
        valueKey="id"
        {...rest}
        onChange={val => {
          if( rest.onChange ) rest.onChange( val )
        }}
      />
  )
}
