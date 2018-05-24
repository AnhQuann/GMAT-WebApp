import React, { Component } from 'react';

import CRoomForm from './CRoom.form';
import { fetchClassRoom } from '../../networks';

class CRoomEditPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classRoom: null
    };
  }

  componentWillMount() {

  }

  onSubmit(values) {
    // TODO: Edit here
  }

  render() {
    if(!this.state.classRoom) return <div className="panel">Loading...</div>;
    return (
      <div className="panel">
        <legend>Edit class room</legend>
        <CRoomForm
          initialValues={this.state.classRoom}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}
  
  
export default CRoomEditPanel;