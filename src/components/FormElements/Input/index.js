import React from 'react';

export default ({ input, label, placeholder, type, meta: { touched, error, warning } }) => (
    <fieldset className={`form-group ${ (touched && error) ? 'has-error' : '' }`}> 
        <label>{label}</label> 
        <input className="form-control" {...input} type={type} placeholder={placeholder} /> 
        {touched && ((error && <span className='error'>{error}</span>) || (warning && <span className='error'>{warning}</span>))} 
    </fieldset> 
);
