import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './sidebar.js';
import TopNavbar from './top_navbar.js';
import MapWithMarkers from './map_with_markers.js';
import MapControls from './map_controls.js';
import './css/index.css';
import './css/navbar.css';
import './css/sidebar.css';
import './css/content.css';

class App extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      markers: [],
      location: {
        latitude: -34.397,
        longitude: 150.644
      },
      distance: 5,
      maxresults: 10,
      minpowerkw: 0,
      connectionTypeId: "",
      chargingLevelId: "",
      refetchState: false,
    }

  }

  getMyLocation() {
      const location = window.navigator && window.navigator.geolocation
      if (location) {
        location.getCurrentPosition((position) => {
          this.setState({
            location: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            },
            refetchState: true
          })
        }, (error) => {
          console.log("Error getting geolocation")
        })
      }

    }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.refetchState){
      this.getMarkers(nextState)
    }
  }

  getMarkers(state){
    const fetch = require("isomorphic-fetch");
    const url = "https://api.openchargemap.io/v2/poi/?output=json&maxresults="
      + state.maxresults
      + "&latitude="+state.location.latitude
      + "&longitude="+state.location.longitude
      + "&verbose=false"
      + "&distance="+state.distance
      + "&distanceunit=KM"
      + "&minpowerkw="+state.minpowerkw
      + "&connectiontypeid="+state.connectionTypeId
      + "&levelid="+state.chargingLevelId;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({markers: data, refetchState: false});
      });
  }

  componentDidMount() {
    this.getMyLocation()
  }

  changeDistance(new_distance){
    this.setState({distance: new_distance, refetchState: true})
  }

  changeMaxResults(new_max_results){
    this.setState({maxresults: new_max_results, refetchState: true})
  }

  changeMinPower(new_minpowerkw){
    this.setState({minpowerkw: new_minpowerkw, refetchState: true})
  }

  changeConnectionType(new_id){
    this.setState({connectionTypeId: new_id, refetchState: true})
  }

  changeChargingLevelId(new_id){
    this.setState({chargingLevelId: new_id, refetchState: true})
  }

  dragCurrentMarker(ev){
    this.setState({
      location: {
        latitude: ev.latLng.lat(),
        longitude: ev.latLng.lng()
      },
      refetchState: true
    })
  }

  clickResetFilters(e){
    this.setState({
      connectionTypeId: "",
      chargingLevelId: "",
      refetchState: true
    })
  }

  render() {
    return (
      <div className="container">
        <TopNavbar />
        <Sidebar
          distance={this.state.distance}
          maxresults={this.state.maxresults}
          minpowerkw={this.state.minpowerkw}
          onDistanceChange={(new_distance) => this.changeDistance(new_distance)}
          onMaxResultsChange={(new_max_results) => this.changeMaxResults(new_max_results)}
          onMinPowerChange={(new_minpowerkw) => this.changeMinPower(new_minpowerkw)}
        />
        <div className="content">
          <div className="content-grid">
            <div className="content-filters">
              <MapControls
                onConnectionTypeChange={(id) => this.changeConnectionType(id)}
                onChargerTypeChange={(id) => this.changeChargingLevelId(id)}
                onResetFiltersClick={(e) => this.clickResetFilters(e)}
              />
            </div>
            <div className="content-map">
              <MapWithMarkers
                markers={this.state.markers}
                location={this.state.location}
                distance={this.state.distance}
                onCurrentMarkerDrag={(e) => this.dragCurrentMarker(e)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}



ReactDOM.render(<App />, document.getElementById('root'));
