import _ from 'lodash';
import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { ROUTER_STUDENT_MANAGEMENT_ADD } from 'statics';

import StdList from './StdList';
import { openPopup, closePopup } from 'actions';
import { fetchStudents, deleteStudent } from 'networks';
  
class StdListPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: null
    };
    this.requestDelete = this.requestDelete.bind(this);
  }

  componentWillMount() {
    fetchStudents().then((students) => {
      this.setState({
        students: _.mapKeys(students, "_id")
      });
    });
  }

  requestDelete(student) {
    const yesCallBack = (() => {
      deleteStudent(student).then((studentBefore) => {
        this.setState({
          students: _.omit(this.state.students, studentBefore._id)
        });
      });
      this.props.closePopup();
    });

    this.props.openPopup(yesCallBack);
  }

  render() {
    if(!this.state.students) return <div className="panel">Loading...</div>;
    
    return (
      <div className="panel">
        <div className="d-flex justify-content-end mb-2 pr-2">
          <Link to={ROUTER_STUDENT_MANAGEMENT_ADD} >
            <Button color="primary">Add new student</Button>
          </Link>
        </div>
        {this.renderStudents(this.state.students)}
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

const actions = {
  openPopup,
  closePopup
}

export default connect(null, actions)(StdListPanel);