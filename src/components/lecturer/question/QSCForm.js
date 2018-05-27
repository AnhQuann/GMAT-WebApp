import React from 'react';
import {FormGroup} from 'reactstrap';
import ChoiceForm from './choice.form';
import { nestedFormikProps } from '../../nestedFormik';

export default function(formProps) {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    setFieldTouched,
    validateForm
  } = formProps;

  return (
    <div>
      <FormGroup>
        <legend>Stem</legend>
        <ReactQuill
          className='quill'
          theme='snow'
          name='stem'
          value={stem}
          onChange={(html) => {
            setFieldValue('stem', html);
            setFieldTouched('stem', true);
          }}
          onBlur={() => validateForm(values)}
          />
      </FormGroup>
      <FormGroup>
        <legend>Choices</legend>
        <ChoiceForm {...nestedFormikProps(formProps)} />
      </FormGroup>
    </div>
  )
}