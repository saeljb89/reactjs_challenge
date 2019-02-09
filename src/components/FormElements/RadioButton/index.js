import React from 'react';
import _ from 'lodash';
import { Field } from 'redux-form';

export default ( { label, name, field, options } ) => (
    <fieldset className="form-group">
      <label>{label}</label>
      {_.map( options, ( option ) =>
      <div className="form-check" key={option.id}>
        <label className="form-check-label">
          <Field
            name={name}
            component="input"
            type="radio"
            value={option.id}
          />
          {' '}
          {option.name}
        </label>
      </div>
      )}
    </fieldset>
);
