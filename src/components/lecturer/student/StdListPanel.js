import _ from 'lodash';
import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ROUTER_STUDENT_MANAGEMENT_ADD } from 'statics';

import { openPopup, closePopup } from 'actions';
import { fetchStudents, deleteStudent } from 'actions/student';
  
class StdListPanel extends Component {
  constructor(props) {
    super(props);
    this.requestDelete = this.requestDelete.bind(this);
  }

  componentDidMount() {
    this.props.fetchStudents();
  }

  requestDelete(student) {
    const yesCallBack = (() => {
      this.props.deleteStudent();
      this.props.closePopup();
    });

    this.props.openPopup(yesCallBack);
  }

  render() {
    const studentsList = this.props.studentReducer;
    return (
      <div className="panel">
        <div className="d-flex justify-content-end mb-2 pr-2">
          <Link to={ROUTER_STUDENT_MANAGEMENT_ADD} >
            <Button color="primary">Add new student</Button>
          </Link>
        </div>
        {this.renderStudents(studentsList)}
      </div>
    );
  }

  renderStudents(students) {
    return (<Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Last name</th>
          <th>First name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          _.values(students).map((student, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{student.info.lastName}</td>
                <td>{student.info.firstName}</td>
                <td>{student.info.email}</td>
                <td>
                  <i className="fas fa-trash question-remove text-danger" onClick={() => this.requestDelete(student)} />
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>);
  }
}

function mapReducerToState({ studentReducer }) {
  return { studentReducer };
}

const actions = {
  openPopup,
  closePopup,
  fetchStudents,
  deleteStudent
}

export default connect(mapReducerToState, actions)(StdListPanel);