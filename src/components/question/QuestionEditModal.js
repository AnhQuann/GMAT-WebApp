import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Form, Label, Input, FormGroup } from 'reactstrap';

 
class QuestionEditModal extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: true
      };
      this.hide = this.hide.bind(this);
    }

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
        return (
            <Modal 
              isOpen={this.state.isOpen}
              toggle={this.hide}
            >
              <ModalHeader>
                Edit question
              </ModalHeader>
              <ModalBody>
                {this.renderForm()}
              </ModalBody>
            </Modal>
        );
    }
}
 
 
export default QuestionEditModal;
