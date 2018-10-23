import React, { Component } from 'react';
import { TweenMax, CSSPlugin, TimelineMax } from 'gsap';
import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group';

class Loader extends Component {
  constructor(props) {
    super(props);
    this.object1 = null;
    this.object2 = null;
    this.tween1 = new TimelineMax({repeat: -1});
    this.tween2 = new TimelineMax({repeat: -1});
  }

  componentDidMount() {
    console.log('mount loader');
    this.tween1.to(this.object1, 1, {scale: 0.5})
              .to(this.object1, 1, {scale: 1});

    this.tween2.to(this.object2, 1, {scale: 1})
               .to(this.object2, 1, {scale: 0.5});
  }

  componentWillUnmount() {
    console.log('unmount loader');
    // this.tween1.to(this.object1, 1, {x: '-100%'});
    // this.tween2.to(this.objext2, 1,{x: '-100%'}); 
  }

  render() {
    return(
      <div className="loader__wrapper">
        <div ref={div => this.object1 = div} className="loader__object1"></div>
        <div ref={div => this.object2 = div} className="loader__object2"></div>
      </div>
    );
  }
}

export default Loader;

