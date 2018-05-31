import React from 'react';
import { Button } from 'reactstrap';

import './DoneButton.css';

export default function(props) {
  return (
    <Button
      color="info"
      className={`done-button ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.value}
    </Button>
  );
}