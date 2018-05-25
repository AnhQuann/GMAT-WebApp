import _ from 'lodash';
import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

import { fetchClassRooms } from '../../networks';
  
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
              <td>Class no</td>
              <td>Students</td>
            </tr>
          </thead>

          <tbody>
            {
              _.map(this.state.classrooms, (classroom, id) => {
                return (
                  <tr>
                    <td>{classroom.classNo}</td>
                    <td>Students</td>
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