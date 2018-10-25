import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TweenMax, CSSPlugin, TimelineMax } from 'gsap';

import { animateOverlay } from '../../actions/index';
import './overlay.css';

class Overlay extends Component {
  constructor(props) {
    super(props);

    // Variables for GSAP
    this.overlay = null;
    this.left = null;
    this.right = null;
    this.tween = new TimelineMax();
  }

  componentDidMount() {
    this.props.animateOverlay('in');
    this.tween.to(this.overlay, 1, {y: '0%'})
              .to([this.left, this.right], 1, {width: '50%'});
  }

  // To hide the Overlay i need to dispatch an action that tells to animate it out.
  // dispatch(animateOverlay('out'))
  componentDidUpdate() {
    if(this.props.overlayState == 'out' && !this.props.contents.isFetching) {
      this.tween.to([this.left, this.right], .7, {width: 0})
                .to(this.overlay, .4, {y: '-100%'})
                .to(this.overlay, .3, {display: 'none'});
    }
  }

  render() {
    return(
      <div ref={div => this.overlay = div} className={`overlay__main`}>
        <div ref={div => this.left = div} className={'window left'}></div>
        <div ref={div => this.right = div} className={'window right'}></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state; 
const mapDispatchToProps = { animateOverlay };

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);
