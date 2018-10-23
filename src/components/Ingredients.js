import React from 'react';

const Ingredients = (props) => {
  let i = 0;

  return props.ingredients.map(item => {
    let iKey = `ing-${i}`;
    i++;
    return <li key={iKey}>{item}</li>
  });
}

export default Ingredients;