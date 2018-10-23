import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TweenMax, CSSPlugin, TimelineMax } from 'gsap';

import { getCurrentPage } from '../actions/index';
import { getRecipes } from '../actions/apis';
import Ingredients from '../components/Ingredients';

class ShowRecipe extends Component {
  constructor(props) {
    super(props);
    this.el = null;
    this.animation = new TimelineMax();
  }

  componentDidMount() { 
    this.animation.to(this.el, .5, {opacity: 1, height: 'auto'})
                  .to(this.el, .5, {y: '0%'});
  }

  render() {
    if(this.props.data == undefined) { return <Loader />; }
    
    const content = this.props.data;
    const ingredients = content.attributes.ingredients;

    return(
      <div id="recipe">
        {/*Assegno l'elemento <ul> a this.el*/}
        <ul className="ingredients" ref={self => this.el = self}>
          <Ingredients ingredients={ingredients} />
        </ul>
      </div>
    );
  }
}

ShowRecipe.serverFetch = getRecipes;

function mapStateToProps(state, ownProps) {
  const recipes = state.contents.recipes.data; 

  const recipe = recipes.find(recipe => {
    if(recipe.id == ownProps.match.params.id) {
      return recipe;
    }
  })
  
  return {data: recipe};
}

const mapDispatchToProps = { getRecipes, getCurrentPage };

export default connect(mapStateToProps, mapDispatchToProps)(ShowRecipe);