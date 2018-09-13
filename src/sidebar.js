import React from 'react';

class Sidebar extends React.Component {
  render(){
    return(
      <div className="sidebar">
        <li>
          <a href="default.html">HJEM</a>
        </li>
        <li>
          <a href="attraksjoner.html">ATTRAKSJONasdasdsaER</a>
        </li>
        <li>
          <a href="shopping.html">SHOPPING</a>
        </li>
        <li>
          <a href="lenker.html">LENKER</a>
        </li>
      </div>
    )
  }
}

export default Sidebar;
