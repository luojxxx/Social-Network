import axios from 'axios';

var webserver = 'http://localhost:3000/';

// PAGE LOADING FUNCTIONS
export const pageLoaded = (data) => ({
  type: 'PAGE_LOADED',
  payload: data
})

export function loadFrontPageData() {
  return function(dispatch){
    axios({
      method:'get',
      url:webserver+'api/recommendations/'
    })
    .then( (response) => {
      dispatch(pageLoaded(response.data));
    })
  }
}

// USER ACCOUNT FUNCTIONS
export const userDataLoaded = (data) => ({
  type: 'USERDATA_LOADED',
  payload: data
})

export const userDataLoadFailed = () => ({
  type: 'USERDATA_LOADFAILED'
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

export const logout = () => ({
  type: 'LOGOUT'
})

export const userProfileLoaded = (data) => ({
  type: 'USER_PROFILE_LOADED',
  payload: data
})

export function loadUserProfile(userId) {
  return function(dispatch){
    axios({
      method:'get',
      url:webserver+'api/users/'+userId,
      headers: {
        // Authorization: 'Bearer '+localStorage.getItem('token')
      }
    })
    .then( (response) => {
      dispatch(userProfileLoaded(response.data));
      dispatch(pageLoaded(response.data.submitted));
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed());
    })
  }
}

// NEW POST FUNCTIONS
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
      dispatch(addPostToDisplay(response.data));
      dispatch(closePostBox());
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed());
    })
  }
}

// POST VOTING FUNCTIONS
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

// DELETING POST FUNCTIONS
export function deletePost(postId) {
  return function(dispatch){
    axios({
      method:'delete',
      url:webserver+'api/posts/'+postId,
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      }
    })
    .then( (response) => {
      dispatch(updateDeletedPost(postId));
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed());
    })
  }
}

export const updateDeletedPost = (postId) => ({
  type: 'UPDATE_DELETED_POST',
  payload: postId
})

// SAVE POST FUNCTIONS
export function savePost(postId) {
  return function(dispatch){
    axios({
      method:'put',
      url:webserver+'api/users/saved/'+postId,
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      }
    })
    .then( (response) => {
      dispatch(updateUserAccountSavedPost(postId));
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed());
    })
  }
}

export const updateUserAccountSavedPost = (postId) => ({
  type: 'UPDATE_USERACCOUNT_SAVEDPOST',
  payload: postId
})

// REPORT POST FUNCTIONS
export function reportPost(postId) {
  return function(dispatch){
    axios({
      method:'post',
      url:webserver+'api/reports/'+postId,
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      }
    })
    .then( (response) => {
      dispatch(showReportConfirmation(postId));
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed());
    })
  }
}

export const showReportConfirmation = (postId) => ({
  type: 'SHOW_REPORT_CONFIRMATION',
  payload: postId
})