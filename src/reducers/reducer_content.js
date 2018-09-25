import { REQUEST_CONTENTS, RECEIVE_CONTENTS } from '../actions/index';

export function currentContent(state = {}, action) {
  switch (action.type) {
    case REQUEST_CONTENTS:
      return Object.assign({}, state, {
        isFetching: true
      });

    case RECEIVE_CONTENTS:
      return Object.assign({}, state, {
        isFetching: false,
        [action.payload.label]: action.payload,
      });

    default:
      return state;
  }
}
