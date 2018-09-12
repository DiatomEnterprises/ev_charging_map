import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        url: "http://"
      }
  }

  render(){
    const { compose, withProps } = require("recompose");
    const {
      withScriptjs,
      withGoogleMap,
      GoogleMap,
      KmlLayer,
    } = require("react-google-maps");

    const MapWithAKmlLayer = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA4Bobct-Buc3Ib2KMaVWK036zpRqNuM18&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap
    )(props =>
      <GoogleMap
        defaultZoom={9}
        defaultCenter={{ lat: 41.9, lng: -87.624 }}
      >
        <KmlLayer
          url="https://api.openchargemap.io/v2/poi/?output=kml&countrycode=US&maxresults=50&latitude=&longitude"
          options={{ preserveViewport: true }}
        />
      </GoogleMap>
    );


    return(
      <MapWithAKmlLayer />
    )
  }


}


ReactDOM.render(<App />, document.getElementById('root'));
