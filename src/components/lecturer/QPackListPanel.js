import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap';
import _ from 'lodash';

import { openPopup, closePopup, removeQuestionPack, selectQuestionPack  } from '../../actions';
import { addQuestionPack } from '../../actions';

import { ROUTER_QUESTION_PACK_EDIT }  from '../../constants';
 
class QPackListPanel extends Component {
  constructor(props) {
    super(props);
    this.removeRequest = this.removeRequest.bind(this);
    this.editRequest = this.editRequest.bind(this);
    this.addRequest = this.addRequest.bind(this);
  }

  render() {
    const questionPacks = this.props.questionPackReducer;
    return (
      <div className="panel">
        <Button className="add-button-right" color="primary" onClick={this.addRequest} >Add new pack</Button>
        { this.renderQuestionPacks(questionPacks) }
      </div>
    );
  }

  removeRequest(questionPack) {
    const yesCallBack = (() => {
      this.props.removeQuestionPack(questionPack);
      this.props.closePopup();
    });
    this.props.openPopup(yesCallBack);
  }

  addRequest() {
    const handleOK = ((questionPack) => {
      this.props.addQuestionPack(questionPack);
    }).bind(this);
    
    const handleCancel = (
      () => this.props.history.goBack()
    ).bind(this);

    this.props.selectQuestionPack(null, handleOK, handleCancel);
    this.props.history.push(ROUTER_QUESTION_PACK_EDIT);
  }

  editRequest(questionPack) {
    this.props.selectQuestionPack(questionPack, 
      () => console.log("OK"),
      () => console.log("Cancel"));
    this.props.history.push(ROUTER_QUESTION_PACK_EDIT);
  }
  
  renderQuestionPacks(questionPacks) {
    return (
      <Table striped>
        <thead>
          <tr>
            <th scope="column">#</th>
            <th scope="column">Name</th>
            <th scope="column">Number of questions</th>
            <th scope="column">Actions</th>
          </tr>
        </thead>
        <tbody>
          { _.map(questionPacks, (questionPack, id) => {
            return (
              <tr key={id}>
                <th scope="column">{questionPack.id}</th>
                <td>{questionPack.name}</td>
                <td>{questionPack.questions.length}</td>
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

const actions = { closePopup, openPopup, removeQuestionPack, selectQuestionPack, addQuestionPack  };
 
export default connect(mapReducerToState, actions)(QPackListPanel);