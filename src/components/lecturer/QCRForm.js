import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { withFormik, Formik } from 'formik';
import { deEmpty, stripHTML } from '../../utils';
import { Form, Input, Label, Button, FormGroup } from 'reactstrap';
import QuestionDetail from './qDetail.form';
import { QUESTION_DIFFICULTIES, CHOICE_LETTERS } from '../../constants';

import { nestedFormikProps } from '../nestedFormik';
import ChoiceForm from './choice.form';

import 'react-quill/dist/quill.snow.css';
import './QForm.css';

class QCRForm extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.question = this.props.question ? this.props.question : 
      {
        stimulus: "",
        stem: "",
        choices: ["", "", "", "", ""],
        rightChoice: 0,
        difficulty: 0,
        explanation: "",
      };
  }

  validate(values) {
    const errors = {};
    if(!stripHTML(values.stimulus)) {
      errors.stimulus = "Stimulus required";
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
      setFieldValue,
      setFieldTouched,
      validateForm
    } = formProps;

    const stimulus = deEmpty(values.stimulus);

    return (
      <Form onSubmit={handleSubmit} >
        <FormGroup>
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
            onBlur={() => validateForm(values)}
           />
          <div className="text-danger" >{ touched.stimulus ? errors.stimulus : "" }</div>
        </FormGroup>
        
        { 
          values.details.map((_, index) => {
            return <QuestionDetail
                      key={index}
                      {...nestedFormikProps(formProps, `details[${index}]`)}
                    />
          })
        }
        
        
        <div className="d-flex justify-content-end">
          <Button className="mb-2" color="secondary" onClick={this.props.onCancel}>Cancel</Button>
          <Button className="mb-2 ml-2" color="primary">Submit</Button>
        </div>
        
      </Form>
    );
  }

  // onSubmit(values, {setSubmitting, setErrors}) {
  // }

  render() {
    return (
      <Formik
        initialValues={this.question}
        validate={this.validate}
        onSubmit={this.props.onSubmit}
        render={this.renderForm}
      /> 
    );
  }
}

export default QCRForm;