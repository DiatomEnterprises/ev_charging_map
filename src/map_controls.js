import React from 'react';
import Select from 'react-select';

class MapControls extends React.Component {
  constructor(props){
    super(props);
    this.state={
      referencedata: {},
      referencesLoaded: false,
    }

  }

  componentDidMount(){
    const fetch = require("isomorphic-fetch");
    const url = "https://api.openchargemap.io/v2/referencedata/"
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ referencedata: data, referencesLoaded: true });
      });
  }

  renderSelect(name, alternativeField, label_text, onChange){
    const options =
      this.state.referencedata[name].map(function(data) {
        return {value: data.ID, label: data.Title + " - (" + data[alternativeField] + ")"}
      });
    ;

    return(
      <div>
        <label id={name+"Label"}>{label_text}</label>
        <Select
          options={options}
          onChange={onChange}
          isMulti={true}
          aria-labelledby={name+"Label"}
          inputId={name}
        />
      </div>
    )
  }

  getMultValue(e){
    return e.map(function(data) {
      return data.value
    }).toString();
  }

  renderConnectionTypesSelect(){
    return(
      this.renderSelect("ConnectionTypes", "FormalName", "Please, select the connection type", (event) => this.props.onConnectionTypeChange(this.getMultValue(event)))
    )
  }

  renderChargerTypesSelect(){
    return(
      this.renderSelect("ChargerTypes", "Comments", "Please, select the charger type", (event) => this.props.onChargerTypeChange(this.getMultValue(event)))
    )
  }

  renderResetFiltersButton(){
    return(
      <button onClick={(event) => this.props.onResetFiltersClick(event)}>Clear Filters</button>
    )
  }

  render(){
    if (this.state.referencesLoaded) {
      return(
        <div className="map-controls">
          { this.renderConnectionTypesSelect() }
          { this.renderChargerTypesSelect() }
          { /*this.renderResetFiltersButton()*/ }
        </div>
      )}
    else {
      return(
        <div className="map-controls">
          Waiting to load the controls...
        </div>
      )}
  }
}

export default MapControls;
