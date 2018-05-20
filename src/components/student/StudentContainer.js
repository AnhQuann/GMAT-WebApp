import React, { Component } from 'react';
import { Container } from 'reactstrap';

import StudentPanel from './StudentPanel';

class StudentContainer extends Component {
    render() {
      return (
        <div>
          <StudentPanel />
        </div>
        
      );
    }
}

export default StudentContainer;