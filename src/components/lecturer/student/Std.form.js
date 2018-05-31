import React, { Component } from 'react';
import  { withFormik, Formik } from 'formik';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

class StdForm extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  validate(values) {
    const errors = {};
    if(!values.lastName) {
      errors.name = "Lastname is required";
    }
    if(!values.firstName) {
      errors.firstName = "Firstname is required";
    }
    if(!values.email) {
      errors.email = "Email is required";
    }
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
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Lastname</Label>
          <Input
            type='text'
            name='lastName'
            invalid={!!touched.lastName && !!errors.lastName}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="text-danger">{touched.lastName ? errors.lastName : ""}</div>
        </FormGroup>
        <FormGroup>
          <Label>Firstname</Label>
          <Input
            type='text'
            name='firstName'
            invalid={!!touched.firstName && !!errors.firstName}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="text-danger">{touched.firstName ? errors.firstName : ""}</div>
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input
            type='text'
            name='email'
            invalid={!!touched.email && !!errors.email}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="text-danger">{touched.email ? errors.email : ""}</div>
        </FormGroup>
        <Button color="primary">Submit</Button>
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

export default StdForm;