/*global google*/
import React from 'react';
import { Circle } from "react-google-maps";

const { compose, withProps, withHandlers, withStateHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} = require("react-google-maps");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

export const MapWithMarkers = compose(
  withStateHandlers(() => ({
    isOpen: false,
    infoIndex: null
  }), {
    onToggleOpen: ({ isOpen, infoIndex }) => (index) => ({
      isOpen: infoIndex !== index || !isOpen,
      infoIndex: index
    })
  }),
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=KEY&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
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
    defaultZoom={13}
    defaultCenter={{ lat: props.location.latitude, lng: props.location.longitude }}
    center={{ lat: props.location.latitude, lng: props.location.longitude }}
  >
    <Marker
      position={{ lat: props.location.latitude, lng: props.location.longitude } }
      defaultDraggable={true}
      onDragEnd={(event) => props.onCurrentMarkerDrag(event)}
    />
    <Circle
      center={{ lat: props.location.latitude, lng: props.location.longitude } }
      radius={ props.distance * 1000 } //in meters
      options={ {
        fillColor: '#78ADC0',
        strokeColor: '#528BE2'
      } }
    />
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
          onClick={() => props.onToggleOpen(marker.ID)}
        >
          {(props.isOpen && props.infoIndex === marker.ID) && <InfoWindow onCloseClick={props.onToggleOpen}>
            <div className="marker-info">
              <p> {marker.AddressInfo.Title} </p>
              <p> {marker.AddressInfo.AddressLine1} </p>
              <p> {marker.AddressInfo.AddressLine2} </p>
              <p> {marker.AddressInfo.StateOrProvince} </p>
              <p> {marker.AddressInfo.Postcode} </p>
              <p> Usage cost: { marker.AddressInfo.UsageCost || "$0.00" } </p>
              <p> <a href={"https://www.google.com/maps/dir/?api=1&destination="+marker.AddressInfo.Latitude+","+marker.AddressInfo.Longitude} target="_blank" rel="noopener noreferrer"> Navigate! </a> </p>
            </div>
          </InfoWindow>}
        </Marker>
      ))}
    </MarkerClusterer>
  </GoogleMap>

);

export default MapWithMarkers
