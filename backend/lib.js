exports.remove = (array, targetArr) => {
    return array.filter(e => !targetArr.includes(e))
}