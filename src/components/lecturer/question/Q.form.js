import React, { Component } from 'react';
import { Form, Input, FormGroup, Button } from 'reactstrap';
import { VERBAL_QUESTION_TYPES } from 'statics';
import  { Formik } from 'formik';
import _ from 'lodash';

import { checkQuestionStem } from 'networks/question';

import QCRForm, {validate as validateQCRForm} from './QCR.form';
import QSCForm, {validate as validateQSCForm} from './QSC.form';
import QRCForm, {validate as validateQRCForm} from './QRC.form';

class QForm extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.checkStemBeforeSubmit = this.checkStemBeforeSubmit.bind(this);
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

  checkStemBeforeSubmit(formProps, cb) {
    if(this.props.editForm) {
      cb();
    } else {
      const stems = formProps.values.details.map(detail => {
        return {
          stem: detail.stem,
          type: formProps.values.type
        };
      });
      checkQuestionStem(stems)
        .then(response => {
          const details = _.get(response, 'data.details');
          if(details && details.length > 0) {
            const validStems = details.filter(detail => detail === null);
            if(validStems.length === details.length) {
              cb();
            } else {
              const detailErrors = details.map(detail => {
                return { stem: detail };
              });
              let errors = {
                ...formProps.errors,
                details: detailErrors
              }
              formProps.setErrors(errors);
            }
          }
        });
    }
  }

  renderForm(formProps) {
    const {
      values,
      handleBlur,
      handleSubmit,
      setFieldValue
    } = formProps;

    const { type } = values;

    return (
      <Form
        onSubmit={(e) => { e.preventDefault(); this.checkStemBeforeSubmit(formProps, () => { handleSubmit(e); }); }}
      >
        <FormGroup className="q-group">
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
          <Button type="submit" color="primary" className="ml-2" >Submit</Button>
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