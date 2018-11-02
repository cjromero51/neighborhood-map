import React, { Component } from 'react';
import Searchbar from './searchbar';
import VenueList from './venuelist'
class Sidebar extends Component {
  state = {

  }
  render() {
    return (
      <div className="sidebar" style={{width:`25%`, height:`100%`}}>
        <Searchbar {...this.props}/>
        <VenueList {...this.props}/>
      </div>
    );
  }
}

export default Sidebar;
