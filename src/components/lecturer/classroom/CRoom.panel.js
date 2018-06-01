import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ROUTER_CLASS_ROOM, ROUTER_CLASS_ROOM_ADD, ROUTER_CLASS_ROOM_EDIT } from 'statics';

import CRoomAddPanel from './CRoomAdd.panel';
import CRoomEditPanel from './CRoomEdit.panel';
import CRoomListPanel from './CRoomList.panel';

export default function(props) {
  return (
    <Switch>
      <Route path={ROUTER_CLASS_ROOM_ADD} component={CRoomAddPanel} />
      <Route path={`${ROUTER_CLASS_ROOM_EDIT}/:id`} component={CRoomEditPanel} />
      <Route path={ROUTER_CLASS_ROOM} component={CRoomListPanel} />
    </Switch>
  );
}