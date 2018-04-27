import React, { Component } from 'react';

import SideBar from '../sidebar/SideBar';

import './LecturerContainer.css';

class LecturerContainer extends Component {
  render() {
    return (
      <div className="lecturer-container">
        <SideBar />
      </div>
    );
  }
}

export default LecturerContainer;