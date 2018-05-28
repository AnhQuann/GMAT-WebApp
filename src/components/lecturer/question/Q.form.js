import React, { Component } from 'react';
import { Form, Input, FormGroup, Button } from 'reactstrap';
import  { Formik } from 'formik';
import ReactQuill from 'react-quill';

import QCRForm, {validate as validateQForm} from './QCR.form';

class QForm extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  validate(values) {
    return validateQForm(values);
  }

  renderForm(formProps) {
    const {
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
    } = formProps;

    return (
      <Form
        onSubmit={handleSubmit}
      >
        <FormGroup>
          <legend>Type</legend>
          <Input  
            type='type'
            name='type'
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FormGroup>
        
        <QCRForm {...formProps} />

        <div className="d-flex justify-content-end">
          <Button onClick={this.props.onCancel}>Cancel</Button>
          <Button color="primary" className="ml-2" >Submit</Button>
        </div>
      </Form>
    );
  }

  // onSubmit(values, {setSubmitting, setErrors}) {
  // }

  render() {
    return (
      <Formik
        initialValues={this.props.initialValues}
        validate={this.validate}
        onSubmit={this.props.onSubmit}
        render={this.renderForm}
      />
    );
  }
}

export default QForm;