import React from 'react';

import NextButton from '../../common/NextButton';
import PrevButton from '../../common/PrevButton';
import DoneButton from '../../common/DoneButton';

import './RNavbar.css';
  
export default function(props) {
  return (
    <div className="navbar">
      <PrevButton value="Back" onClick={props.onPrevClick} disabled={props.prevDisabled} />
      <NextButton value="Next" onClick={props.onNextClick} disabled={props.nextDisabled} className="ml-1" />
      <DoneButton value="Done" onClick={props.onDoneClick} disabled={props.doneDisabled} className="ml-4"/>
    </div>
  );
}