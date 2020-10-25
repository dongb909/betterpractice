/*Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).

For example:
Given binary tree [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
return its level order traversal as:
[
  [3],
  [9,20],
  [15,7]
] */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
/*
BFS - single q
BFS - double q
DFS - tracking depth, must pass depth down with param as(node, depth) with each pass doing depth +1 then when on the node just push it to the order array at the index of the depth

*/

letLevelOrderPractice = function (root) {
  if (!root) return []
  let result = [], q = [root], nextQ = [], values= [], curr
  // , tracker = 0
  while (q.length > 0) {
    // [curr, lev] = q.shift()
    curr = q.shift()
    values.push(curr.val)
    curr.left && nextQ.push(curr.left)
    curr.right && nextQ.push(curr.right)
    if(q.length === 0){ //you were putting this in the beginning and also you were pushing to nextQ instead of pushing to values
      result.push(values)
      q = nextQ
      nextQ = new Array()
      values = new Array()
    } 
  }
  // if(nextQ.length >0) result.push(nextQ)
  return result

} //WORKS! on leetcode.


/*
//NOTE: USE 2 QUEUES AND SWAP THEM AND ALL VALUES ARE IN OUTTER PORTION
var levelOrder = function(root) {
  const finalOrder = []
  //pretend is a q
  let queue = [root]
  if(!root) return finalOrder
  let nextQueue = []
  let values = []
  while (queue.length > 0) {
      let currentNode = queue.shift()
      values.push(currentNode.val)
      if(currentNode.left) nextQueue.push(currentNode.left)
      if(currentNode.right) nextQueue.push(currentNode.right)
      if(queue.length === 0) {
          let temp = queue
          queue = nextQueue
          nextQueue = temp
          finalOrder.push(values)
          values = []
      }
  }
  return finalOrder
};
*/