import React, { Component } from 'react';
import './App.css';
import Map from './components/map';
import Sidebar from './components/sidebar'
import SearchAPI from './APIs/helper'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar/>
        <Map/>
      </div>
    );
  }
}

export default App;
