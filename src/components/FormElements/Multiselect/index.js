import React from 'react';
import { Multiselect } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';

import 'react-widgets/dist/css/react-widgets.css';

Moment.locale('en');
momentLocalizer();

export default ({ input, data, valueField, textField, placeholder, label, meta: { touched, error, warning } }) => (
      <fieldset className={`form-group ${ (touched && error) ? 'has-error' : '' }`}> 
        <label>{label}</label> 
        <Multiselect 
          {...input}
          onBlur={() => input.onBlur()}
          value={input.value || []} // requires value to be an array
          data={data}
          valueField={valueField}
          textField={textField}
          placeholder={placeholder}
      />
        {touched && ((error && <span className='error'>{error}</span>) || (warning && <span className='error'>{warning}</span>))} 
      </fieldset>
);
