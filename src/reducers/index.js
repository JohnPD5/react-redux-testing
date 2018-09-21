import { combineReducers } from 'redux';

import { GET_CURRENT_PAGE, INIT_SESSION, STORE_DATA } from '../actions/index';
import { currentContent } from './reducer_content';

export function initSession(state = {}, action) {
  switch (action.type) {
    case INIT_SESSION:
      return true;

    default:
      return state;
  }
}

export function currentPage(state = {}, action) {
  switch (action.type) {
    case GET_CURRENT_PAGE:
      return action.payload;

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  loggedIn: initSession,
  currentPage: currentPage,
  pageContent: currentContent
});

export default rootReducer;