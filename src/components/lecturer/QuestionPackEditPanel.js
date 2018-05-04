import React, { Component } from 'react';
import { FormGroup, Input, Label, Button } from 'reactstrap';
import QuestionListInPack from './QuestionListInPack';
 
class QuestionPackEditPanel extends Component {
    render() {
        return (
          <div className="panel">
            <h3>Edit question pack</h3>
            <FormGroup>
              <legend>Name</legend>
              <Input />
            </FormGroup> 
            <FormGroup>
                <Label>Questions</Label>
                <Button className="float-right">Add question</Button>
              <QuestionListInPack />
            </FormGroup>
          </div>
        )
    }
}
 
 
export default QuestionPackEditPanel;