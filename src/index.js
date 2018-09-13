import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './sidebar.js';
import TopNavbar from './top_navbar.js';
import MapWithMarkers from './map_with_markers.js';

class App extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      markers: [],
      location: {
        latitude: -34.397,
        longitude: 150.644
      }
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
    const url = "https://api.openchargemap.io/v2/poi/?output=json&maxresults=100&latitude="+this.state.location.latitude+"&longitude="+this.state.location.longitude+"&verbose=false&distance=200&distanceunit=KM"
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ markers: data });
      });
  }

  componentDidMount() {
    this.getMyLocation()
  }

  render() {
    return (
      <div className="container">
        <TopNavbar />
        <Sidebar />
        <MapWithMarkers markers={this.state.markers} location={this.state.location}/>
      </div>
    )
  }
}



ReactDOM.render(<App />, document.getElementById('root'));
