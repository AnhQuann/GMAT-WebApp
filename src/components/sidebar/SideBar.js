import React, { Component } from 'react';

import SideBarItem from './SideBarItem';
 
class SideBar extends Component {
    render() {

        return (
            <div>
                <SideBarItem title={"Questions"} image={<i className="fab fa-pied-piper"></i>}/>
            </div>
        );
    }
}
 
 
export default SideBar;