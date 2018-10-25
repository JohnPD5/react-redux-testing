import fetch from "isomorphic-fetch";

export const INIT_SESSION = 'INIT_SESSION';
export const GET_CURRENT_PAGE = 'GET_CURRENT_PAGE';
export const REQUEST_CONTENTS = 'REQUEST_CONTENTS';
export const RECEIVE_CONTENTS = 'RECEIVE_CONTENTS';
export const STORE_DATA = 'STORE_DATA';
export const ANIMATE_OVERLAY = 'ANIMATE_OVERLAY';

export function initializeSession() {
  return {
    type: INIT_SESSION
  }
}

export function getCurrentPage(pagePath) {
  return {
    type: GET_CURRENT_PAGE,
    payload: pagePath
  };
}

export function animateOverlay(action) {
  return {
    type: ANIMATE_OVERLAY,
    payload: action
  }
}

export function requestContents() {
  return (dispatch) => {
    dispatch(storeData({type: REQUEST_CONTENTS, payload: null}))
  }
}

export function receiveContents(fetched_data, dataLabel) {
  let includedData;
  
  if(!fetched_data.included) {
    includedData = null;
  } else {
    includedData = fetched_data.included;
  }

  const payloadData = {
    data: fetched_data.data,
    included: includedData,
    label: dataLabel || undefined
  };

  return (dispatch) => {
    dispatch(storeData({type: RECEIVE_CONTENTS, payload: payloadData}))
  }
}

export function storeData(clean_data) {
  return {
    type: clean_data.type,
    payload: clean_data.payload,
  }
}