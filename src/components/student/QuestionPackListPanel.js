import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardDeck, CardTitle, CardText, Button } from 'reactstrap';
import _ from 'lodash';

import { ROUTER_PACK } from '../../constants';

class QuestionPackListPanel extends Component {
    constructor(props) {
        super(props);

        this.renderQuestionPacks = this.renderQuestionPacks.bind(this);
    }

    renderQuestionPacks(questionPacks) {
        return _.chunk(_.values(questionPacks), 3).map((questionPackRows, index) => {
            return <Row key={index}>
                { questionPackRows.map((questionPack, index) => {
                    return (
                        <Col md="4" key={index}>
                            <Card body outline color="info">
                                <CardTitle>{questionPack.name}</CardTitle>
                                <CardText>Number of Questions: {questionPack.questions.length}</CardText>
                                <Link to={`${ROUTER_PACK}/${questionPack.id}`}>
                                    <Button color="success">Start</Button>
                                </Link>
                            </Card>
                        </Col>
                    );
                }) }
            </Row>;
        });
    }

    render() {
        return (
            <Container className="question_pack_list">
                { this.renderQuestionPacks(this.props.questionPackReducer) }
            </Container>
        );
    }
}

function mapReducerToProps({ questionPackReducer }) {
    return { questionPackReducer };
}

export default connect( mapReducerToProps, {} )(QuestionPackListPanel);