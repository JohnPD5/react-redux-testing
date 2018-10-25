import React, { Component } from 'react';
import { TweenMax, CSSPlugin, TimelineMax } from 'gsap';

class Loader extends Component {
  constructor(props) {
    super(props);
    this.object1 = null;
    this.object2 = null;
    this.tween1 = new TimelineMax({repeat: -1});
    this.tween2 = new TimelineMax({repeat: -1});
  }

  componentDidMount() {
    this.tween1.to(this.object1, 1, {scale: 0.5})
              .to(this.object1, 1, {scale: 1});

    this.tween2.to(this.object2, 1, {scale: 1})
               .to(this.object2, 1, {scale: 0.5});
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

