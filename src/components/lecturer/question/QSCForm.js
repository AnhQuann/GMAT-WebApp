import React from 'react';
import {FormGroup} from 'reactstrap';
import ChoiceForm, { validate } from './choice.form';
import { nestFmikProps, nestFmkArrayValidate, nestFmkValidate } from '../../nestedFormik';

import {QDetailListForm, validate as validateQDetailList} from './QDetailList.form';

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
      <QDetailListForm {...nestFmikProps(formProps)} />
      <div className="d-flex justify-content-end">
        <Button className="mb-2" color="secondary" onClick={this.props.onCancel}>Cancel</Button>
        <Button className="mb-2 ml-2" color="primary">Submit</Button>
      </div>
    </div>
  )
}

export function validate(values) {
  return nestFmkValidate(validateQDetailList, "details")(values);
}