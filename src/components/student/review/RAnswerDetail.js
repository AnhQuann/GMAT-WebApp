import React from 'react';
import { Label, Input } from 'reactstrap';

import './RAnswerDetail.css';

export default function(props) {
  const answerDetail = props.answerDetail;
  return (
    <div className={props.className}>
      {renderHTML(answerDetail.stimulus)}
      {renderHTML(answerDetail.stem)}
      {renderSkip(answerDetail.skip)}
      {renderChoices(answerDetail.choices)}
    </div>
  );
}

function renderHTML(html) {
  return (
    <div className="mb-3">
      <span dangerouslySetInnerHTML={{__html: html}} />
    </div>
  );
}

function renderSkip(skip) {
  if(skip) {
    return <div className="text-danger mb-3">You skipped this question</div>
  }
}

function renderChoices(choices) {
  return (
    choices.map((choice, index) => {
      return (<div key={index} className="d-flex choice-wrapper">
        {renderChoiceRightness(choice)}
        <span>{choice.value}</span>
      </div>)
    })
  );
}

function renderChoiceRightness(choice) {
  if(choice.isRightChoice) {
    return (<i className="fas fa-check text-success" />);
  }
  else if(choice.isSelectedButWrong) {
    return (<i className="fas fa-times text-warning" />);
  } else {
    return (<input type="radio" disabled={true} />);
  }
}