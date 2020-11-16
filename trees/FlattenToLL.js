function TreeNode (val){
  this.val = val
  this.left = this.right = null
}

function flattenToLL(root){
  if (!root) return null
  let list = new TreeNode('null')
  let pointer = list
  // let arr = []
    function flatten(node){
      if (!node) return
      // arr.push(node.val)
      pointer.val = node.val
      pointer.right = new TreeNode('null')
      pointer = pointer.right
      node.left && flatten(node.left)
      node.right && flatten(node.right)
    }
  flatten(root)
  return list.right.right.right
}



let tree = new TreeNode(1)
tree.left = new TreeNode(2)
tree.left.left = new TreeNode(3)
tree.left.right = new TreeNode(4)
tree.right = new TreeNode(5)
tree.right.right = new TreeNode(6)

console.log(flattenToLL(tree))