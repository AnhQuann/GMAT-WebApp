import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import LecturerContainer from './components/lecturer/LecturerContainer';
import Popup from './components/common/Popup';

class App extends Component {
  render() {
    return (
      <div>
        <Popup />
        <LecturerContainer />
      </div>
    );
  }
}

export default withRouter(App);
