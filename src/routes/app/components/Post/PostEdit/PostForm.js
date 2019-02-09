import React from 'react';
import { reduxForm, Field } from 'redux-form';
import {required,collectionRequired} from './../../../../../constants/validation';
import { 
    Input, 
    DropdownList,
    RadioButton, 
    Textarea, 
    Checkbox, 
    DateTimePicker, 
    Multiselect
 } from '../../../../../components/FormElements';

const PostForm = ({ handleSubmit, submitting, onBack, initialValues, allClassifications } ) => {
    return (
      <form onSubmit={handleSubmit} className=''>
         <div className='row'>
            <div className='col-sm-6'>
                <Field
                name='title'
                type='text'
                label='Title'
                validate={required}
                component={Input}
                />
            </div>
            <div className='col-sm-6'>
                <Field 
                name='category'
                label='Category'
                validate={required}
                component={DropdownList}
                data={[{id: 'Educational',  name:'Educational'}, {id: 'Sports',  name:'Sports'}, {id: 'Cultural',  name:'Cultural'}]}
                valueField='id'
                textField='name'
                 />
            </div>
         </div>
         <div className='row'>
            <div className='col-sm-6'>
                <Field
                name='text'
                label='Text'
                validate={required}
                component={Textarea}
                />
            </div>
            <div className='col-sm-6'>
                <Field
                name='public'
                label='Public'
                component={Checkbox}
                />
            </div>
         </div>
         <div className='row'>
            <div className='col-sm-6'>
                <Field 
                 name='date_expiration' 
                 label='Date expiration' 
                 showTime={false}
                 min={new Date()}
                 component={DateTimePicker}
                 validate={required}
            />
            </div>
            <div className='col-sm-6'>
            <RadioButton
                name='extension'
                label='Extension'
                options={[{id: 'short',  name:'Short'}, {id: 'long',  name:'Long'}]}
             />
            </div>
        </div>
        <div className='row'>
            <div className='col-sm-6'>
                <Field
                name='classifications'
                label='Classification by ages'
                validate={collectionRequired}
                component={Multiselect}
                data={allClassifications}
                valueField='id'
                textField='name'
                />
            </div>
        </div>

         <div className='row mt-4'>
          <button className='btn btn-info px-4 ml-3 mr-4' type='submit' disabled={submitting}>Save</button>
          <button className='btn btn-default px-4' type='button' onClick={onBack}>Cancel</button>
         </div>         
      </form>
    );
  };

export default reduxForm({ form: 'PostForm', enableReinitialize : true })(PostForm);
