import React, { Component } from 'react';
import { Link } from 'react-router-dom';
 
class SideBarItem extends Component {
    render() {
        const image = this.props.image ? this.props.image : "No image";
        const title = this.props.title ? this.props.title : "No title";
        const href = this.props.href ? this.props.href : "No link provided"
        return (
            <Link to={ href }>
              { image }
              <span> { title } </span>
            </Link>
        );
    }
}
 
 
export default SideBarItem;