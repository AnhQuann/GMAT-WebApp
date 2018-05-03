import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './QuestionPanel.css';

import { loadCurrentQuestion } from '../../actions/currentQuestion';

class QuestionPanel extends Component {

    state = {
        questions: this.props.questionReducer
    }

    render() {
        return (
            <div className='question-panel'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th className='th-no'>#</th>
                            <th className='th-stimulus'>Stimulus</th>
                            <th className='th-difficulty'>Difficulty</th>
                            <th className='th-action'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderQuestions(this.state.questions)}
                    </tbody>
                </table>
            </div>
        )
    }

    renderQuestions(questions) {
        return questions.map((question, index) => {
            const shortStimulus = question.stimulus.length > 100 ? `${question.stimulus.substring(0, 100)}...`
                : question.stimulus;

            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{shortStimulus}</td>
                    <td>{this.renderDifficulty(question.difficulty)}</td>
                    <td>
                        <Link to='/lecturer/question-detail'>
                            <button type="button" className="btn btn-info" onClick={() => this.onEditQuestion(question)}>Edit</button>
                        </Link>
                        <button type="button" className="btn btn-danger" onClick={() => this.onDeleteQuestion(questions, index)}>Delete</button>
                    </td>
                </tr>
            )
        })
    }

    renderDifficulty(difficulty) {
        switch (difficulty) {
            case 0: return (<span className='q-easy'>Easy</span>);
            case 1: return (<span className='q-medium'>Medium</span>);
            case 2: return (<span className='q-hard'>Hard</span>);
            case 3: return (<span className='q-very-hard'>Very hard</span>);
            default: return (<span>Unknown</span>);
        }
    }

    onEditQuestion(question) {
        this.props.loadCurrentQuestion(question);
    }

    onDeleteQuestion(questions, index) {
        _.remove(questions, {
            id: questions[index].id
        });
        this.setState({
            questions: questions
        });
    }
}

function mapReducerToProps({ questionReducer }) {
    return { questionReducer };
}

export default connect(mapReducerToProps, { loadCurrentQuestion })(QuestionPanel);