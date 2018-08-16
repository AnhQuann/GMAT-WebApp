import React from 'react';
import { Link } from 'react-router-dom';
import './QPackCard.css'

export default function(props) {
  const {
    header,
    title,
    questionCount,
    questionTypes
  } = props;
  const renderType = (qType) => {
    if(questionTypes.includes(qType)) {
      return <span>{qType}</span>
    } else {
      return <span className="blur">{qType}</span>      
    }
  };

  return (
    <Link to={props.link}>
      <div className="card qpack-card">
        <div className="qpack-body">
          <span className="week">{header}</span>        
          <span className="title">{title}</span>
          <div className="q-type">
            {renderType("CR")} &#160;
            {renderType("SC")} &#160;
            {renderType("RC")}
          </div>
        </div>
        <div className="qpack-q-stats">
          <div className="q-pack-stat-detail">
            <span className="big">{questionCount}</span>
            <span className="title">Questions</span>
          </div>
        </div>
      </div>
    </Link>
  );
}