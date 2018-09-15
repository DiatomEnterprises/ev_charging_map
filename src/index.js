import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './sidebar.js';
import TopNavbar from './top_navbar.js';
import MapWithMarkers from './map_with_markers.js';
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
      distance: 50,
      maxresults: 100,
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
            }
          })
          this.getMarkers()
        }, (error) => {
          console.log("Error getting geolocation")
        })
      }

    }

  getMarkers(){
    const fetch = require("isomorphic-fetch");
    const url = "https://api.openchargemap.io/v2/poi/?output=json&maxresults="
      + this.state.maxresults
      + "&latitude="+this.state.location.latitude
      + "&longitude="+this.state.location.longitude
      + "&verbose=false&distance="+this.state.distance+"&distanceunit=KM"
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ markers: data });
      });
  }

  componentDidMount() {
    this.getMyLocation()
  }

  changeDistance(new_distance){
    this.setState({distance: new_distance})
    this.getMyLocation()
  }

  changeMaxResults(new_max_results){
    this.setState({maxresults: new_max_results})
    this.getMyLocation()
  }

  dragCurrentMarker(ev){
    this.setState({
      location: {
        latitude: ev.latLng.lat(),
        longitude: ev.latLng.lng()
      }
    })
    this.getMarkers()
  }

  render() {
    return (
      <div className="container">
        <TopNavbar />
        <Sidebar
          distance={this.state.distance}
          maxresults={this.state.maxresults}
          onDistanceChange={(new_distance) => this.changeDistance(new_distance)}
          onMaxResultsChange={(new_max_results) => this.changeMaxResults(new_max_results)}
        />
        <div className="content">
          <div className="content-grid">
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
