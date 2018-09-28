import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCurrentPage } from '../actions/index';
import { getRecipes } from '../actions/apis';

class ShowRecipe extends Component {
  showIngredients(list) {
    let i = 0;

    return list.map(item => {
      let iKey = `ing-${i}`;
      i++;

      return <li key={iKey}>{item}</li>
    });
  }

  render() {
    const content = this.props.data;
    const ingredients = content.attributes.ingredients;

    return(
      <div id="recipe">
        <ul>
          {this.showIngredients(ingredients)}
        </ul>
      </div>
    );
  }
}

ShowRecipe.serverFetch = getRecipes;

function mapStateToProps(state, ownProps) {
  // Get all recipes
  const recipes = state.contents.recipes.data;

  // Find the recipe that i need
  const recipe = recipes.find(recipe => {
    if(recipe.id == ownProps.match.params.id) {
      return recipe;
    }
  })
  
  // Return as 'data'
  return {data: recipe};
}

const mapDispatchToProps = { getRecipes, getCurrentPage };

export default connect(mapStateToProps, mapDispatchToProps)(ShowRecipe);