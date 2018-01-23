import axios from 'axios'
import { apiUrl } from '../config'

// PAGE LOADING FUNCTIONS
export const setTotalPages = (data) => ({
  type: 'SET_TOTAL_PAGES',
  payload: data
})

export const pageLoading = () => ({
  type: 'PAGE_LOADING'
})

export const pageLoaded = (data) => ({
  type: 'PAGE_LOADED',
  payload: data
})

export function loadFrontPageData(page) {
  return function(dispatch){
    dispatch(pageLoading())
    axios({
      method:'get',
      url:apiUrl+'recommendations/'+page
    })
    .then( (response) => {
      dispatch(setTotalPages(response.data.pages))
      dispatch(pageLoaded(response.data.docs))
    })
  }
}

export function loadPost(postId) {
  return function(dispatch){
    dispatch(pageLoading())
    axios({
      method:'get',
      url:apiUrl+'posts/'+postId+'/graph'
    })
    .then( (response) => {
      dispatch(pageLoaded(response.data))
    })
  }
}

export const sortPosts = (sortBy, sortDirection) => ({
  type: 'SORT_POSTS',
  payload: {
    sortBy: sortBy,
    sortDirection: sortDirection
  }
})

export function loadNotifications(page) {
  return function(dispatch){
    dispatch(pageLoading())
    axios({
      method: 'get',
      url:apiUrl+'notifications/'+page,
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      }
    })
    .then((response)=>{
      dispatch(setTotalPages(response.data.pages))
      dispatch(loadedNotifications(response.data.docs))
    })
  }
}

export const loadedNotifications = (data) => ({
  type: 'LOADED_NOTIFICATIONS',
  payload: data
})

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
      url:apiUrl+'users/verify',
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      }
    })
    .then( (response) => {
      dispatch(userDataLoaded(response.data))
    })
    .catch( (err) => {
      dispatch(userDataLoadFailed())
    })
  }
}

export function changeUserName(userId, userName) {
  return function(dispatch){
    axios({
      method:'put',
      url:apiUrl+'users/'+userId+'/changeusername',
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      },
      data: {userName: userName}
    })
    .then( (response) => {
      if (response.data.changed === 'true') {
        dispatch(updateUserName(response.data.userName))
      }
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed())
    })
  }
}

export const updateUserName = (userName) => ({
  type: 'UPDATE_USER_NAME',
  payload: userName
})

export const logout = () => ({
  type: 'LOGOUT'
})

// USER PROFILE FUNCTIONS
export const userProfileLoaded = (data) => ({
  type: 'USER_PROFILE_LOADED',
  payload: data
})

export function loadUserProfile(userId, page) {
  return function(dispatch){
    dispatch(pageLoading())
    axios({
      method:'get',
      url:apiUrl+'users/'+userId+'/submitted/'+page,
      headers: {
        // Authorization: 'Bearer '+localStorage.getItem('token')
      }
    })
    .then( (response) => {
      dispatch(setTotalPages(response.data.pages))
      dispatch(userProfileLoaded(response.data))
      dispatch(pageLoaded(response.data.docs))
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed())
    })
  }
}

export function loadUserHistoryByField(userId, field, page)  {
  return function(dispatch){
    dispatch(pageLoading())
    axios({
      method:'get',
      url:apiUrl+'users/'+userId+'/'+field+'/'+page,
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      }
    })
    .then( (response) => {
      dispatch(setTotalPages(response.data.pages))
      dispatch(pageLoaded(response.data.docs))
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed())
    })
  }
}

// SEARCH FUNCTIONS
export const searchPageLoaded = (data) => ({
  type: 'SEARCH_PAGE_LOADED',
  payload: data
})

export function search(searchQuery, page)  {
  return function(dispatch){
    dispatch(pageLoading())
    axios({
      method:'get',
      url:apiUrl+'search/'+searchQuery+'/'+page,
    })
    .then( (response) => {
      dispatch(setTotalPages(response.data.pages))
      dispatch(searchPageLoaded(response.data.docs))
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed())
    })
  }
}



















// NEW POST FUNCTIONS
export const showPostBox = (parentId, newOrEdit) => ({
  type: 'SHOW_POST_BOX',
  payload: {
    parentId: parentId,
    newOrEdit: newOrEdit
  }
})

export const pendingPostBox = (parentId) => ({
  type: 'PENDING_POST_BOX',
  payload: parentId
})

export const closePostBox = () => ({
  type: 'CLOSE_POST_BOX'
})

export const addPostToState = (data) => ({
  type: 'UPDATE_NEW_POST',
  payload: data
})

export function newPost(data) {
  return function(dispatch){
    axios({
      method:'post',
      url:apiUrl+'posts',
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      },
      data: data
    })
    .then( (response) => {
      dispatch(addPostToState(response.data))
      dispatch(closePostBox())
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed())
    })
  }
}

// EDIT POST FUNCTIONS
export const editPostInState = (postId, data) => ({
  type: 'UPDATE_EDIT_POST',
  payload: {
    postId: postId,
    data: data
  }
})

export function editPost(postId, data) {
  return function(dispatch){
    axios({
      method:'put',
      url:apiUrl+'posts/'+postId,
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      },
      data: data
    })
    .then( (response) => {
      dispatch(editPostInState(postId, data))
      // dispatch(closePostBox())
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed())
    })
  }
}

// POST VOTING FUNCTIONS
export function vote(postId, priorVote, currentVote) {
  if (priorVote === currentVote) {
    currentVote = 0
  }
  return function(dispatch){
    axios({
      method:'put',
      url:apiUrl+'posts/'+postId+'/vote',
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      },
      data: {vote: currentVote}
    })
    .then( (response) => {
      dispatch(updateNewVote(postId, priorVote, currentVote))
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed())
    })
  }
}

export const updateNewVote = (postId, priorVote, currentVote) => ({
  type: 'UPDATE_NEW_VOTE',
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
      url:apiUrl+'posts/'+postId,
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      }
    })
    .then( (response) => {
      dispatch(updateNewDeletedPost(postId))
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed())
    })
  }
}

export const updateNewDeletedPost = (postId) => ({
  type: 'UPDATE_NEW_DELETED_POST',
  payload: postId
})

// SAVE POST FUNCTIONS
export function savePost(postId) {
  return function(dispatch){
    axios({
      method:'put',
      url:apiUrl+'users/saved/'+postId,
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      }
    })
    .then( (response) => {
      dispatch(updateNewSavedPost(postId))
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed())
    })
  }
}

export const updateNewSavedPost = (postId) => ({
  type: 'UPDATE_NEW_SAVED_POST',
  payload: postId
})

// REPORT POST FUNCTIONS
export function reportPost(postId) {
  return function(dispatch){
    axios({
      method:'post',
      url:apiUrl+'reports/'+postId,
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      }
    })
    .then( (response) => {
      // dispatch(showReportConfirmation(postId))
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed())
    })
  }
}
