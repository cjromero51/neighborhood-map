import React, {Component} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

//creates markers on map based on app.js inputs
//animations based on the value of current isOpen / isClosed
const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={5}
    zoom={ props.zoom }
    defaultCenter={{ lat: 34.0522,lng: 118.2437 }}
    center={ props.center }
    onerror={"Map failed to load, please refresh the page"}
  >
    {props.markers && props.markers.filter(mark => mark.isVisible)
      .map((marker,index,arr) => {
        const venueData = props.venues.find(venue => venue.id === marker.id)
      return (
      <Marker tabIndex="1" key={index} position={{ lat: marker.lat, lng: marker.lng }} onClick={() => props.markerClick(marker)} animation={marker.isOpen ? marker.animation : marker.animation2}>
      {marker.isOpen && venueData.bestPhoto && (
        <InfoWindow tabIndex="1" onClick={() => props.infoWindowClosed(marker)}>
          <React.Fragment>
            <p>{venueData.name}</p>
          <img src={`${venueData.bestPhoto.prefix}150x150${venueData.bestPhoto.suffix}`} alt={`${venueData.name} scenery`}/>
          </React.Fragment>
        </InfoWindow>
      )}
    </Marker>
  )})
  }
  </GoogleMap>
))

class Map extends Component {
  componentDidMount(){
    window.gm_authFailure = () => {
      alert('ERROR \nGetting the map failed.')
      console.log('ERROR \nGetting the map failed.')
    }
  }
  render() {
    return (
      <MyMapComponent
        className="map"
        {...this.props}
        googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyD_rQ82cUaUQCWKy4yaKARttEo3gEaFbbg'}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%`, width:`75%`, position:`right` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}

export default Map;
