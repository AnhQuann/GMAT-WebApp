import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import QuestionEditForm from './QuestionEditForm';
import { openPopup, closePopup, removeQuestion, selectQuestion  } from '../../actions';
import { elipsis } from '../../utils';

import "./QuestionPanel.css";

class QuestionListPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
    this.modalToggle = this.modalToggle.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
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

  onEdit(question) {
    this.props.selectQuestion(question);
    this.props.history.push("/lecturer/question/edit");
  }

  onDelete(question) {
    const proceedDelete = () => {
      this.props.removeQuestion(question);
      this.props.closePopup();
    };
    this.props.openPopup(proceedDelete, null);
  }

  render() {
      return (
          <div className="question-panel">
            <QuestionEditForm isOpen={this.state.modalIsOpen} toggle={this.modalToggle} />
            <table className="table table-stripped">
              <thead className="">
                <tr className="">
                  <th className="th-no">#</th>
                  <th className="th-stimulus">Stimulus</th>
                  <th className="th-difficulty">Difficulty</th>
                  <th className="">Actions</th>
                </tr>
              </thead>
              <tbody className="container">
                { this.renderQuestions(this.props.questionReducer) }
              </tbody>
            </table>
          </div>
      );
  }

  renderQuestions(questions) {
    return _.map(questions, (question, id) => {
      return (
        <tr key={id}>
          <th scope="row" className="td-no">{ id } </th>
          <td scope="col" className="td-stimulus">{ elipsis(question.stimulus) }</td>
          <td scope="col" className="td-difficulty">{ this.renderDifficulty(question.difficulty) }</td>
          <td scope="col">
            <i className="far fa-edit question-edit" onClick={() => this.onEdit(question)}></i>
            <i className="fas fa-trash question-remove" onClick={() => this.onDelete(question)}></i>
          </td>
        </tr>
      );
    });
  }

  renderDifficulty(difficulty) {
    switch(difficulty) {
      case 0: return (<span className="q-difficulty q-easy">Easy</span>);
      case 1: return (<span className="q-difficulty q-medium">Medium</span>);
      case 2: return (<span className="q-difficulty q-hard">Hard</span>);
      case 3: return (<span className="q-difficulty q-very-hard">Very hard</span>);
      default: return (<span>Unknown</span>);
    }
  }
}

function mapReducerToProps( { questionReducer } ) {
  return { questionReducer };
}

const actions = {
  openPopup,
  closePopup,
  removeQuestion,
  selectQuestion
};

export default connect(mapReducerToProps, actions)(QuestionListPanel);
