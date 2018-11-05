import React, { Component } from 'react';
import VenueList from './venuelist'
class Sidebar extends Component {

  state = {
    query: '',
    venues: this.props.venues,

  }
  //updates markers according to search input
  inputChange = (event) => {
    this.setState({ query: event.target.value })
    const markers = this.props.venues.map(venue => {
      let matchedVenue = false;
      if (venue.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1) {
        matchedVenue = true;
      } else {
        matchedVenue = false;
      }
      const specificMarker = this.props.markers.find(marker => marker.id === venue.id)
      if (matchedVenue) {
        specificMarker.isVisible = true;
      } else {
        specificMarker.isVisible = false;
      }
      return specificMarker;
    })
    this.props.updateState({markers})
  }
// updates venue list in sidebar according to search input
  filterVenues = () => {
    if (this.state.query !== '') {
      const venues = this.props.venues.filter(venue =>
        venue.name.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1);
      return venues
    }
      return this.props.venues
  }

  render() {
    return (
      <div className="sidebar" style={{width:`25%`, height:`100%`}}>
        <div className="search-container">
          <input
            aria-label="Search Google Maps"
            tabIndex="1"
            id={"search-bar"}
            type="search"
            placeholder="Search"
            onChange={(event) => this.inputChange(event)}
            value={this.state.query.value}
            />
        </div>
        <VenueList
          {...this.props}
          venues={this.filterVenues()}
          clickedVenue={this.props.clickedVenue}
          markerClick={this.props.markerClick}
          />
      </div>
    );
  }
}

export default Sidebar;
