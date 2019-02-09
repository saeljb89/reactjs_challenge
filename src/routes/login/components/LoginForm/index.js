import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Input } from "../../../../components/FormElements";
import {required} from "../../../../constants/validation";

const LoginForm = ({ handleSubmit, submitting } ) => {
    return (
      <form onSubmit={handleSubmit} className='global-form'>
          <div>
              <Field
              name="username"
              type="text"
              placeholder="Username"
              validate={required}
              component={Input}
              />
          </div>
          <div>
              <Field
              name="password"
              type="password"
              placeholder="Password"
              validate={required}
              component={Input}
              />
          </div>
          <button className='form__submit-btn' type="submit" disabled={submitting}>Login</button>
      </form>
    );
  };

export default reduxForm({ form: 'LoginForm' })(LoginForm);