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

export const frontPageLoaded = (data) => ({
  type: 'FRONTPAGE_LOADED',
  payload: data
})

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

export const showPostBox = (parentId) => ({
  type: 'SHOW_POST_BOX',
  payload: parentId
})

export const closePostBox = () => ({
  type: 'CLOSE_POST_BOX'
})

export const addPostToDisplay = (data) => ({
  type: 'ADD_POST_TO_DISPLAY',
  payload: data
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
      dispatch(addPostToDisplay(response.data));
      dispatch(closePostBox());
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed());
    })
  }
}

export function vote(postId, vote) {
  return function(dispatch){
    axios({
      method:'put',
      url:webserver+'api/posts/'+postId+'/vote',
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      },
      vote
    })
    .then( (response) => {
      // dispatch(userDataLoaded(response.data));
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed());
    })
  }
}

export const upVote = (postId) => ({
  type: 'UP_VOTE',
  payload: postId
})

export const downVote = (postId) => ({
  type: 'DOWN_VOTE',
  payload: postId
})