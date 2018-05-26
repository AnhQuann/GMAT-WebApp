import React, { Component } from 'react';
  
class RQuestionExplanation extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <span dangerouslySetInnerHTML={{__html: this.props.explanation}} />
      </div>
    );
  }
}
  
  
export default RQuestionExplanation;