import _ from 'lodash';
import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';

import { fetchStudents } from 'networks';
import StdList from './StdList';

import SearchBar from '../../common/SearchBar';

class StdSelectModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: null
    };
    this.searchStudents = this.searchStudents.bind(this);
    this.onStudentToggle = this.onStudentToggle.bind(this);
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        size="lg"
      >
        <ModalHeader>Select students</ModalHeader>
        <ModalBody>
          { this.renderBody() }
        </ModalBody>
      </Modal>
    );
  }

  componentDidMount() {
    fetchStudents("").then((students) => {
      this.setState({
        students: _.mapKeys(students, "_id")
      });
    });
  }

  searchStudents(name) {
    fetchStudents(name).then((students) => {
      this.setState({
        students: _.mapKeys(students, "_id")
      });
    });
  }

  onStudentToggle(student) {
    this.setState({
      students: {
        ...this.state.students,
        [student._id]: {
          ...student,
          selected: !student.selected
        }
      }
    });
  }

  renderStudents() {
    if(!this.state.students) return <div>Loading...</div>
    const studentList = _.values(this.state.students);
    const selectedStudents =  studentList.filter((student) => !!student.selected);
    return (
      <div>
        <StdList  
          students={studentList}
          onStudentToggle={this.onStudentToggle}
        />
        
        <div className="d-flex justify-content-end">
          <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          <Button
            className="ml-2"
            color="primary"
            disabled={selectedStudents.length == 0}   
            onClick={() => {
              this.props.onStudentsSelect(selectedStudents);
              this.props.toggle();
            }}
          >
            OK
          </Button>
        </div>
      </div>
    );
  }

  onSelectStudents() {
    
  }

  renderBody() {
    return (
      <div>
        <SearchBar
          className="mb-3"
          placeholder="Search for students"
          search={this.searchStudents} />
        { this.renderStudents() }
      </div>
    );
  }
}

export default StdSelectModal;