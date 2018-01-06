// GENERIC HELPER FUNCTIONS
export const remove = (array, targetArr) => {
    return array.filter(e => !targetArr.includes(e))
}

// FUNCTIONS FOR GENERATING THREADED POSTS
export const getTree = (data, startId) => {
  var tree = {}
  if (!(startId in data)) {
    return tree
  }
  var children = data[startId].children
  if (children.length > 0) {
    for (var idx in children) {
      var postId = children[idx]
      tree[postId] = getTree(data, postId)
    }
  }
  return tree
}

export const navigateTree = (data, startId) => {
  while (data[startId].parent !== '' && data[startId].parent in data) {
    startId = data[startId].parent
  }
  return getTree(data, startId)
}

function getKeys(obj) {
  var all = {}
  var seen = []
  checkValue(obj)
  return Object.keys(all)
  function checkValue(value) {
    if (Array.isArray(value)) return checkArray(value)
    if (value instanceof Object) return checkObject(value)
  }
  function checkArray(array) {
    if (seen.indexOf(array) >= 0) return
    seen.push(array)
    for (var i = 0, l = array.length; i < l; i++) {
      checkValue(array[i])
    }
  }
  function checkObject(obj) {
    if (seen.indexOf(obj) >= 0) return
    seen.push(obj)
    var keys = Object.keys(obj)
    for (var i = 0, l = keys.length; i < l; i++) {
      var key = keys[i]
      all[key] = true
      checkValue(obj[key])
    }
  }
}

export const getForest = (data, allIds) => {
  var forest = {}
  while (allIds.length !== 0) {
    var tree = navigateTree(data, allIds[0])
    forest[allIds[0]] = tree

    var tempTree = {}
    tempTree[allIds[0]] = tree
    var idsInTree = getKeys(tempTree)
    allIds = remove(allIds, idsInTree)
  }
  return forest
}

export const getListofList = (data, startId) => {
  var listOfList = {postId: startId, children: []}

  var children = data[startId].children
  if (children.length > 0) {
    for (var idx in children) {
      var postId = children[idx]
      if (postId in data) {
        listOfList.children.push(getListofList(data, postId))
      }
    }
  }
  return listOfList
}

export const generateThreadedPosts = (data) => {
  var dataDic = {}
  var allPostIds = []
  for (var idx in data) {
    var item = data[idx]
    dataDic[item._id] = item
    allPostIds.push(item._id)
  }

  var graph = getForest(dataDic, allPostIds)

  var listOfList = []
  for (var key in graph) {
    listOfList.push(getListofList(dataDic, key))
  }
  return [dataDic, listOfList]
}

// DATE FORMATTING FUNCTIONS
export const convertToTimePassed = (time) => {
  var timeDiff = (Date.now() - time)/1000
  var displayTime = ''

  if (timeDiff>31104000) {
    let calcTime = Math.floor(timeDiff/31104000)
    let plural = (calcTime>1)?'s':''
    displayTime = String(calcTime)+' year'+plural
  } else if (timeDiff>2592000) {
    let calcTime = Math.floor(timeDiff/2592000)
    let plural = (calcTime>1)?'s':''
      displayTime = String(calcTime)+' month'+plural
  } else if (timeDiff>86400) {
    let calcTime = Math.floor(timeDiff/86400)
    let plural = (calcTime>1)?'s':''
      displayTime = String(calcTime)+' day'+plural
  } else if (timeDiff>3600) {
    let calcTime = Math.floor(timeDiff/3600)
    let plural = (calcTime>1)?'s':''
      displayTime = String(calcTime)+' hour'+plural
  } else if (timeDiff>60) {
    let calcTime = Math.floor(timeDiff/60)
    let plural = (calcTime>1)?'s':''
      displayTime = String(calcTime)+' minute'+plural
  } else {
    let calcTime = Math.floor(timeDiff)
    let plural = (timeDiff>1)?'s':''
    displayTime = String(calcTime)+' second'+plural
  }

  return displayTime
}

// SORTING FUNCTIONS
export const sortLayer = (dataDic, dataOrder, sortBy, sortDirection) => {
  var stableArray = Object.assign([], dataOrder)

  dataOrder.sort( (a,b) => {
    const aValue = dataDic[a.postId][sortBy]
    const bValue = dataDic[b.postId][sortBy]
    if (aValue < bValue) {
      return 1
    } else {
      return -1
    }
    return stableArray.indexOf(a) - stableArray.indexOf(b)
  })
  if (sortDirection === 'down') {
    return dataOrder
  } else if (sortDirection === 'up') {
    dataOrder.reverse()
    return dataOrder
  }
}

export const postSorter = (dataDic, dataOrder, sortBy, sortDirection) => {
  sortLayer(dataDic, dataOrder, sortBy, sortDirection)
  for (let idx in dataOrder) {
    if (dataOrder[idx].children.length > 0) {
      postSorter(dataDic, dataOrder[idx].children, sortBy, sortDirection)
    }
  }
}

// FUNCTIONS TO HELP INSERT NEW POST INTO NESTED DATA ORDER
export const insertIntoNestedList = (dataOrder, newPostParent, newPostId) => {
  var newDataOrder = []
  if (newPostParent === '') {
    newDataOrder.push({postId: newPostId, children: []})
  }
  for (let idx in dataOrder) {
    let post = dataOrder[idx]
    let pushedPost = {postId: post.postId, children: []}
    if (post.children.length > 0) {
      pushedPost.children = insertIntoNestedList(post.children, newPostParent, newPostId)
    }
    if (post.postId === newPostParent) {
      pushedPost.children = [{postId: newPostId, children: []}, ...pushedPost.children]
    }
    newDataOrder.push(pushedPost)
  }
  return newDataOrder
}

// const findAllParents = (dataDic, startId) => {
//   var allParents = []
//   while (dataDic[startId]['parent'] in dataDic) {
//     let parent = dataDic[startId]['parent']
//     allParents.push(parent)
//     startId = parent
//   }
//   allParents.reverse()
//   return allParents
// }


// var insertIntoNestedList = (dataOrder, allParents, newPostId) => {
//   var parent = allParents[0]
//   remove(allParents, [parent])
//   if (allParents.length === 0) {
//     parent.children.push({postId: newPostId, children: []})
//   }
//   for (let idx in dataOrder) {
//     let item = dataOrder[idx]
//     if (item.postId===parent) {
//       insertIntoNestedList(item.children, allParents, newPostId)
//     }
//   }
// }
