import _ from 'lodash';
import React from 'react';
import ReactQuill from 'react-quill';
import { Formik } from 'formik';
import { FormGroup } from 'reactstrap';

import QDetailListForm, { validate as validateQDetailList } from './QDetailList.form';
import { deEmpty, stripHTML } from '../../utils';
import { nestFmkProps, nestFmkValidate } from '../../nestedFormik';

import 'react-quill/dist/quill.snow.css';
import './Q.form.css';

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

  const { stimulus } = values;
  
  return (
    <div>
      <FormGroup className="q-group">
        <legend>Stimulus</legend>
        <ReactQuill
          className="quill"
          theme="snow"
          name="stimulus"
          value={stimulus}
          onChange={(html) => {
            setFieldValue("stimulus", html);
            setFieldTouched("stimulus", true);
          }}
          onBlur={() => {
            validateForm(values);
            setFieldTouched("stimulus", true);
          }}
         />
        <div className="text-danger" >{ touched.stimulus ? errors.stimulus : "" }</div>
      </FormGroup>
      
      <QDetailListForm
        {...nestFmkProps(formProps, "details")}
      />
    </div>
  );
}

export function validate(values) {
  let errors = {};
    
    if(!stripHTML(values.stimulus)) {
      errors.stimulus = "Stimulus required";
    }
    
    return {
      ...errors,
      ...nestFmkValidate(validateQDetailList, "details")(values)
    };
}