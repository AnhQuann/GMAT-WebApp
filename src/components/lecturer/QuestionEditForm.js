import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
 
class QuestionEditForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
          <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} >
            <ModalHeader>
              Questions
            </ModalHeader>
            <ModalBody>
              Body
            </ModalBody>
          </Modal>
      )
  }
}
 
 
export default QuestionEditForm;