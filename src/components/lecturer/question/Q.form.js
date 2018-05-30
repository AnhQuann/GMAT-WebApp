import React, { Component } from 'react';
import { Form, Input, FormGroup, Button } from 'reactstrap';
import { VERBAL_QUESTION_TYPES } from '../../constants';
import  { Formik } from 'formik';
import ReactQuill from 'react-quill';

import QCRForm, {validate as validateQCRForm} from './QCR.form';
import QSCForm, {validate as validateQSCForm} from './QSC.form';
import QRCForm, {validate as validateQRCForm} from './QRC.form';

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
      case "RC":
        return validateQRCForm(values);
      default:
        return {};
    }
  }

  renderFormDetail(type, formProps) {
    switch(type) {
      case "CR":
        return <QCRForm {...formProps} />;
      case "SC":
        return <QSCForm {...formProps} />;
      case "RC":
        return <QRCForm {...formProps} />;
      default:
        return <div>No question type selected, check your code</div>;
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
      setFieldValue
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
            onChange={(event) => {
              const type = event.target.value;
              if(type === "SC" || type === "CR") {
                setFieldValue("details", [values.details[0]]);
              } 
              setFieldValue("type", type);
            }}
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