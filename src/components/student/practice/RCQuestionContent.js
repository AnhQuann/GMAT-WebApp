import React from 'react';
import UserChoiceForm from './UserChoice.form';

import "./RCQuestionContent.css"

export default function(props) {
  const {
    stimulus,
    stem,
    choices,
    onSubmitUserChoice
  } = props;
  return (
    <div className="rc-content-panel py-1">
      <div className="allow-scroll">
        <p dangerouslySetInnerHTML={{ __html: stimulus}} />  
      </div>
      <div className="pl-3">
        <div>
          <p dangerouslySetInnerHTML={{ __html: stem}} />       
        </div>
        <UserChoiceForm
          onSubmit={onSubmitUserChoice}
          choices={choices}
          initialValues={{choice: -1}}
        />
      </div>
    </div>
  );
}