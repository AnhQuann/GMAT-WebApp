import React, { Component } from 'react';
import  { withFormik, Formik } from 'formik';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

class CRoomForm extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  validate(values) {
    const errors = {};
    return errors;
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
      <Form onSubmit={this.props.onSubmit}>
        <FormGroup>
          <Label>Tên</Label>
          <Input
            type='text'
            name='name'
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Mô tả</Label>
          <Input
            type='text'
            name='description'
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FormGroup>
        <Button color="primary">OK</Button>
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

export default CRoomForm;