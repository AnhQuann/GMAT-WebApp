import _ from 'lodash';
import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';
import StdList from './StdList';
import { fetchStudents } from '../../networks';
  
class StdListPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: null
    };
  }

  componentWillMount() {
    fetchStudents().then((students) => {
      this.setState({
        students
      });
    });
  }

  render() {
    if(!this.state.students) return <div className="panel">Loading...</div>;
    
    return (
      <div className="panel">
        <div className="d-flex justify-content-end mb-2 pr-2">
          <Button color="primary">Add new student</Button>
        </div>
        {this.renderStudents(this.state.students)}
      </div>
    );
  }

  renderStudents(students) {
    return (<Table>
      <thead>
        <tr>
          <td>#</td>
          <td>Name</td>
          <td>Class</td>
          <td>Email</td>
        </tr>
      </thead>
      <tbody>
        {
          _.map(students, (student, id) => {
            return (
              <tr key={id}>
                <td></td>
                <td>{student.name}</td>
                <td>{student.className}</td>
                <td>{student.email}</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>);
  }
}

export default StdListPanel;