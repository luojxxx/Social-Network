exports.objectIdRemove = (array, targetArr) => {
    return array.filter(e => !targetArr.includes(String(e)))
}