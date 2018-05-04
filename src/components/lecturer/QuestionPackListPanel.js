import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap';
import _ from 'lodash';
 
class QuestionPackListPanel extends Component {
  render() {
    const questionPacks = this.props.questionPackReducer;
    return (
      <div className="panel">
        <Button className="add-button-right" color="primary" >Add new pack</Button>
        { this.renderQuestionPacks(questionPacks) }
      </div>
    );
  }
  
  renderQuestionPacks(questionPacks) {
    return (
      <Table stripped>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Number of questions</th>
          </tr>
        </thead>
        <tbody>
          { _.map(questionPacks, (questionPack, id) => {
            return (
              <tr>
                <td>{questionPack.id}</td>
                <td>{questionPack.name}</td>
                <td>{questionPack.questionCount}</td>
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
 
export default connect(mapReducerToState)(QuestionPackListPanel);