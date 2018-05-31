import React, { Component } from 'react';
import { editStudent, fetchStudent } from '../../networks';
import StdForm from './Std.form';
 
class StdEditPanel extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      student: null
    };
  }
  
  onSubmit(values) {
    editStudent(values).then((student) => {
      this.props.history.goBack();
    });

  }

  componentWillMount() {
    const studentId = this.props.match.params.id;
    fetchStudent(studentId).then((student) => {
      this.setState({
        student: {
          ...student,
          ...student.info
        }
      });
    })
  }

  render() {
   if(!this.state.student) return <div>Loading...</div>;

   return (
     <div className="panel">
       <legend>Edit student</legend>
       <StdForm
          initialValues={this.state.student}
       />
     </div>
   );
 }
}
 
 
export default StdEditPanel;