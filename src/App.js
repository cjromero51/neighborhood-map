import React, { Component } from 'react';
import './App.css';
import Map from './components/map';
import Sidebar from './components/sidebar'
import SearchAPI from './APIs/helper'

class App extends Component {
  state = {
    venues: [],
    markers: [],
    center: [],
    zoom: 14
  }
  //clears all info windows from the screen
  clearInfoWindow = () => {
    let currentMarkers = this.state.markers;
    let markerIsOpenArray = [];
    currentMarkers.map(marker => {
      marker.isOpen = false;
      return markerIsOpenArray.push(marker)
    })
    currentMarkers = markerIsOpenArray;
    this.setState({markers: Object.assign(this.state.markers,currentMarkers)})
  }
  //event fires when a marker is clicked directly
  markerClick = marker => {
    this.clearInfoWindow();
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers,marker)});
    const filteredVenues = this.state.venues.find(venue => venue.id === marker.id)
    SearchAPI.getVenueData(marker.id).then(res => {
      const mergedVenue = Object.assign(filteredVenues, res.response.venue)
      console.log(mergedVenue, "merged venue")
      this.setState({venues: Object.assign(this.state.venues, mergedVenue)})
      console.log(this.state.venues, "post")
    })
  }
  clickedVenue = place => {
    const correspondingMarker = this.state.markers.find(marker => marker.id === place.id)
    this.markerClick(correspondingMarker);
  }
  //sets the marker to closed to close info window
  infoWindowClosed = marker => {
    marker.isOpen = false;
    this.setState({markers: Object.assign(this.state.markers,marker)})
  }

  componentDidMount(){
    SearchAPI.searchVenues({
      near:"Castaic, CA",
      limit: 5
    }).then( search => {
      const { venues } = search.response
      const { center } = search.response.geocode.feature.geometry
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        }
      })
      this.setState({venues, center, markers})
    })
  }

  render() {
    return (
      <div className="App" style={{display:`flex`}}>
        <Sidebar
          {...this.state}
          clickedVenue={this.clickedVenue}
          markerClick={this.markerClick}
          />
        <Map
        {...this.state}
        markerClick={this.markerClick}
        oneMarker={this.oneMarker}
        infoWindowClosed={this.infoWindowClosed}
        clearInfoWindow={this.clearInfoWindow}
        componentDidMount={this.componentDidMount}
        />
      </div>
    );
  }
}

export default App;
