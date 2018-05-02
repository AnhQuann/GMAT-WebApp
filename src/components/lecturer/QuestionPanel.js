import React, { Component } from 'react';
import { connect } from 'react-redux';
 
class QuestionPanel extends Component {
    componentDidMount() {
      console.log(this.props.questionReducer);
    }

    render() {
        return (
            <div>
            QuesitonPanel
            </div>
        )
    }
}

function mapReducerToProps( { questionReducer } ) {
  return { questionReducer };
}

export default connect(mapReducerToProps)(QuestionPanel);
