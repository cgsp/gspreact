export const myCompareArr = (oldChecked, newChecked) => {
  let addBindResourcesIds = []
  let unbindResourcesIds = []
  for (let index = 0; index < oldChecked.length; index++) {
    const element = oldChecked[index]
    if (newChecked.indexOf(element) === -1) {
      // 新的里面没有，但是旧的里面有，证明是被删除了
      unbindResourcesIds.push(element)
    }
  }
  for (let j = 0; j < newChecked.length; j++) {
    const jItem = newChecked[j]
    if (oldChecked.indexOf(jItem) === -1) {
      // 旧的里面没有，但是新的的里面有，证明是被添加的
      addBindResourcesIds.push(jItem)
    }
  }
  return {
    addBindResourcesIds,
    unbindResourcesIds
  }
}
