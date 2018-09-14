import React from 'react';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';

class Sidebar extends React.Component {

  renderSlider(text, max, default_val){
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
        <Slider min={0} max={max} defaultValue={default_val} handle={handle} />
      </div>
    )
  }


  renderRangeSlider(){
    return(
      this.renderSlider(<p>Select search range in km</p>, 150, 50)
    )
  }

  renderStationCountSlider(){
    return(
      this.renderSlider(<p>Select amount of gas stations to be displayed</p>, 100, 50)
    )
  }

  render(){
    return(
      <div className="sidebar sidebar-grid">
        <div className="sidebar-navi">
          <li className="sidebar-cell">
            <a href="default.html">HJEM</a>
          </li>
          <li className="sidebar-cell">
            <a href="attraksjoner.html">ATTRAKSJONasdasdsaER</a>
          </li>
          <li className="sidebar-cell">
            <a href="shopping.html">SHOPPING</a>
          </li>
          <li className="sidebar-cell">
            <a href="lenker.html">LENKER</a>
          </li>
        </div>
        <div className="sidebar-filter">
          {this.renderRangeSlider()}
          {this.renderStationCountSlider()}
        </div>
      </div>
    )
  }
}

export default Sidebar;
