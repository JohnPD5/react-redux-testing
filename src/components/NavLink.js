import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = ({content}) => {
  return content.map(item => {
    return(
      <li key={item.mainContent.id}>
        <Link key={item.mainContent.id} to={`/recipe/${item.mainContent.id}`}>
          <span>{item.mainContent.attributes.title}</span>
          <img className="recipe-image" src={`http://dev.contenta.test` + item.imageUrl} />
        </Link>
      </li>
    );
  })
};

export default NavLink;