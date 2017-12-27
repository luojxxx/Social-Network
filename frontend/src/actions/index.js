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
  type: 'PAGE_LOADED',
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
      data: data
    })
    .then( (response) => {
      console.log(response)
      dispatch(addPostToDisplay(response.data));
      dispatch(closePostBox());
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed());
    })
  }
}

export function vote(postId, priorVote, currentVote) {
  if (priorVote === currentVote) {
    currentVote = 0;
  }
  return function(dispatch){
    axios({
      method:'put',
      url:webserver+'api/posts/'+postId+'/vote',
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      },
      data: {vote: currentVote}
    })
    .then( (response) => {
      dispatch(updateVote(postId, priorVote, currentVote));
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed());
    })
  }
}

export const updateVote = (postId, priorVote, currentVote) => ({
  type: 'UPDATE_VOTE',
  payload: {
    postId: postId,
    priorVote: priorVote,
    currentVote: currentVote
  }
})