import _ from 'lodash';
import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchClassRooms } from 'actions/classRoom';
import { ROUTER_CLASS_ROOM_EDIT } from '../../constants';
  
class CRoomListPanel extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchClassRooms();
  }

  render() {
    const classRoomList = this.props.classRoomReducer;
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
              _.values(classRoomList).map((classroom, index) => {
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

function mapReducerToState({ classRoomReducer }) {
  return { classRoomReducer };
}

const actions = { fetchClassRooms }  

export default connect(mapReducerToState, actions)(CRoomListPanel);