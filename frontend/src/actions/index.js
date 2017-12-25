import axios from 'axios';

var webserver = 'http://localhost:3000/';

export function loadFrontPageData() {
  return function(dispatch){
    axios({
      method:'get',
      url:webserver+'api/recommendations/'
    })
    .then( (response) => {
      dispatch(hydrateState(response.data));
    })
  }
}

export const hydrateState = (data) => ({
  type: 'HYDRATE_STATE',
  payload: data
})

export const addTodo = () => ({
  type: 'ADD_POKEMON',
})

export const removeTodo = (idx) => ({
  type: 'REMOVE_POKEMON',
  idx: idx
})

export const updateField = (text) => ({
  type: 'UPDATE_FIELD',
  text: text
})

