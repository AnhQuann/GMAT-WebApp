import React, { Component } from 'react';

import UserPanel from '../common/UserPanel';
import SideBar from '../sidebar/SideBar';
import LecturerPanel from './LecturerPanel';

import { ROUTER_QUESTION, ROUTER_QUESTION_PACK  } from '../../constants/urls';
 
class LecturerComtainer extends Component {
    render() {
        const sideBaritems = [
          {
            title: "Questions",
            image: <i className="fab fa-pied-piper"></i>,
            href: ROUTER_QUESTION
          },
          {
            title: "Packs",
            image: <i className="fas fa-archive"></i>,
            href: ROUTER_QUESTION_PACK
          },
        ]
        return (
          <div className="h-100 d-flex">
            <SideBar items={sideBaritems} title="GMAT" />
            <div>
              <UserPanel />
              <LecturerPanel />
            </div>
          </div>
        )
    }
}
 
 
export default LecturerComtainer;