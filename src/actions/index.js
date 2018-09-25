import fetch from "isomorphic-fetch";

export const INIT_SESSION = 'INIT_SESSION';
export const GET_CURRENT_PAGE = 'GET_CURRENT_PAGE';
export const REQUEST_CONTENTS = 'REQUEST_CONTENTS';
export const RECEIVE_CONTENTS = 'RECEIVE_CONTENTS';
export const STORE_DATA = 'STORE_DATA';

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

export function requestContents() {
  return (dispatch) => {
    dispatch(storeData({type: REQUEST_CONTENTS, payload: null}))
  }
}

export function receiveContents(data, dataLabel) {
  let includedData;
  
  if(!data.included) {
    includedData = null;
  } else {
    includedData = data.included;
  }

  const payloadData = {
    data: data.data,
    included: includedData,
    label: dataLabel || undefined
  };

  return (dispatch) => {
    dispatch(storeData({type: RECEIVE_CONTENTS, payload: payloadData}))
  }
}

export function storeData(data) {
  return {
    type: data.type,
    payload: data.payload,
  }
}

export function getRecipes() {
  return (dispatch, getState) => {
    dispatch(requestContents())

    return fetch('http://dev.contenta.test/api/recipes?include=field_image,field_image.imageFile&fields[images]=imageFile')
            .then(res => res.json())
            .then(data => dispatch(receiveContents(data, 'recipes')))
            .then(() => console.log('-Store state-', getState()))
            .catch(error => console.log(error))
  }
}

export function getTutorials() {
  return (dispatch, getState) => {
    dispatch(requestContents())

    return fetch('http://dev.contenta.test/api/tutorials?include=image,image.field_image,contentType&fields[images]=imageFile')
            .then(res => res.json())
            .then(data => dispatch(receiveContents(data, 'tutorials')))
            .then(() => console.log('-Store state-', getState()))
            .catch(error => console.log(error))
  }
}
