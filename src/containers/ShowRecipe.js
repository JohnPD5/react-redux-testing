import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TweenMax, CSSPlugin, TimelineMax } from 'gsap';

import { getCurrentPage, animateOverlay } from '../actions/index';
import { getRecipes } from '../actions/apis';
import Ingredients from '../components/Ingredients';

class ShowRecipe extends Component {
  constructor(props) {
    super(props);

    // Variables for GSAP
    this.el = null;
    this.tween = new TimelineMax({delay: 3.1});
  }

  componentDidMount() {
    this.props.animateOverlay('out');
    this.tween.to(this.el, .5, {opacity: 1, height: 'auto'})
                  .to(this.el, .5, {y: '0%'});
  }

  render() {
    if(this.props.data == undefined) { return null; }
    const content = this.props.data;
    const ingredients = content.attributes.ingredients;

    return(
      <div id="recipe">
        <ul className="ingredients" ref={self => this.el = self}>
          <Ingredients ingredients={ingredients} />
        </ul>
      </div>
    );
  }
}

// I execute this function to fetch data from the server.
ShowRecipe.serverFetch = getRecipes;

const mapStateToProps = (state, ownProps) => {
  const recipes = state.contents.recipes.data; 
  const recipe = recipes.find(recipe => {
    if(recipe.id == ownProps.match.params.id) {
      return recipe;
    }
  });

  return {data: recipe};
}

const mapDispatchToProps = { getRecipes, getCurrentPage, animateOverlay };

export default connect(mapStateToProps, mapDispatchToProps)(ShowRecipe);