import _ from 'lodash';
import React from 'react';
import { Input } from 'reactstrap';

export default function(props) {
  const search = _.debounce(props.search, 300);
  return (
    <Input
      className={props.className}
      placeholder={props.placeholder}
      onChange={(event) => search(event.target.value)}
    />
  )
}