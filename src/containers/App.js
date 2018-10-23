import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group';
import { connect } from 'react-redux';
import { TweenMax, CSSPlugin, TimelineMax } from 'gsap';

import Menu from '../components/Menu';
import Overlay from '../components/Overlay';
import routes from '../routes';
import { showEnter, hideExit } from '../animations/animate';

class App extends Component {
  constructor(props) {
    super(props);
  }
  
  generalRoutes() {
    return routes.map(route => {
      return <Route exact key={route.path} path={route.path} component={route.component} />;
    });
  }

  render() {
    return(
      <div className="transitionGroup__wrapper">
        <h2>Try hard</h2>
        <Menu />     

        <Route render={({location}) => (
          <TransitionGroup>
            <CSSTransition
              key={location.pathname}
              classNames="fade"
              timeout={450}
              mountOnEnter={true}
              unmountOnExit={true}>
              <Switch location={location}>
                {this.generalRoutes()}
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )} />
      </div>
    );
  }
}

export default App;