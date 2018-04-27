import React, { Component } from 'react';
import SideBarItem from './SideBarItem';

import './SideBar.css';
 
class SideBar extends Component {
    constructor(props) {
      super(props);
      this.items = [
        {
          "title": "Questions",
          "image": "No image yet :( ",
          "href": "/lecturer/question"
        },
        {
          "title": "Question packs",
          "image": "No image yet :( ",
          "href": "/lecturer/question-pack"
        },
      ]
    }

    renderItems() {
      return this.items.map((item, index) => {
        return (<SideBarItem 
          title={item.title}
          image={item.image}
          href={item.href}
          key={index}
          />);
      });
    }

    renderSideBarTitle() {
      return (
        <h3>
          Iliat
        </h3>
      );
    }

    render() {
        return (
            <div className="sidebar">
              {this.renderSideBarTitle()}
              {this.renderItems()}
            </div>
        );
    }
}
 
 
export default SideBar;