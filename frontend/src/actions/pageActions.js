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

export const pageLoadedInOrder = (data) => ({
  type: 'PAGE_LOADED_IN_ORDER',
  payload: data
})

export const setSubHeading = (subheading) => ({
  type: 'SET_SUBHEADING',
  payload: subheading
})

export function loadFrontPageData(page) {
  return function(dispatch){
    dispatch(setSubHeading('Front Page'))
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
    dispatch(setSubHeading('Post Page'))
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
    dispatch(setSubHeading('Notifications'))
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
    dispatch(setSubHeading('User Profile'))
    dispatch(pageLoading())
    axios({
      method:'get',
      url:apiUrl+'users/profile/'+userId+'/submitted/'+page,
      headers: {
        // Authorization: 'Bearer '+localStorage.getItem('token')
      }
    })
    .then( (response) => {
      dispatch(setTotalPages(response.data.pages))
      dispatch(userProfileLoaded(response.data))
      dispatch(pageLoadedInOrder(response.data.docs))
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed())
    })
  }
}

export function loadUserHistoryByField(userId, field, page)  {
  return function(dispatch){
    dispatch(setSubHeading('User Profile'))
    dispatch(pageLoading())
    axios({
      method:'get',
      url:apiUrl+'users/profile/'+userId+'/'+field+'/'+page,
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('token')
      }
    })
    .then( (response) => {
      dispatch(setTotalPages(response.data.pages))
      dispatch(pageLoadedInOrder(response.data.docs))
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed())
    })
  }
}

// SEARCH FUNCTIONS
export function search(searchQuery, page)  {
  return function(dispatch){
    dispatch(setSubHeading('Search Page'))
    dispatch(pageLoading())
    axios({
      method:'get',
      url:apiUrl+'search/'+searchQuery+'/'+page,
    })
    .then( (response) => {
      dispatch(setTotalPages(response.data.pages))
      dispatch(pageLoadedInOrder(response.data.docs))
    })
    .catch( (err) => {
      // dispatch(userDataLoadFailed())
    })
  }
}