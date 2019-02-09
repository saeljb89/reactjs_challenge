import React from 'react';

export default ({ input, label, placeholder, rows, meta: { touched, error, warning } }) => (
    <fieldset className={`form-group ${ (touched && error) ? 'has-error' : '' }`}> 
        <label>{label}</label> 
        <textarea className="form-control" {...input} placeholder={placeholder} rows={ rows ? rows : 4} /> 
        {touched && ((error && <span className='error'>{error}</span>) || (warning && <span className='error'>{warning}</span>))} 
    </fieldset> 
);
