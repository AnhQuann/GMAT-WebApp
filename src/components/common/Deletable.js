import React from 'react';
import './Deletable.css';
export default function(props) {
  return (
    <div className="deletable" key={props.key}>
      <span>{props.value}</span>
      <i className="fas fa-times fa-sm text-danger" onClick={props.onDeleteClick} />
    </div>
  );
}