import React from 'react';

const Ingredients = (props) => {
  return props.ingredients.map(item => {
    return <li key={item}>{item}</li>
  });
}

export default Ingredients;