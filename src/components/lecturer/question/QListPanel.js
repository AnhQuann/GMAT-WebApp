import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Label, Input } from 'reactstrap';

import { openPopup, closePopup, removeQuestion, selectQuestion, editQuestion, addQuestion, fetchQuestions  } from '../../actions';
import QList from './QList';
import { VERBAL_QUESTION_TYPES } from '../../constants';

import "./QPanel.css";

class QListPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      questionTypeFilter: "ALL"
    };
    this.modalToggle = this.modalToggle.bind(this);

    this.onDeleteRequest = this.onDeleteRequest.bind(this);
    this.onEditRequest = this.onEditRequest.bind(this);
    this.onAddRequest = this.onAddRequest.bind(this);
  }

  componentWillMount() {
    this.props.fetchQuestions();
  }

  modalToggle() {
    this.setState({
      ...this.state,
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  openModal() {
    this.setState({
      ...this.state,
      modalIsOpen: true
    });
  }

  onEditRequest(question) {
    const handleOK = (updatedQuestion) => this.props.editQuestion(updatedQuestion);
    const handleCancel = () => {};
    const handlers = { handleOK, handleCancel };
    this.props.selectQuestion(question, handlers, "Edit question");
    this.props.history.push(`/lecturer/question/edit/${question._id}`);
  }

  questionsToShow() {
    const questions = this.props.questionReducer;
    if(!questions) return null;
    const questionTypeFilter = this.state.questionTypeFilter
    switch(questionTypeFilter) {
      case "ALL":
        return questions;
      default:
        return _.filter(questions, (question, id) => question.type == questionTypeFilter);
    }
  }

  onAddRequest() {
    const handleOK = (addedQuestion) => { this.props.addQuestion(addedQuestion); };
    const handleCancel = () => {};
    const handlers = { handleOK, handleCancel };
    this.props.selectQuestion(null, handlers, "Add question");
    this.props.history.push('/lecturer/question/add')
  }

  onDeleteRequest(question) {
    const proceedDelete = () => {
      this.props.removeQuestion(question);
      this.props.closePopup();
    };
    this.props.openPopup(proceedDelete, null);
  }

  renderQuestionTypeFilter() {
    return (<div className="d-flex">
              <Input
                type="select"
                onChange={(event) => this.setState({questionTypeFilter: event.target.value})}
              >
              <option>ALL</option>
              {
                VERBAL_QUESTION_TYPES.map((type, index) => {
                  return <option key={type}>{type}</option>
                })
              }
              </Input>
          </div>);
  }

  render() {
    const questions = this.questionsToShow();
    if (!questions) {
      return <div className="panel">Loading...</div>
    }

    return (
      <div>
        <div className="d-flex justify-content-between align-items-center">
          {this.renderQuestionTypeFilter()}
          <Button 
            color="primary"
            className="add-button-right"
            onClick={this.onAddRequest}
            >
              Add new question
          </Button>
        </div>
        <QList questions={questions} onEditRequest={this.onEditRequest} onDeleteRequest={this.onDeleteRequest} />
      </div>
    );
  }
}

function mapReducerToProps( { questionReducer } ) {
  return { questionReducer };
}

const actions = {
  openPopup,
  closePopup,
  removeQuestion,
  selectQuestion,
  editQuestion,
  addQuestion,
  fetchQuestions
};

export default connect(mapReducerToProps, actions)(QListPanel);
