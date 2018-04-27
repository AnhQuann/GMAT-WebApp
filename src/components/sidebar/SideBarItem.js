import React, { Component } from 'react';
 
 
class SideBarItem extends Component {
    render() {
        const image = this.props.image ? this.props.image : "No image";
        const title = this.props.title ? this.props.title : "No title";

        return (
            <div>
                {image}
                <span>{title}</span>
            </div>
        )
    }
}
 
 
export default SideBarItem;