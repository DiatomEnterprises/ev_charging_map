import React from 'react';

class TopNavbar extends React.Component {
  render(){
    return(
      <div className="navbar navbar-first-row">
        <li className="navbar-cell">
          <img src="logo.png" style={ {height: '100%'} } />
        </li>
        <li className="navbar-cell">
          <a href="info.html">ABOUT</a>
        </li>
        <li className="navbar-cell">
          <a href="contacts.html">CONTACTS</a>
        </li>
        <li className="navbar-cell">
          <a href="login.html">LOGIN</a>
        </li>
      </div>
    )
  }
}

export default TopNavbar;
