import React, { Component } from 'react';


class ExpandableList extends Component {
  constructor(){
    super()
    this.state = {
      icons: {}
    };
  }
  render(){
    const { items } = this.props;
    console.log(items)
    return <ul>
    </ul>
  }
}

export default ExpandableList;
