import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, CardDeck, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import _ from 'lodash';

import UserPanel from '../common/UserPanel';
import Loading from '../common/Loading';
import { fetchQuestionPacks } from '../../actions';

import { ROUTER_PACK } from '../../constants';

class QuestionPackListPanel extends Component {
    constructor(props) {
        super(props);
        this.renderQuestionPacks = this.renderQuestionPacks.bind(this);
        this.goToQuestionPackById = this.goToQuestionPackById.bind(this);
    }

    componentWillMount() {
        this.props.fetchQuestionPacks();
    }

    goToQuestionPackById(questionPackId) {
        this.props.history.push(`${ROUTER_PACK}/${questionPackId}`);
    }

    renderQuestionPacks(questionPacks) {
        return _.chunk(_.values(questionPacks), 3).map((questionPackRows, index) => {
            return <Row key={index}>
                { questionPackRows.map((questionPack, index) => {
                    return (
                        <Col md="4" key={index}>
                            <Card outline color="info">
                                <CardBody>
                                    <CardTitle>{questionPack.name}</CardTitle>
                                    <CardText>Number of Questions: {questionPack.questions.length}</CardText>
                                    <Button disabled={ questionPack.questions.length <= 0 } className="float-right" color="success" onClick={() => { this.goToQuestionPackById(questionPack._id) }}>Start</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    );
                }) }
            </Row>;
        });
    }

    render() {
        if(Object.keys(this.props.questionPackReducer).length > 0) {
            return (
                <Container className="question_pack_list">
                    <UserPanel />
                    { this.renderQuestionPacks(this.props.questionPackReducer) }
                </Container>
            );
        } else {
            return <Loading />;
        }
    }
}

function mapReducerToProps({ questionPackReducer }) {
    return { questionPackReducer };
}

const actions = {
    fetchQuestionPacks
};

export default connect( mapReducerToProps, actions )(QuestionPackListPanel);