import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import routes from '../routes';

class Menu extends Component {
  showLinks() {
    return routes.map(link => {
      if(link.nav) {
        return <Link key={link.path} to={link.path}>{link.name}</Link>
      }
    })
  }

  render() {
    return(
      <div className="menu">
        <h2>Nav</h2>
        {this.showLinks()}
      </div>
    );
  }
}

export default Menu;