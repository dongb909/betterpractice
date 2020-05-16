/*Given a binary tree and a sum, find all root-to-leaf paths where each path's sum equals the given sum.

Note: A leaf is a node with no children.

Example:

Given the below binary tree and sum = 22,

      5
     / \
    4   8
   /   / \
  11  13  4
 /  \    / \
7    2  5   1
Return:

[
   [5,4,11,2],
   [5,8,4,5]
] */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
  // if (!root) return [] //takes care of very root node
  const paths = []
  traverse(root, sum, [], paths)
  return paths
};

const traverse = function(root, sum, path, paths){
  //IS NOT GOING TO RETURN ANYTHING BC IS JUST GOING TO ADD TO OUR PATHS LIST
  //only care about when reach leaf node but regardless, add current node to path along the way
  if(!root) return; //takes care of very root node
  path.push(root.val)

  //if at leaf
  if(!root.left && !root.right) {
      if (sum - root.val === 0) {
          paths.push(path)
          //you just forgot to return here
          return;
      }
  }
  //if not at leaf, remember already pushed path so now just traverse again
  // return YOUR CONFUSION HERE WAS THAT YOU HAD TO RETURN SOMETHING BUT YOU DON'T BC YOU JUST WANT TO MODIFY YOUR PATHS WHICH YOU'LL BE DOING BY PUSHIN
  //ALSO, YOU WERE GOING TO JUST PUT PATH IN THE PARAM, BUT YOU HAVE TO CREATE A NEW COPY EACH TIME SO THAT YOU'RE NOT PASSING THE SAME REFERENCE EACH TIME
  traverse(root.left, sum - root.val, path.slice(), paths)
  traverse(root.right, sum - root.val, path.slice(), paths)
  //DON'T DO NEW ARRAY(...PATH) BC WILL BE REFERENCING THE OLD ORGINAL ARRAY!!
  return
}