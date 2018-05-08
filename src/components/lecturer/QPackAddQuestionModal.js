import _ from 'lodash';
import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Input, Button } from 'reactstrap';

import QList from './QList';

import { searchQuestion } from '../../actions';

import "./QPackAddQuestionModal.css";

class QPackAddQuestionModal extends Component {

  constructor(props) {
    super(props);
    this.toggleQuestionSelection = this.toggleQuestionSelection.bind(this);
    this.clearQuestionSelections = this.clearQuestionSelections.bind(this);
  }
  
  componentWillMount() {
    const action = searchQuestion("");
    this.setState({
      questions: action.payload
    });
  }

  toggleQuestionSelection(question) {
    this.setState({
      questions: {
        ...this.state.questions,
        [question.id]: {
          ...question,
          selected: !question.selected
        }
      }
    });
  }

  clearQuestionSelections() {
    this.setState({
      questions: _.mapValues(this.state.questions, (question) => {
        return { ...question, selected: false };
      })
    });
  }

  selectedQuestions() {
    return _.filter(this.state.questions, (question => question.selected));
  }

  render() {
      const questions = this.state.questions;
      return (
        <Modal 
            isOpen={this.props.isOpen} 
            toggle={this.props.toggle} 
            onOpened={this.clearQuestionSelections} >
          <ModalHeader>Add question</ModalHeader>
          <ModalBody>
            <Input placeholder="Search here"></Input>
            <div className="q-modal-scroll">
              <QList 
                questions={questions} 
                stimulusMaxLength={20} 
                onQuestionClicked={this.toggleQuestionSelection}
                pointer={true} 
              />
            </div>
            <div className="d-flex mt-2 justify-content-end">
              <Button color="secondary" onClick={this.props.toggle} >Cancel</Button>
              <Button 
                color="primary" className="ml-2"
                onClick={() => this.props.onSelectionDone(this.selectedQuestions())}>OK</Button>
            </div>
          </ModalBody>
        </Modal>
      );
  }
}

export default QPackAddQuestionModal;