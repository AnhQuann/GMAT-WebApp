import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Form, Label, Input, FormGroup } from 'reactstrap';

 
class QuestionEditModal extends Component {
    constructor(props) {
      super(props);
      this.hide = this.hide.bind(this);
      
    }

    componentWillMount() {
      this.setState({
        isOpen: this.props.isOpen
      });
      console.log("constructor");
    }

    // componentWillUpdate() {
    //   this.setState({
    //     isOpen: this.props.isOpen
    //   });
    // }

    hide() {
      this.setState({
        ...this.state,
        isOpen: false
      });
    }

    renderForm() {
      return (
        <div>Form</div>
      );
    }

    render() {
        console.log(this.state);
        return (<div>Modal</div>);
        // const question = this.state.question;
        // const isOpen = this.state.isOpen;
        // return (
        //     <Modal 
        //       // isOpen={this.state.isOpen? true: false}
        //       toggle={this.hide}
        //     >
        //       <ModalHeader>
        //         Edit question
        //       </ModalHeader>
        //       <ModalBody>
        //         {this.renderForm()}
        //       </ModalBody>
        //     </Modal>
        // );
    }
}
 
 
export default QuestionEditModal;
