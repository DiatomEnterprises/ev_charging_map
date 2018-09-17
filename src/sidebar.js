import React from 'react';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';

class Sidebar extends React.Component {
  renderSlider(text, max, default_val, onchange){
    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const Handle = Slider.Handle;

    const handle = (props) => {
      const { value, dragging, index, ...restProps } = props;
      return (
        <Tooltip
          prefixCls="rc-slider-tooltip"
          overlay={value}
          visible={dragging}
          placement="top"
          key={index}
        >
          <Handle value={value} {...restProps} />
        </Tooltip>
      );
    };

    const wrapperStyle = { width: "100%" };
    return(
      <div style={wrapperStyle}>
        { text }
        <Slider min={0} max={max} defaultValue={default_val} handle={handle} onAfterChange={onchange} />
      </div>
    )
  }


  renderRangeSlider(){
    return(
      this.renderSlider(<p>Select search range - {this.props.distance} km</p>, 150, this.props.distance, (event) => this.props.onDistanceChange(event))
    )
  }

  renderStationCountSlider(){
    return(
      this.renderSlider(<p>Select amount of gas stations to be displayed - {this.props.maxresults}</p>, 200, this.props.maxresults, (event) => this.props.onMaxResultsChange(event))
    )
  }

  renderMinPowerSlider(){
    return(
      this.renderSlider(<p>Select min amount of power that you require - {this.props.minpowerkw} kW</p>, 200, this.props.minpowerkw, (event) => this.props.onMinPowerChange(event))
    )
  }

  render(){
    return(
      <div className="sidebar sidebar-grid">
        <div className="sidebar-navi">
          <li className="sidebar-cell">
            <a href="#" onClick={(e) => this.props.changeCurrentPage("IndexPage")}>MAP</a>
          </li>
          <li className="sidebar-cell">
            <a href="#" onClick={(e) => this.props.changeCurrentPage("AboutPage")}>LIST <i className="fas fa-wrench"/></a>
          </li>
          <li className="sidebar-cell">
            <a href="#" onClick={(e) => this.props.changeCurrentPage("AboutPage")}>MY CAR <i className="fas fa-wrench"/></a>
          </li>
          <li className="sidebar-cell">
            <a href="#" onClick={(e) => this.props.changeCurrentPage("AboutPage")}>SHOP <i className="fas fa-wrench"/></a>
          </li>
        </div>
        <div className="sidebar-filter">
          {this.renderRangeSlider()}
          {this.renderStationCountSlider()}
          {this.renderMinPowerSlider()}
        </div>
      </div>
    )
  }
}

export default Sidebar;
