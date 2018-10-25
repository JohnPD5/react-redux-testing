import { requestContents, receiveContents, animateOverlay } from './index'; 

export function getRecipes() {
  return (dispatch, getState) => {
    dispatch(requestContents());
    dispatch(animateOverlay('in')); // Show the Overlay when we start fetching

    return fetch('http://dev.contenta.test/api/recipes?include=field_image,field_image.imageFile&fields[images]=imageFile')
            .then(res => res.json())
            .then(data => {
              dispatch(animateOverlay('out')); // Hide the Overlay when the fetching ends
              return dispatch(receiveContents(data, 'recipes'));
            })
            .then(() => console.log('-Store state-', getState()))
            .catch(error => console.log(error))
  }
}

export function getTutorials() {
  return (dispatch, getState) => {
    dispatch(requestContents());
    dispatch(animateOverlay('in')); // Show the Overlay when we start fetching

    return fetch('http://dev.contenta.test/api/tutorials?include=image,image.field_image,contentType&fields[images]=imageFile')
            .then(res => res.json())
            .then(data => {
              dispatch(animateOverlay('out')); // Hide the Overlay when the fetching ends
              return dispatch(receiveContents(data, 'tutorials'));
            })
            .then(() => console.log('-Store state-', getState()))
            .catch(error => console.log(error))
  }
}
