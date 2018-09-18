import React from 'react';

class TopNavbar extends React.Component {
  render(){
    return(
      <div className="navbar navbar-first-row">
        <li className="navbar-cell">
          <img src="logo.png" alt="Your way to the closest charger!" style={ {height: '100%'} } />
        </li>
        <li className="navbar-cell">
          <button onClick={(e) => this.props.changeCurrentPage("AboutPage")}>ABOUT</button>
        </li>
        <li className="navbar-cell">
          <button onClick={(e) => this.props.changeCurrentPage("ContactsPage")}>CONTACTS</button>
        </li>
        <li className="navbar-cell">
          <button onClick={(e) => this.props.changeCurrentPage("AboutPage")}>LOGIN <i className="fas fa-wrench"/></button>
        </li>
      </div>
    )
  }
}

export default TopNavbar;
