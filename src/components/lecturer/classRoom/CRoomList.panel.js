import _ from 'lodash';
import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import { fetchClassRooms } from '../../networks';
import { ROUTER_CLASS_ROOM_EDIT } from '../../constants';
  
class CRoomListPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classrooms: null
    };
  }

  componentWillMount() {
    fetchClassRooms().then((classrooms) => {
      this.setState({
        classrooms: _.mapKeys(classrooms, "_id")
      })
    });
  }

  render() {
    if(!this.state.classrooms) return (<div className="panel">Loading...</div>);
    return (
      <div className="panel">
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Students</th>
              <th>Packs</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {
              _.values(this.state.classrooms).map((classroom, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{classroom.name}</td>
                    <td>{classroom.students.length}</td>
                    <td>{classroom.questionPacks.length}</td>
                    <td>
                      <Link to={`${ROUTER_CLASS_ROOM_EDIT}/${classroom._id}`} >
                        <i className="far fa-edit question-edit" />
                      </Link>
                      <i className="fas fa-trash question-remove text-danger" />
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
      </div>
    );
  }
}
  
  
export default CRoomListPanel;