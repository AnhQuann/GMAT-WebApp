import _ from 'lodash';
import React, { Component } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import { Formik, FieldArray } from 'formik';
import { elipsis } from 'utils';
import QPackAddQuestionModal from './QPackAddQuestionModal';
import { Link } from 'react-router-dom';
import { ROUTER_QUESTION_EDIT_ID } from 'statics';

class QPackForm extends Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      modalIsOpen: false,
      onSelectNewQuestionsDone: null
    };
  }

  validate(values) {
    const errors = {};
    if(!values.name) {
      errors.name = "Name required";
    }
    return errors;
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    });
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

    const {name, header, questions} = values;

    return (
      <Form onSubmit={handleSubmit}>
        <QPackAddQuestionModal
          isOpen={this.state.modalIsOpen}
          toggle={this.closeModal}
          onSelectionDone={this.state.onSelectNewQuestionsDone}
        />
        <FormGroup>
          <legend>Header</legend>
          <Input
            type='text'
            name='header'
            value={header}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <legend>Name</legend>
          <Input 
            name="name"
            type="text"
            invalid={touched.name && errors.name != null}
            value={name}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="text-danger">{ touched.name? errors.name: "" }</div>
        </FormGroup>

        <FormGroup>
          <FieldArray 
            name="questions"
            render={ arrayHelpers => (
              <div>
                <div className="d-flex justify-content-between">
                  <legend>Questions</legend>
                  <Button className="mr-3" color="secondary" onClick={()=> {
                    this.setState({
                      modalIsOpen: true,
                      onSelectNewQuestionsDone: (selectedQuestions) => {
                        const resultArray = questions.slice(0);
                        selectedQuestions.forEach(selectedQuestion => {
                          if(!_.find(questions, { _id: selectedQuestion._id })) {
                            resultArray.push(selectedQuestion);
                          }
                        });
                        // Can't use array helper yet :'(
                        setFieldValue("questions", resultArray);
                      }
                    });
                  }}>Add questions</Button>
                </div>
               <table>   
                 <tbody>
                {
                  questions.map((question, index) => (
                    <tr key={index} className="my-2 d-flex align-items-center border-bottom">
                      <td>{index + 1}.</td>
                      <td dangerouslySetInnerHTML={{
                        __html: question.type == "SC" ? elipsis(question.details[0].stem) : elipsis(question.stimulus)
                        }} 
                        className='col mt-3' 
                      />
                      <td>
                        <Link to={`${ROUTER_QUESTION_EDIT_ID}/${question._id}`} >
                              <i className="fas fa-eye" />
                        </Link>
                      </td>
                      <td>
                        <i 
                          className="fas fa-times mx-3 text-danger pointer question-remove"
                          onClick={() => {arrayHelpers.remove(index)}}
                        />
                      </td>
                    </tr>
                  ))
                }
                </tbody>
                </table>

              </div>
            ) }
          />
        </FormGroup>
        <div className="d-flex justify-content-end">
          <Button color="seconary" onClick={this.props.onCancel}>Cancel</Button>
          <Button color="primary" className="ml-2">Submit</Button>
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

export default QPackForm;