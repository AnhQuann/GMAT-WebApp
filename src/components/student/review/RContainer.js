import React, { Component } from 'react';
import RPanel from './RPanel';
import RNavBar from './RNavbar';

import { fetchResult } from 'networks';

import './RContainer.css';
  
class RContainer extends Component {
  constructor(props) {
    super(props);
    this.onPrevClick = this.onPrevClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.onDoneClick = this.onDoneClick.bind(this);
    this.state = {
      answers: null,
      currentAnswerIndex: 0,
      currentChoiceIndex: 0
    };
  }

  componentWillMount() {
    const resultId = this.props.match.params.id;
    if(!!resultId) {
      fetchResult(resultId).then((result) => {
        this.setState({
          answers: result.answers
        });
      });
    }
  }

  currentChoiceIsFirst() {
    return this.state.currentChoiceIndex === 0;
  }

  currentChoiceIsLast() {
    const {currentAnswerIndex, currentChoiceIndex, answers} = this.state;
    const currentAnswer = answers[currentAnswerIndex];
    return currentChoiceIndex == currentAnswer.userChoices.length - 1;
  }

  currentAnswerIsFirst() {
    return this.state.currentAnswerIndex === 0;
  }

  currentAnswerIsLast() {
    const {currentAnswerIndex, answers} = this.state;
    return currentAnswerIndex === answers.length - 1;
  }


  render() {
    const {answers,currentAnswerIndex, currentChoiceIndex} = this.state;
    
    if(!answers || !answers.length) return (<div className="panel">Loading...</div>);
    const currentAnswer = answers[currentAnswerIndex];
    const currentChoice = currentAnswer.userChoices[currentChoiceIndex];
    const currentDetail = currentAnswer.question.details[currentChoiceIndex];
    return (
      <div className="rcontainer">
        <RNavBar
          onPrevClick={this.onPrevClick} prevDisabled={this.currentChoiceIsFirst() && this.currentAnswerIsFirst()}
          onNextClick={this.onNextClick} nextDisabled={this.currentChoiceIsLast() && this.currentAnswerIsLast()}
          onDoneClick={this.onDoneClick} 
        />
        <RPanel answer={currentAnswer} userChoice={currentChoice} detail={currentDetail} />
      </div>
    );
  }

  onDoneClick() {
    this.props.history.goBack();
  }

  onPrevClick() {
    const {answers, currentAnswerIndex, currentChoiceIndex} = this.state;
    if(!this.currentChoiceIsFirst()) {
      this.setState({
        currentChoiceIndex: currentChoiceIndex - 1
      });
    }
    else if(!this.currentAnswerIsFirst()) {
      const currentAnswer = answers[currentAnswerIndex];
      this.setState({
        currentAnswerIndex: currentAnswerIndex - 1,
        currentChoiceIndex: currentAnswer.userChoices.length - 1
      });
    }
  }

  onNextClick() {
    const {currentAnswerIndex, currentChoiceIndex} = this.state;
    if(!this.currentChoiceIsLast()) {
      this.setState({
        currentChoiceIndex: currentChoiceIndex + 1
      });
    }
    else if(!this.currentAnswerIsLast()) {
      this.setState({
        currentAnswerIndex: currentAnswerIndex + 1,
        currentChoiceIndex: 0
      });
    }
  }
}

export default RContainer;