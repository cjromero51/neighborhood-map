import React, { Component } from 'react';
import './App.css';
import Map from './components/map';
import Sidebar from './components/sidebar'
import SearchAPI from './APIs/helper'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 14
    }
  }
  componentDidMount(){
    SearchAPI.searchVenues({
      near:"Los Angeles, CA",
      query: 'lol',
      limit: 10
    }).then( search => {
      const { venues } = search.response
      const { center } = search.response.geocode.feature.geometry
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true
        }
      })
      this.setState({venues, center, markers})
      console.log(search)
    })
  }
  render() {
    return (
      <div className="App">
        <Sidebar/>
        <Map {...this.state}/>
      </div>
    );
  }
}

export default App;
