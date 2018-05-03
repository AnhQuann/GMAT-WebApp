import React, { Component } from 'react';

import SideBar from '../sidebar/SideBar';
import LecturerPanel from './LecturerPanel';
 
class LecturerComtainer extends Component {
    render() {
        const sideBarItems = [
            {
                title: 'Questions',
                image: <i className="fab fa-pied-piper"></i>,
                href: '/lecturer/question'
            },
            {
                title: 'Packs',
                image: <i className="fas fa-archive"></i>,
                href: '/lecturer/question-pack'
            }
        ]

        return (
            <div className='h-100 d-flex'>
                <SideBar items = {sideBarItems} title = 'GMAT'/>
                <LecturerPanel/>
            </div>
        )
    }
}
 
 
export default LecturerComtainer;