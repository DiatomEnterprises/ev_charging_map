/*global google*/
import React from 'react';
import ReactDOM from 'react-dom';

const { compose, withProps, withHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

export const MapWithMarkers = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA4Bobct-Buc3Ib2KMaVWK036zpRqNuM18&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers()
      console.log(`Current clicked markers length: ${clickedMarkers.length}`)
      console.log(clickedMarkers)
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    defaultZoom={9}
    defaultCenter={{ lat: props.location.latitude, lng: props.location.longitude }}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map(marker => (
        <Marker
          key={marker.ID}
          title={marker.AddressInfo.Title}
          label={marker.AddressInfo.UsageCost || "$0.00"}
          icon= { {
            url: 'gas_electro.png',
            // This marker is 150 pixels wide by 35 pixels high.
            size: new google.maps.Size(150, 35),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new google.maps.Point(150, 35)
          } }
          position={{ lat: marker.AddressInfo.Latitude, lng: marker.AddressInfo.Longitude }}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
);

export default MapWithMarkers
