import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';

import QList from './QList';
import { searchQuestion } from '../../actions';

class QPackAddQuestionModal extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
  }

  componentWillMount() {
    this.setState({
      // isOpen: this.props.isOpen   
      isOpen: true
    });
    this.props.searchQuestion("");
  }

  close() {
    this.setState({
      isOpen: false
    });
  }

  render() {
      const questions = this.props.questionSearchResultReducer;
      return (
        <Modal isOpen={this.state.isOpen} toggle={this.close} >
          <ModalHeader>Add question</ModalHeader>
          <ModalBody>
            <Input placeholder="Search here"></Input>
            <QList questions={questions} />
            <div className="d-flex mt-2 justify-content-end">
              <Button color="secondary" >Cancel</Button>
              <Button color="primary" className="ml-2" >OK</Button>
            </div>
          </ModalBody>
        </Modal>
      );
  }
}

function mapReducerToProps({ questionSearchResultReducer }) {
  return { questionSearchResultReducer };
}

const actions = {
  searchQuestion
};

export default connect(mapReducerToProps, actions)(QPackAddQuestionModal);