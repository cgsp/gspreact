export const getMaxLineId = (arr) => {
  if (arr.length === 0) {
    return 0
  }
  let newArr = []
  arr.forEach((item) => {
    newArr.push(item.lineId.split('-')[1] - 0)
  })
  const max = Math.max.apply(null, newArr)
  return max
}
