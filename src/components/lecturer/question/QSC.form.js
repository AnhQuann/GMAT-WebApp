import React from 'react';
import  { Formik } from 'formik';
import { nestFmkProps, nestFmkValidate } from '../../nestedFormik';
import QDetailListForm, { validate as validateQDetailList } from './QDetailList.form';

import 'react-quill/dist/quill.snow.css';
import './Q.form.css';

export default function(formProps) {
  return (
    <QDetailListForm
      {...nestFmkProps(formProps, "details")}
    />
  );
}

export function validate(values) {
  return nestFmkValidate(validateQDetailList, "details")(values);
}