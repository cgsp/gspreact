const myGetJsonTree = (plainArr, pid) => {
  let jsonTree = []
  for (let i = 0; i < plainArr.length; i++) {
    const node = plainArr[i]
    // plainArr.splice(i, 1)
    if (node.pid === pid) {
      const newNode = {
        id: node.id,
        name: node.name,
        code: node.code,
        children: myGetJsonTree(plainArr, node.id)
      }
      jsonTree.push(newNode)
    }
  }
  return jsonTree
}

export { myGetJsonTree }
