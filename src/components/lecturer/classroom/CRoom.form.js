import _ from 'lodash';
import React, { Component } from 'react';
import  { withFormik, Formik, FieldArray } from 'formik';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';

import StdSelectModal from '../student/StdSelect.modal';

import Deletable from '../../common/Deletable';
import './CRoom.form.css';

class CRoomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      addQPackModalIsOpen: false
    };
    this.validate = this.validate.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.openAddStudentModal = this.openAddStudentModal.bind(this);
    this.onStudentsSelect = this.onStudentsSelect.bind(this);
  }

  validate(values) {
    const errors = {};
    return errors;
  }

  renderStudents(students) {
    return students.map((student, index) => {
      return (
        <div key={index} className="d-flex">
          <span className="mr-2">{student.userName}</span>
          <i className="fas fa-times text-danger" />
        </div>
      );
    });
  }

  openAddStudentModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  openAdQuestionPackModal() {
    this.setState({
      addQPackModalIsOpen: true
    });
  }

  onStudentsSelect(selectedStudents) {
    selectedStudents.forEach((selectedStudent) => {
      if(!this.state.students[selectedStudent._id]) {
        this.state[selectedStudent._id] = selectedStudent
      }
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
      isSubmitting,
      setFieldValue
    } = formProps;

    return (
      <Form onSubmit={this.props.onSubmit}>
        <FormGroup>
          <legend>Name</legend>
          <Input
            type='text'
            name='name'
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <legend className="d-inline">
            Students
          </legend>
          <div className="d-flex flex-wrap my-2">
            {
              values.students.map((student, index) => {
                return <Deletable
                  className="m-2"
                  key={index}
                  value={student.info.email}
                  onDeleteClick={() => setFieldValue("students", values.students.filter((s) => s._id != student._id))}
                  />
              })
            }
            <Button color="white" onClick={this.openAddStudentModal}>
              <i className="fas fa-plus text-success" />
            </Button>
            
            <StdSelectModal
              isOpen={this.state.modalIsOpen}
              toggle={() => this.setState({modalIsOpen: false})}
              onStudentsSelect={(selectedStudents) => {
                const studentDict = _.mapKeys(values.students, "_id");
                console.log(studentDict);
                selectedStudents.forEach((selectedStudent) => {
                  studentDict[selectedStudent._id] = selectedStudent;
                });
                setFieldValue("students", _.values(studentDict));
              }}
            />
          </div>
        </FormGroup>
        <FormGroup>
          <legend>Quesition Packs</legend>
          <div className="d-flex flex-wrap my-2">
          {
              values.questionPacks.map((questionPack, index) => {
                return <Deletable
                    className="m-2"
                    key={index}
                    value={questionPack.name}
                    onDeleteClick={() => setFieldValue("questionPacks", values.questionPacks.filter((q) => q._id != questionPack._id))}
                />
              })
            }
            <Button color="white" onClick={this.openAdQuestionPackModal}>
              <i className="fas fa-plus text-success" />
            </Button>
          </div>
        </FormGroup>
        <div className="d-flex justify-content-end">
          <Button color='secondary' onClick={() => this.props.history.goBack()}>Back</Button>
          <Button className="ml-2" color="primary">OK</Button>
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

export default CRoomForm;