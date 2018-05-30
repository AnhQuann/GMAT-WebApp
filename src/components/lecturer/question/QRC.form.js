import React, { Component } from 'react';
import  { withFormik, Formik } from 'formik';
import { Form, FormGroup, Input, Button } from 'reactstrap';

import QDetailListForm, { validate as validateDetailList } from './QDetailList.form';
import { nestFmkProps } from '../../nestedFormik';

export default function (formProps) {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = formProps;

  const { stimulus } = values;

  return (
    <div>
      <FormGroup>
        <legend>Stimlus</legend>
        <Input
          type='text'
          name='stimulus'
          value={stimulus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </FormGroup>
      <QDetailListForm
        {...nestFmkProps(formProps, "details")}
        custom={{canAddQuestionDetail: true}}
      />
    </div>
  );
}

export function validate(values) {
  const errors = {};

  return errors;
}

  // onSubmit(values, {setSubmitting, setErrors}) {
  // }

  