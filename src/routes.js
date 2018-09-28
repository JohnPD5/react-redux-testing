import Home from './components/Home';
import Portfolio from './components/Portfolio';
import ShowRecipe from './components/showRecipe';

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
  }
];