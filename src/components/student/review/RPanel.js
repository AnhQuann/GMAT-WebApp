import React, { Component } from 'react';
import RAnswerDetail from './RAnswerDetail';
import RQuestionExplantion from './RQuestionExplanation';

import { Row, Col } from 'reactstrap';

import './RPanel.css';

export default function(props) {
  const answer = props.answer;
  const userChoice = answer.choice;
  const rightChoice = answer.question.details[0].rightChoice;

  const explanation = answer.question.explanation;
  const answerDetail = {
    stimulus: answer.question.stimulus,
    stem: answer.question.stem,
    skip: (userChoice < 0 || userChoice > 5),
    choices: answer.question.details[0].choices.map((choice, index) => {
      return {
        value: choice,
        isRightChoice: index == rightChoice,
        isSelectedButWrong: index == userChoice && index != rightChoice
      }
    })
  }

  return (
    <div className="rpanel-wrapper">
      <div className="rpanel">
        <div className="question-detail p-3">
          <RAnswerDetail
            answerDetail={answerDetail}
          />
        </div>
        <div className="explanation">
          <RQuestionExplantion
            explanation={explanation}
          />
        </div>
      </div>
    </div>
  );
}
