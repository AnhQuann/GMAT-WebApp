import React from 'react';
import { Button } from 'reactstrap';

import './PrevButton.css';

export default function(props) {
  return (
    <Button
      color="info"
      className={`prev-button ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
    {props.value}
    </Button>
  )
}