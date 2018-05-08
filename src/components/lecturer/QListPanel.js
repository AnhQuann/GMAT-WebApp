import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { openPopup, closePopup, removeQuestion, selectQuestion, editQuestion, addQuestion, fetchQuestions  } from '../../actions';
import QList from './QList';

import "./QuestionPanel.css";

class QListPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
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
    this.props.selectQuestion(question, handleOK);
    this.props.history.push("/lecturer/question/edit");
  }

  onAddRequest() {
    const handleOK = (addedQuestion) => { addedQuestion.id = Math.floor(Math.random() * 10 + 3); this.props.addQuestion(addedQuestion); };
    this.props.selectQuestion(null, handleOK, "Add question");
    this.props.history.push('/lecturer/question/add')
  }

  onDeleteRequest(question) {
    const proceedDelete = () => {
      this.props.removeQuestion(question);
      this.props.closePopup();
    };
    this.props.openPopup(proceedDelete, null);
  }

  render() {
    return (
      <div>
        <Button 
          color="primary"
          className="mb-2 clearfix float-right"
          onClick={this.onAddRequest}
          >
            Add new question
        </Button>
        <QList questions={this.props.questionReducer} onEditRequest={this.onEditRequest} onDeleteRequest={this.onDeleteRequest} />
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
