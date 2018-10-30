import React, { Component } from 'react';
import Searchbar from './searchbar';

class Sidebar extends Component {
  state = {

  }
  render() {
    return (
      <div className="sidebar">
        <Searchbar/>
      </div>
    );
  }
}

export default Sidebar;
