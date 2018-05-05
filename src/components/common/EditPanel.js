import React, { Component } from 'react';
import _ from 'lodash';
 
class EditPanel extends Component {
  constructor(props) {
    super(props);
    this.blurToState = this.blurToState.bind(this);
    this.tryGet = this.tryGet.bind(this);
  }

  blurToState(propName, converter=null) {
    const blur = (event) => {
      const newState = _.cloneDeep(this.state);
      const value = converter == null ? event.target.value: converter(event.target.value);
      _.set(newState, propName, value);
      this.setState(newState);
    };
    return blur.bind(this);
  }

  tryGet(path, defaultValue, converter=null) {
    const value = this.state[path];
    if (value) return converter == null ? value : converter(value);
    return defaultValue;
  }
}
 
 
export default EditPanel;