import Home from './containers/Home';
import Portfolio from './containers/Portfolio';
import ShowRecipe from './containers/ShowRecipe';
import Contacts from './containers/Contacts';

export default [
  {
    path: '/',
    component: Home,
    name: 'Home',
    nav: true
  },
  {
    path: '/portfolio',
    component: Portfolio,
    name: 'Portfolio',
    nav: true
  },
  {
    path: '/:nid/:id',
    component: ShowRecipe,
    name: 'ShowRecipe',
    nav: false
  },
  {
    path: '/contacts',
    component: Contacts,
    name: 'Contacts',
    nav: true
  }
];