/* Given a binary tree, find the length of the longest consecutive sequence path.

The path refers to any sequence of nodes from some starting node to any node in the tree along the parent-child connections. The longest consecutive path need to be from parent to child (cannot be the reverse).
Needs to be increasing in path.
For example,

   1
    \
     3
    / \
   2   4
        \
         5
Longest consecutive sequence path is 3-4-5, so return 3.

   2
    \
     3
    / 
   2    
  / 
 1
Longest consecutive sequence path is 2-3,not3-2-1, so return 2.
https://cheonhyangzhang.gitbooks.io/leetcode-solutions/content/298-binary-tree-longest-consecutive-sequence.html
*/

const longestPath = function(root){
  if(!root) return 0
  let maxPath = [0]
  dfs(root, root.val-1, maxPath, 0) //or can start with root.val and then in dfs do if node.val === target
  return maxPath[0]
}

const dfs= function(node, prevVal, max, count){
  //if curr node is less than prev or at leafthen compare with max before resetting count
  // console.log(prevVal, max, count)
  if(!node) return
  //next is if currnode is >= prev then add to count (don't compare with max, only do that if it's less than or if at leaf)
  // if(node.val < prevVal || node.val > prevVal + 1) {
  //   max[0] = Math.max(max[0], count) NO NOT HERE
  //   count = 1
  // }
  if(node.val === prevVal + 1) count++
  else count = 1
  //eitherway, always compare max
  max[0] = Math.max(max[0], count)
  dfs(node.left, node.val, max, count)
  dfs(node.right, node.val, max, count)
}

function Node(val){
  this.val = val
  this.left = this.right = null
}

let ex1 = new Node(1)
ex1.right = new Node(3)
ex1.left = new Node(2)
ex1.right.right = new Node(4)
ex1.right.right.right = new Node(5)

let ex2 = new Node(2)
ex2.right= new Node(3)
ex2.right.left= new Node(2)
ex2.right.left.left = new Node(1)
let ex3 = new Node(7)
let ex4

console.assert(longestPath(ex1) === 3, "Should return 3")
console.assert(longestPath(ex2) === 2, "Should return 2")
console.assert(longestPath(ex3) === 1, "Should return 1")
console.assert(longestPath(ex4) === 0, "Should return 0")
