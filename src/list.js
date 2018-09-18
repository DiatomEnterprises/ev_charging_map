import React from 'react';
import './css/list.css';

class List extends React.Component {
  render(){
    return(
      <div className="static list-info">
        {this.props.markers.map(marker => (
          <div key={marker.id} className="list-item">
            <h3 className="list-title">{marker.AddressInfo.Title} - {marker.NumberOfPoints || "?"} charging points <div className="right">{marker.AddressInfo.UsageCost || "$0.00" }</div></h3>
            <p><i className="fas fa-map-marker-alt" /> lat: {marker.AddressInfo.Latitude}, lng: {marker.AddressInfo.Longitude} <a href={"https://www.google.com/maps/dir/?api=1&destination="+marker.AddressInfo.Latitude+","+marker.AddressInfo.Longitude} target="_blank" rel="noopener noreferrer"> Navigate! </a></p>
            <p><i className="fas fa-comments" /> Comments: {marker.GeneralComments}</p>
            <p>Accessibility Comments: {marker.AddressInfo.AccessComments}</p>
          </div>))}
      </div>
    )
  }
}

export default List;
