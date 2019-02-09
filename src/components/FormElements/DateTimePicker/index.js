import React from 'react';
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';

import 'react-widgets/dist/css/react-widgets.css';

Moment.locale('en');
momentLocalizer();

export default ( { input: { onChange, value }, label, placeholder, showTime, min, 
  meta: { touched, error, warning } } ) => (
    <fieldset className={`form-group ${ (touched && error) ? 'has-error' : '' }`}> 
        <label>{label}</label>
        <DateTimePicker
         onChange={onChange}
         format='DD/MM/YYYY'
         time={showTime}
         value={!value ? null : new Date(value)}
         placeholder={placeholder}
         min={min}
         /> 
        {touched && ((error && <span className='error'>{error}</span>) || (warning && <span className='error'>{warning}</span>))} 
    </fieldset> 
  );
  