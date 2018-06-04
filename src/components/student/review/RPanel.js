import React, { Component } from 'react';
import RAnswerDetail from './RAnswerDetail';
import RQuestionExplantion from './RQuestionExplanation';

import { Row, Col } from 'reactstrap';

import './RPanel.css';

export default function(props) {
  const {answer, userChoice, detail} = props;
  const rightChoice = detail.rightChoice;
  const explanation = detail.explanation;
  
  const answerDetail = {
    stimulus: answer.question.stimulus,
    stem: detail.stem,
    skip: (userChoice.choice < 0 || userChoice.choice > 5),
    choices: detail.choices.map((questionChoice, index) => {
      return {
        value: questionChoice,
        isRightChoice: index == rightChoice,
        isSelectedButWrong: index == userChoice.choice && index != rightChoice
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
