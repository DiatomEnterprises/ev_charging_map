import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './sidebar.js';
import TopNavbar from './top_navbar.js';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      markers: [],
      location: {
        latitude: 56.946285,
        longitude: 24.105078
      }
    }
  }

  getCurrentPosition() {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          this.setState({ location: location});
        },
        (error) => {
          alert("", "Unexpected error.");
        }
      );
    } catch(e) {
      alert(e.message || "");
    }
  };

  getMarkers() {
    const fetch = require("isomorphic-fetch");
    const url = "https://api.openchargemap.io/v2/poi/?output=json&maxresults=20&latitude="+this.state.latitude+"&longitude="+this.state.longitude+"&verbose=false"
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ markers: data });
      });
  }

  render() {
    this.getCurrentPosition();
    this.getMarkers();
    return (
      <div class="container">
        <TopNavbar />
        <Sidebar />
      </div>
    )
  }
}



ReactDOM.render(<App />, document.getElementById('root'));
