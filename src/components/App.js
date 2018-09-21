import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Nav from './Nav';
import routes from '../routes';

class App extends Component {
  createRoutes() {
    return routes.map(route => {
      return <Route exact key={route.path} path={route.path} component={route.component} />
    });
  }

  render() {
    return(
      <div>
        <h2>Try hard</h2>
        <Nav />
        <Switch>
          {this.createRoutes()}
        </Switch>
      </div>
    );
  }
}

export default App;