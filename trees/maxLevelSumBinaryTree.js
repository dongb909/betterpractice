/*Given the root of a binary tree, the level of its root is 1, the level of its children is 2, and so on.
Return the smallest level X such that the sum of all the values of nodes at level X is maximal.
Input: [1,7,0,7,-8,null,null]
Output: 2
Explanation: 
Level 1 sum = 1.
Level 2 sum = 7 + 0 = 7.
Level 3 sum = 7 + -8 = -1.
So we return the level with the maximum sum which is level 2.
The number of nodes in the given tree is between 1 and 10^4.
-10^5 <= node.val <= 10^5 
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 * @param {TreeNode} root
 * @return {number}
 */

/*
var maxLevelSum = function(root) {
  let maxSum = Number.NEGATIVE_INFINITY
  let maxLevel = 0
  if (!root) return maxLevel;
  let queue = [root]
  let nextQueue = []
  let currentSum = 0
  let currentLevel = 1
  while (queue.length > 0) {
      let currentNode = queue.shift()
      currentSum += currentNode.val
      if(currentNode.left) nextQueue.push(currentNode.left)
      if(currentNode.right) nextQueue.push(currentNode.right)
      if(queue.length === 0) {
          let temp = queue
          queue = nextQueue
          nextQueue = temp    //NOTE: BEEEEE CAREEEEFULLLLLLLLLLLL REMEMBER TO PUT TEMP IN
          
          if(currentSum > maxSum) {
              maxSum = currentSum
              maxLevel = currentLevel
          }
          currentLevel++
          currentSum = 0
      }
  }
  return maxLevel
};

*/

var maxLevelSum = function (root) {
  //can't really do recursion on DFS
  let minimumMaxLevel = 0,
    currLevel = 1,
    maxSum = Number.NEGATIVE_INFINITY,
    q = [root],
    nextQ = [],
    currSum = 0,
    currNode;
  if (!root) return minimumMaxLevel;
  while (q.length > 0) {
    currNode = q.pop(); //don't really need a q per se since it doesn't matter the order you add it, just the sum of the level
    currSum += curr.val;
    if (currNode.left) nextQ.push(currNode.left);
    if (currNode.right) nextQ.push(currNode.right);
    if (q.length === 0) {
      q = nextQ;
      nextQ = [];
      if (currSum > maxSum) {
        maxSum = currSum;
        minimumMaxLevel = currLevel;
      } else if (currSum === maxSum) {
        minimumMaxLevel = Math.min(minimumMaxLevel, currLevel);
      }
      currLevel++;
      currSum = 0; //YOU TOTALLY FORGOT TO RESET CURRSUM!!! so you got some right answers and some wrong
    }
  }
  //   console.log(maxSum)
  return minimumMaxLevel;
};
//WORKS! confirmed on leetcode
