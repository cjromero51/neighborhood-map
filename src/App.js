import React, { Component } from 'react';
import './App.css';
import Map from './components/map';
import Sidebar from './components/sidebar'

class App extends Component {
  state = {

  }
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
