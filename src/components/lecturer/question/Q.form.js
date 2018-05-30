import React, { Component } from 'react';
import { Form, Input, FormGroup, Button } from 'reactstrap';
import { VERBAL_QUESTION_TYPES } from '../../constants';
import  { Formik } from 'formik';
import ReactQuill from 'react-quill';

import QCRForm, {validate as validateQCRForm} from './QCR.form';
import QSCForm, {validate as validateQSCForm} from './QSC.form';

class QForm extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.renderForm = this.renderForm.bind(this);
  }

  validate(values) {
    switch(values.type) {
      case "CR":
        return validateQCRForm(values);
      case "SC":
        return validateQSCForm(values);
      default:
        return {};
    }
  }

  renderFormDetail(type, formProps) {
    switch(type) {
      case "CR":
        return <QCRForm {...formProps} />;
      default:
        return <QSCForm {...formProps} />;
    }
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

    const { type } = values;

    return (
      <Form
        onSubmit={handleSubmit}
      >
        <FormGroup>
          <legend>Type</legend>
          <Input  
            type="select"
            name='type'
            value={type}
            onBlur={handleBlur}
            onChange={handleChange}
          >
          {
            VERBAL_QUESTION_TYPES.map((questionType, index) => {
              return <option key={questionType}>{questionType}</option>
            })
          }
          </Input>
        </FormGroup>
        
        {this.renderFormDetail(type, formProps)}

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