import { REQUEST_CONTENTS, RECEIVE_CONTENTS } from '../actions/index';

export function currentContent(state = {}, action) {
  switch (action.type) {
    case REQUEST_CONTENTS:
      // return Object.assign({}, state, {
      //   isFetching: true,
      //   content: null
      // });
      return {
        isFetching: true,
        content: null,
        includedContent: null
      }

    case RECEIVE_CONTENTS:
      // return Object.assign({}, state, {
      //   isFetching: false,
      //   content: action.payload
      // });
      return {
        isFetching: false,
        content: action.payload.data,
        includedContent: action.payload.included || null
      }

    default:
      return state;
  }
}
