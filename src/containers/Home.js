import fetch from "isomorphic-fetch";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group';

import { getCurrentPage } from '../actions/index';
import { getRecipes } from '../actions/apis';
import NavLink from '../components/NavLink';
import { mergeData } from '../utils';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCurrentPage(this.props.location.pathname);

    if(this.props.recipes == 0) {
      this.props.getRecipes();
    }
  }

  render() {
    if(this.props.isFetching || this.props.included == null) { return  <div><h2>Fetching..</h2></div> }
    const contentsInfo = mergeData(this.props.data, this.props.included);

    return(
      <div className="home__wrapper">
        <h1>Home</h1>
        <ul className="recipes-list">
          <NavLink content={contentsInfo} />
        </ul>
      </div>
    );
  }
}

Home.serverFetch = getRecipes;

function mapStateToProps(state, ownProps) {
  return {...state.contents.recipes};
}

const mapDispatchToProps = { getRecipes, getCurrentPage };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
