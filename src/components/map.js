import React, {Component} from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    zoom={ props.zoom }
    defaultCenter={{ lat: 34.0522,lng: 118.2437 }}
    center={ props.center }
  >
    {props.markers && props.markers.filter(mark => mark.isVisible)
      .map((marker,index) => {
        const venueData = props.venues.find(venue => venue.id === marker.id)
      return (
      <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} onClick={() => props.markerClick(marker)}>
      {marker.isOpen && venueData.bestPhoto && (
        <InfoWindow onClick={() => props.infoWindowClosed(marker)}>
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
  render() {
    return (
      <MyMapComponent
        className="map"
        {...this.props}
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyD_rQ82cUaUQCWKy4yaKARttEo3gEaFbbg"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%`, width:`75%`, position:`right` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    )
  }
}

export default Map;
