import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { TweenMax, CSSPlugin, TimelineMax } from 'gsap';
import { withRouter, matchPath } from "react-router";

import Menu from '../components/Menu';
import Overlay from '../components/Overlay/Overlay';
import NotFound from '../components/NotFound';
import routes from '../routes';

class App extends Component {
  constructor(props) {
    super(props);
  }
  
  // Generate the Routes with the Overlay component
  generalRoutes() {
    let myRoutes = routes.map(route => {
      return <Route 
              key={route.path} 
              exact 
              path={route.path} 
              render={(props) => {
                return(
                  <div>
                    <Overlay />
                    {<route.component {...props} />}
                  </div>
                ); 
              }} />
    });

    // Adding Route for 404
    myRoutes.push(<Route key={'404'} component={NotFound} />);
    return myRoutes;
  }

  render() {
    return(
      <div className="main-group__wrapper">
        <h2>Try hard</h2>
        <Menu />     
        <Switch>    
          {this.generalRoutes()}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default withRouter(connect(mapStateToProps)(App));