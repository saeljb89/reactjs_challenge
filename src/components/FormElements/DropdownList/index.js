import React from 'react';
import { DropdownList } from 'react-widgets';

export default ({ input, data, valueField, textField, placeholder, label, meta: { touched, error, warning } }) => (
    <fieldset className={`form-group ${ (touched && error) ? 'has-error' : '' }`}> 
      <label>{label}</label> 
      <DropdownList 
        {...input}
        onBlur={() => input.onBlur()}
        data={data}
        valueField={valueField}
        textField={textField}
        placeholder={placeholder}
      />
      {touched && ((error && <span className='error'>{error}</span>) || (warning && <span className='error'>{warning}</span>))} 
   </fieldset> 
);
