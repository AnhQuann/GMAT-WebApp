import React from 'react';
import { FormGroup } from 'reactstrap';
import ReactQuill from 'react-quill';

import QDetailListForm from './QDetailList.form';
import { nestFmkProps } from 'nestFmk';

export default function (formProps) {
  const {
    values,
    setFieldTouched,
    setFieldValue,
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
      </FormGroup>
      <QDetailListForm
        {...nestFmkProps(formProps, "details")}
        custom={{canAddQuestionDetail: true, allowStimulus: true, originalStimulus: stimulus}}
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

  