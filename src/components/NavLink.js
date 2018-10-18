import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = ({content}) => {
  return content.map(item => {
    return(
      <li key={item.mainContent.id}>
        <Link key={item.mainContent.id} to={`/recipe/${item.mainContent.id}`}>
          {item.mainContent.attributes.title}
        </Link>
        <img src={`http://dev.contenta.test` + item.imageUrl} />
      </li>
    );
  })
};

export default NavLink;