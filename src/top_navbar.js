import React from 'react';

class TopNavbar extends React.Component {
  render(){
    return(
      <div className="navbar navbar-first-row">
        <li className="navbar-cell">
          <a href="default.html">HJEM</a>
        </li>
        <li className="navbar-cell">
          <a href="attraksjoner.html">ATTRAKSJONasdasdsaER</a>
        </li>
        <li className="navbar-cell">
          <a href="shopping.html">SHOPPING</a>
        </li>
        <li className="navbar-cell">
          <a href="lenker.html">LENKER</a>
        </li>
      </div>
    )
  }
}

export default TopNavbar;
