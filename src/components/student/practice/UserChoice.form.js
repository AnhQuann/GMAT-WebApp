import React, { Component } from 'react';
import { Form, FormGroup, Button, Input, Label } from 'reactstrap';
import  { withFormik, Formik } from 'formik';

class UserChoiceForm extends Component {
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
      handleChange,
      handleSubmit,
      setFieldValue,
      resetForm
    } = formProps;

    const choices = this.props.choices;

    const { choice } = values;

    const handSubmitAndReset = (values) => {
      handleSubmit(values);
      resetForm();
    }

    return (
      <Form onSubmit={handSubmitAndReset} className={this.props.className}>
        {
          choices.map((availableChoice, index) => {
            return (
              <FormGroup key={index} check>
                <Label check>
                <Input
                  checked={choice === index}
                  type="radio"
                  value={index} 
                  onChange={() => setFieldValue("choice", index)} />{' '}
                  {availableChoice}
                </Label>
              </FormGroup>
            );
          })
        }
        <FormGroup check className="guess_chkbox">
          <Label check>
            <Input type="checkbox" />{' '}
            This is a guess
          </Label>
        </FormGroup>
        <FormGroup className="form_menu">
          <Button
            className="btn-success"
            disabled={choice === -1}
          >
            Submit
          </Button>
          <div>
            <div>
              <Button onClick={() => setFieldValue("choice", -1) }>Clear answer</Button>
              <Button disabled={ choice === -1 }>Show answer</Button>
            </div>
            <Button>
              <i className="far fa-star"></i> Bookmark this question
            </Button>
          </div>
        </FormGroup>
      </Form>
    )
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

export default UserChoiceForm;