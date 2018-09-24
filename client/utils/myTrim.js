function myTrim(str) {
  if (typeof str !== 'string') {
    return ''
  }
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

export { myTrim }
