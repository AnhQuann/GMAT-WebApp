import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Form, FormGroup, Button, Input, Label } from 'reactstrap';
 
class QuestionEditForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
      return (
          <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} size="lg" >
            <ModalHeader>
              Question
            </ModalHeader>
            <ModalBody>
              { this.renderForm() }
            </ModalBody>
          </Modal>
      )
  }

  renderForm() {
    return (
      <Form>
        <FormGroup>
          <Label>Stimulus</Label>
          <Input type="textarea"></Input>
        </FormGroup>
        <FormGroup>
          <Label>Stem</Label>
          <Input type="text"></Input>
        </FormGroup>
        <FormGroup>
          <Label>Choices</Label>
          <Input></Input>
          <Input></Input>
          <Input></Input>
          <Input></Input>
          <Input></Input>
        </FormGroup>
        <FormGroup>
          <Label>Right choice</Label>
          <Input type="select">
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
            <option>E</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Button>Cancel</Button>
          <Button>OK</Button>
        </FormGroup>
      </Form>
    );
  }
}
 
 
export default QuestionEditForm;