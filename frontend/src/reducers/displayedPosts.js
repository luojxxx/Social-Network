import {generateThreadedPosts, remove, postSorter, insertIntoNestedList} from '../libraryHelper'

export const displayedPosts = (state = {
  data: {},
  dataOrder: [],
  sortBy: 'dateSubmitted',
  sortDirection: 'down',
}, action) => {
  switch (action.type) {

    case 'PAGE_LOADED':
    var pageData = action.payload
    var threadedPosts = generateThreadedPosts(pageData)
    var data = threadedPosts[0]
    for (let key in data) {
      data[key]['dateSubmitted'] = Date.parse(data[key]['dateSubmitted'])
    }
    var dataOrder = threadedPosts[1]
    postSorter(data, dataOrder, state.sortBy, state.sortDirection)
    return {
      ...state,
      data: data,
      dataOrder: dataOrder,
    }


    case 'PAGE_LOADED_IN_ORDER':
    var pageData = action.payload
    var data = {}
    var dataOrder = []
    for (let idx in pageData) {
      let item = pageData[idx]
      data[item._id] = item
      dataOrder.push({postId: item._id, children: []})
    }
    for (let key in data) {
      data[key]['dateSubmitted'] = Date.parse(data[key]['dateSubmitted'])
    }

    return {
      ...state,
      data: data,
      dataOrder: dataOrder,
    }


    case 'UPDATE_NEW_POST':
    var newPostData = action.payload
    newPostData.dateSubmitted = Date.parse(newPostData.dateSubmitted)
    var data = Object.assign({}, state.data)
    data[newPostData._id] = newPostData

    var dataOrder = Object.assign([], state.dataOrder)
    dataOrder = insertIntoNestedList(dataOrder, newPostData.parent, newPostData._id, false)

    return {
      ...state,
      data: data,
      dataOrder: dataOrder
    }

    case 'UPDATE_EDIT_POST':
    var newData = Object.assign({}, state.data)
    var postId = action.payload.postId
    var postData = action.payload.data

    newData[postId].contentTitle = postData.contentTitle
    newData[postId].contentTag = postData.contentTag
    newData[postId].contentLink = postData.contentLink
    newData[postId].contentDescription = postData.contentDescription

    return {
      ...state,
      data: newData
    }


    case 'UPDATE_NEW_VOTE':
    var newData = Object.assign({}, state.data)
    var postId = action.payload.postId
    var priorVote = action.payload.priorVote
    var currentVote = action.payload.currentVote

    var updateScore = 0
    if (currentVote === priorVote) {
      updateScore = (-1*priorVote)
    } else {
      updateScore = currentVote - priorVote
    }

    newData[postId].score += updateScore

    return {
      ...state,
      data: newData
    }


    case 'UPDATE_NEW_DELETED_POST':
    var newData = Object.assign({}, state.data)
    var postId = action.payload

    newData[postId].submittedByUserName = 'deleted'
    newData[postId].contentTitle = 'deleted'
    newData[postId].contentTag = ''
    newData[postId].contentLink = ''
    newData[postId].contentDescription = ''

    return {
      ...state,
      data: newData
    }


    case 'SORT_POSTS':
    var sortBy = action.payload.sortBy
    var sortDirection = action.payload.sortDirection
    var dataOrder = Object.assign([], state.dataOrder)
    postSorter(state.data, dataOrder, sortBy, sortDirection)
    return {
      ...state,
      dataOrder: dataOrder,
      sortBy: sortBy,
      sortDirection: sortDirection
    }

    default:
    return state
  }
}