import axios from 'axios'
import { apiUrl } from '../config'
import { updateBanner } from './generalActions'

// NEW POST FUNCTIONS
export const pendingPost = (parentId) => ({
  type: 'PENDING_POST',
  payload: parentId
})

export const addPostToState = (data) => ({
  type: 'UPDATE_NEW_POST',
  payload: data
})

export function newPost(data) {
  return function(dispatch){
    dispatch(pendingPost())
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
      dispatch(updateBanner('Sucessfully Added New Post'))
    })
    .catch((err)=>{
      dispatch(updateBanner('Error - Could not contact server'))
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
    dispatch(pendingPost())
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
      dispatch(updateBanner('Sucessfully Edited Post'))
    })
    .catch((err)=>{
      dispatch(updateBanner('Error - Could not contact server'))
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
    .catch((err)=>{
      dispatch(updateBanner('Error - Could not contact server'))
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
    .catch((err)=>{
      dispatch(updateBanner('Error - Could not contact server'))
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
      url:apiUrl+'users/saved/',
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      },
      data: {postId: postId}
    })
    .then( (response) => {
      dispatch(updateNewSavedPost(postId))
    })
    .catch((err)=>{
      dispatch(updateBanner('Error - Could not contact server'))
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
    .catch((err)=>{
      dispatch(updateBanner('Error - Could not contact server'))
    })
  }
}
