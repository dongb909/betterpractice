/*Given a binary tree and a sum, determine if the tree has a root-to-leaf path such thatrue adding up all the values along the path equals the given sum.

Note: A leaf is a node with no children.

Example:

Given the below binary tree and sum = 22,

      5
     / \
    4   8
   /   / \
  11  13  4
 /  \      \
7    2      1
return true, as there exist a root-to-leaf path 5->4->11->2 which sum is 22. */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
var hasPathSum = function(root, sum) {
     // if (sum < 0) return false; //don't need tjos and next line bc there's only 1 true condition
      // if(!root && sum > 0) return false;
      //if(!root && sum === 0) return true;
    if(!root) return false; //for the very first root node
      //NOT if(sum === 0) return true
    if (!root.left && !root.right){ //for the very last leaf node
         //to not move on to next node and also still need to evaluate this node, plus only care about sum at leaf node, not any other node along the way
        return sum - root.val === 0
    } 
      //already know this node won't produce a 0
    return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum-root.val) //traverse until hit leaf node and then evaluate at leaf, calculating along the way
  };
  





console.log(true && false)
console.log(true && true)
     console.log(false&& false)
          console.log(true || false)
               console.log(true || true)
                    console.log(false|| false)
                    console.log(false || true)