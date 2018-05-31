import React from 'react';
import { Button } from 'reactstrap';

import './NextButton.css';

export default function(props) {
  return (
  <Button
    color="info"
    className={`next-button ${props.className}`}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    {props.value}
  </Button>
  )
}