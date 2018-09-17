import React from 'react';

class List extends React.Component {
  render(){
    return(
      <div className="static">
        {this.props.markers.map(marker => (
          <div key={marker.id}>
            <h3>{marker.AddressInfo.Title} - {marker.AddressInfo.UsageCost || "$0.00" } - {marker.NumberOfPoints || "?"} points</h3>
            <p>lat: {marker.AddressInfo.Latitude}, lng: {marker.AddressInfo.Longitude}</p>
            <p>Comments: {marker.GeneralComments}</p>
            <p>Accessibility Comments: {marker.AddressInfo.AccessComments}</p>
          </div>))}
      </div>
    )
  }
}

export default List;
