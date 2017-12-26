import axios from 'axios';

var webserver = 'http://localhost:3000/';

export function loadFrontPageData() {
  return function(dispatch){
    axios({
      method:'get',
      url:webserver+'api/recommendations/'
    })
    .then( (response) => {
      dispatch(frontPageLoaded(response.data));
    })
  }
}

export function loadUserData() {
  return function(dispatch){
    axios({
      method:'get',
      url:webserver+'api/users/verify',
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      }
    })
    .then( (response) => {
      dispatch(userDataLoaded(response.data));
    })
    .catch( (err) => {
      dispatch(userDataLoadFailed());
    })
  }
}

export const frontPageLoaded = (data) => ({
  type: 'FRONTPAGE_LOADED',
  payload: data
})

export const userDataLoaded = (data) => ({
  type: 'USERDATA_LOADED',
  payload: data
})

export const userDataLoadFailed = () => ({
  type: 'USERDATA_LOADFAILED'
})

export const logout = () => ({
  type: 'LOGOUT'
})

export function newPost(data) {
  return function(dispatch){
    axios({
      method:'post',
      url:webserver+'api/posts',
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      },
      data
    })
    .then( (response) => {
      // dispatch(userDataLoaded(response.data));
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed());
    })
  }
}

export const showPostBox = (parentId) => ({
  type: 'SHOW_POST_BOX',
  payload: parentId
})