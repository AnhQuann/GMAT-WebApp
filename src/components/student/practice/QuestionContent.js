import React from 'react';
import UserChoiceForm from './UserChoice.form';

export default function (props) {
  const {
    stimulus,
    stem,
    choices,
    onSubmitUserChoice
  } = props;
  return (
    <div className="question-content allow-scroll">
      <div>
        <p dangerouslySetInnerHTML={{ __html: stimulus}} />  
      </div>
      <div>
        <p dangerouslySetInnerHTML={{ __html: stem}} />       
      </div>
      <UserChoiceForm
        onSubmit={onSubmitUserChoice}
        choices={choices}
        initialValues={{choice: -1}}
      />
    </div>
  );
}