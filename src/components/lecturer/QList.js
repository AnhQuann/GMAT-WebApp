import React from 'react';
import { Table } from 'reactstrap';
import _ from 'lodash';

import { elipsis } from '../../utils';

export default function(props) {
    const questions = props.questions;
    const hideActions = !props.onEditRequest && !props.onDeleteRequest;
    return (
      <Table striped>
        <thead className="">
          <tr className="">
            <th className="th-no">#</th>
            <th className="th-stimulus">Stimulus</th>
            <th className="th-difficulty">Difficulty</th>
            {!hideActions && <th className="">Actions</th>}
          </tr>
        </thead>
        <tbody className="container">
          { 
            _.map(questions, (question, id) => {
              return renderQuestion(question, id, props.onEditRequest, props.onDeleteRequest)
            })
          }
        </tbody>
    </Table>
    );
}

function renderQuestion(question, id, editRequest, deleteRequest) {
  const hideActions = !editRequest && !deleteRequest;
  return (
    <tr key={id}>
      <th scope="row" className="td-no">{ id } </th>
      <td className="td-stimulus">{ elipsis(question.stimulus) }</td>
      <td className="td-difficulty">{ renderDifficulty(question.difficulty) }</td>
      { !hideActions &&
        <td>
          {editRequest && <i className="far fa-edit question-edit" onClick={() => editRequest(question)}></i>}
          {deleteRequest && <i className="fas fa-trash question-remove" onClick={() => deleteRequest(question)}></i>}
        </td>
      }
    </tr>
  );
}

function renderDifficulty(difficulty) {
  switch(difficulty) {
    case 0: return (<span className="q-difficulty q-easy">Easy</span>);
    case 1: return (<span className="q-difficulty q-medium">Medium</span>);
    case 2: return (<span className="q-difficulty q-hard">Hard</span>);
    case 3: return (<span className="q-difficulty q-very-hard">Very hard</span>);
    default: return (<span>Unknown</span>);
  }
}