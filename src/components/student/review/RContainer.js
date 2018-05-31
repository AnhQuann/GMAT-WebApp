import React, { Component } from 'react';
import RPanel from './RPanel';
import RNavBar from './RNavbar';

import { fetchResult } from '../../networks';

import './RContainer.css';
  
class RContainer extends Component {
  constructor(props) {
    super(props);
    this.onPrevClick = this.onPrevClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.onDoneClick = this.onDoneClick.bind(this);
    this.state = {
      answers: null,
      currentAnswerIndex: 0
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

  render() {
    const answers = this.state.answers;
    const currentAnswerIndex = this.state.currentAnswerIndex;
    
    if(!answers || !answers.length) return (<div className="panel">Loading...</div>);
    const currentAnswer = answers[currentAnswerIndex];

    return (
      <div className="rcontainer">
        <RNavBar
          onPrevClick={this.onPrevClick} prevDisabled={currentAnswerIndex === 0}
          onNextClick={this.onNextClick} nextDisabled={currentAnswerIndex === answers.length - 1}
          onDoneClick={this.onDoneClick} 
        />
        <RPanel answer={currentAnswer} />
      </div>
    );
  }

  onDoneClick() {
    this.props.history.goBack();
  }

  onPrevClick() {
    const {currentAnswerIndex} = this.state;
    if(currentAnswerIndex  > 0) {
      this.setState({
        currentAnswerIndex: currentAnswerIndex - 1
      });
    }
  }

  onNextClick() {
    const {answers, currentAnswerIndex} = this.state;
    if(currentAnswerIndex < answers.length - 1) {
      this.setState({
        currentAnswerIndex: currentAnswerIndex + 1
      });
    }
  }
}

export default RContainer;