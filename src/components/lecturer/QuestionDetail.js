import React, { Component } from 'react';
import { connect } from 'react-redux';

class QuestionDetail extends Component {
    render() {
        console.log(this.props.currentQuestionReducer)
        return (
            <div> 
                
            </div>
        )
    }
}

function mapReducerToProps({currentQuestionReducer}) {
    return {currentQuestionReducer};
};
 
export default connect(mapReducerToProps)(QuestionDetail);