import React, { Component } from 'react';

import SideBar from '../sidebar/SideBar';
import LecturerPanel from './LecturerPanel';

import './LecturerContainer.css';

class LecturerContainer extends Component {
  render() {
    return (
      <div className="lecturer-container">
        <SideBar />
        <LecturerPanel />
      </div>
    );
  }
}

export default LecturerContainer;