import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardDeck, CardTitle, CardText, Button } from 'reactstrap';
import _ from 'lodash';

import { fetchQuestionPacks } from 'actions';

import { ROUTER_PACK } from 'statics';

import QPackCard from './QPackCard';
import NavBar from '../../navbar/NavBar';
import Loading from '../../common/Loading';

class QuestionPackListPanel extends Component {
    constructor(props) {
      super(props);
      this.renderQuestionPacks = this.renderQuestionPacks.bind(this);
    }

    componentWillMount() {
      this.props.fetchQuestionPacks();
    }

    renderQuestionPacks(questionPacks) {
        return _.chunk(_.values(questionPacks), 3).map((questionPackRows, index) => {
            return <Row key={index}>
                { questionPackRows.map((questionPack, index) => {
                    return (
                        <Col md="4" key={index}>
                          <QPackCard
                            header={questionPack.header}
                            title={questionPack.name}
                            link={`${ROUTER_PACK}/${questionPack._id}`}
                            questionCount={questionPack.questions.length}
                          />
                        </Col>
                    );
                }) }
            </Row>;
        });
    }

    render() {
        const questionPacks = this.props.questionPackReducer;
        return (
            <div>
                <NavBar />
                <Container className="question_pack_list">
                    { !!questionPacks ?
                        this.renderQuestionPacks(questionPacks)
                        :
                        <Loading />
                    }
                </Container>
            </div>
        );
    }
}

function mapReducerToProps({ questionPackReducer }) {
    return { questionPackReducer };
}

const actions = {
  fetchQuestionPacks
}

export default connect( mapReducerToProps, actions )(QuestionPackListPanel);