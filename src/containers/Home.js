import fetch from "isomorphic-fetch";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TweenMax, CSSPlugin, TimelineMax } from 'gsap';

import { getCurrentPage, animateOverlay } from '../actions/index';
import { getRecipes } from '../actions/apis';
import NavLink from '../components/NavLink';
import { mergeData } from '../utils';

class Home extends Component {
  constructor(props) {
    super(props);

    // Variables for GSAP
    this.ul = null;
    this.title = null;
    this.tween = new TimelineMax({delay: 3.1});
  }

  componentDidMount() {
    this.props.getCurrentPage(this.props.location.pathname);

    if(this.props.recipes == 0) {
      this.props.getRecipes();
    } else {
      this.props.animateOverlay('out');
    }
  }

  componentDidUpdate() {
    if(this.title && this.ul) {
      this.tween.to(this.title, 1, {opacity: 1})
                .to(this.ul, 1, {opacity: 1});
    }
  }

  render() {
    if(this.props.isFetching || this.props.included == null) { return  <div><h2>Fetching..</h2></div> }
    const contentsInfo = mergeData(this.props.data, this.props.included);

    return(
      <div className="home__wrapper">
        <h1 ref={h1 => this.title = h1} className="title__home">Home</h1>
        <ul ref={ul => this.ul = ul} className="recipes-list">
          <NavLink content={contentsInfo} />
        </ul>
      </div>
    );
  }
}

// I execute this function to fetch data from the server.
Home.serverFetch = getRecipes;

const mapStateToProps = (state, ownProps) => {
  return {...state.contents.recipes};
}

const mapDispatchToProps = { getRecipes, getCurrentPage, animateOverlay };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
