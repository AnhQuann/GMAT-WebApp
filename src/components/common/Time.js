import moment from 'moment';
import React from 'react';

export default function(props) {
  const value = props.value;
  return (
    <span>
      {
        moment()
        .startOf('day')
        .seconds(value)
        .format(`${value > 3600 ? 'H:mm:ss' : 'm:ss'}`)
      }
    </span>
  )
}