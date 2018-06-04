import React from 'react';
import {Link} from 'react-router-dom';
import './QPackCard.css'

export default function(props) {
  return (
    <Link to={props.link}>
      <div className="card qpack-card">
        <div className="qpack-body">
          <span className="week">{props.header}</span>        
          <span className="title">{props.title}</span>
          <div className="q-type">
            <span>CR</span> &#160;
            <span className="blur">RC</span> &#160;
            <span>SC</span>
          </div>
        </div>
        <div className="qpack-q-stats">
          <div className="q-pack-stat-detail">
            <span className="big">{props.questionCount}</span>
            <span className="title">Questions</span>
          </div>
        </div>
      </div>
    </Link>
  );
}