import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap';
import { openPopup, closePopup, removeQuestionPack  } from '../../actions';
import _ from 'lodash';

import { ROUTER_QUESTION_PACK_EDIT }  from '../../constants';
 
class QuestionPackListPanel extends Component {
  constructor(props) {
    super(props);
    this.removeRequest = this.removeRequest.bind(this);
  }

  render() {
    const questionPacks = this.props.questionPackReducer;
    return (
      <div className="panel">
        <Button className="add-button-right" color="primary" >Add new pack</Button>
        { this.renderQuestionPacks(questionPacks) }
      </div>
    );
  }

  removeRequest(questionPack) {
    const yesCallBack = (() => {
      this.props.removeQuestionPack(questionPack);
      this.props.closePopup();
    }).bind(this);
    this.props.openPopup(yesCallBack);
  }

  editRequest(questionPack) {
    this.props.history.push(ROUTER_QUESTION_PACK_EDIT);
  }
  
  renderQuestionPacks(questionPacks) {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Number of questions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { _.map(questionPacks, (questionPack, id) => {
            return (
              <tr key={id}>
                <td>{questionPack.id}</td>
                <td>{questionPack.name}</td>
                <td>{questionPack.questionCount}</td>
                <td>
                  <i className="far fa-edit question-edit" onClick={() => this.editRequest(questionPack)}></i>
                  <i className="fas fa-trash question-remove" onClick={() => this.removeRequest(questionPack)}></i>
                </td>
              </tr>
            );
          }) }
        </tbody>
      </Table>
    );
  }
}

function mapReducerToState({ questionPackReducer }) {
  return { questionPackReducer };
}

const actions = { closePopup, openPopup, removeQuestionPack  };
 
export default connect(mapReducerToState, actions)(QuestionPackListPanel);