import React, { Component } from 'react';
import StdForm from './Std.form';
import { addStudent } from '../../networks';

class StdAddPanel extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    addStudent(values).then((student) => {
      this.props.history.goBack();
    });
  }

  render() {
    return (
      <div className="panel">
        <legend>Add student</legend>
        <StdForm
            initialValues={{
              name: "",
              email: ""
            }}
            onSubmit={this.onSubmit}
          />
      </div>
    );
  }
}
 
 
export default StdAddPanel;