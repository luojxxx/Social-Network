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

export const remove = (array, targetArr) => {
    return array.filter(e => !targetArr.includes(e))
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
  var listOfList = [startId, []]

  var children = data[startId].children
  if (children.length > 0) {
    for (var idx in children) {
      var postId = children[idx]
      if (postId in data) {
        listOfList[1].push(getListofList(data, postId))
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