import React, { Component } from 'react';

import CRoomForm from './CRoom.form';
import { fetchClassRoom } from 'networks';

class CRoomEditPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classroom: null
    };
  }

  componentWillMount() {
    const classroomId = this.props.match.params.id;
    fetchClassRoom(classroomId).then((classroom) => {
      this.setState({
        classroom
      });
    });
  }

  onSubmit(values) {
    // TODO: Edit here
  }

  render() {
    if(!this.state.classroom) return <div className="panel">Loading...</div>;
    return (
      <div className="panel">
        <h3>Edit classroom</h3>
        <CRoomForm
          initialValues={this.state.classroom}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}
  
  
export default CRoomEditPanel;