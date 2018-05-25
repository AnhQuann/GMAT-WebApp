import React, { Component } from 'react';
import CRoomForm from './CRoom.form';

class CRoomAddPanel extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this); 
  }

  onSubmit(values) {
    // TODO: 
  }
  
  render() {
    return (
      <div className="panel">
        <legend>Add new class room</legend>
        <CRoomForm 
          initialValues={{
              name: "",
              description: ""
          }}
          onSubmit={this.onSubmit}
        />      
      </div>
    );
  }
}
  
  
export default CRoomAddPanel;