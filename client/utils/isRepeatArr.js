export const isRepeatArr = (arr) => {
  let hash = {}
  for (let i in arr) {
    if (hash[arr[i]]) {
      return true
    }
    hash[arr[i]] = true
  }
  return false
}
