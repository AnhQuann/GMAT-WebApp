import React from 'react';
import UserChoiceForm from './UserChoice.form';

import "./RCQuestionContent.css"

export default function(props) {
  const {
    stimulus,
    stem,
    choices,
    onSubmitUserChoice,
    currentUserChoice
  } = props;
  return (
    <div className="rc-content-panel py-1">
      <div className="allow-scroll pr-3">
        <p dangerouslySetInnerHTML={{ __html: stimulus}} />  
      </div>
      <div className="px-3 allow-scroll">
        <div>
          <p dangerouslySetInnerHTML={{ __html: stem}} />       
        </div>
        <UserChoiceForm
          onSubmit={onSubmitUserChoice}
          choices={choices}
          initialValues={{choice: currentUserChoice}}
        />
      </div>
    </div>
  );
}