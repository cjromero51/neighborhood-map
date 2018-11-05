/* global google */
import React, { Component } from 'react';
import './App.css';
import Map from './components/map';
import Sidebar from './components/sidebar'
import SearchAPI from './APIs/helper'

class App extends Component {
  state = {
    venues: [],
    markers: [],
    center: { lat: 34.0522,lng: 118.2437 },
    zoom: 8,
    updateState: (state) => {
      this.setState({state})
    }
  }
  //clears all info windows from the screen
  clearInfoWindow = () => {
    let currentMarkers = this.state.markers;
    let markerIsOpenArray = [];
    currentMarkers.map(marker => {
      marker.isOpen = false;
      // marker.animation = google.maps.Animation.DROP
      return markerIsOpenArray.push(marker)
    })
    currentMarkers = markerIsOpenArray;
    this.setState({markers: Object.assign(this.state.markers,currentMarkers)})
  }
  //event fires when a marker is clicked directly
  markerClick = marker => {
    if (marker.isOpen) {
      this.clearInfoWindow();
    } else {
      this.clearInfoWindow();
      marker.isOpen = true;
      // marker.animation = google.maps.Animation.BOUNCE
      this.setState({markers: Object.assign(this.state.markers,marker)});
      const filteredVenues = this.state.venues.find(venue => venue.id === marker.id)
      SearchAPI.getVenueData(marker.id).then(res => {
        const mergedVenue = Object.assign(filteredVenues, res.response.venue)
        this.setState({venues: Object.assign(this.state.venues, mergedVenue)})
      })
    }
  }
  //clicked venue from sidebar
  clickedVenue = place => {
    const correspondingMarker = this.state.markers.find(marker => marker.id === place.id)
    this.markerClick(correspondingMarker);
  }
  //sets the marker to closed to close info window
  infoWindowClosed = marker => {
    marker.isOpen = false;
    this.setState({markers: Object.assign(this.state.markers,marker)})
  }
//initial load of markers
  componentDidMount(){
    SearchAPI.searchVenues({
      near:"Valencia, CA",
      query:'food',
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
          id: venue.id,
          animation: google.maps.Animation.BOUNCE,
          animation2: google.maps.Animation.DROP
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
        somefunction={this.somefunction}
        />
      </div>
    );
  }
}

export default App;
