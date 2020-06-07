/*Given an array where elements are sorted in ascending order, convert it to a height balanced BST.
For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.

Given the sorted array: [-10,-3,0,5,9],
One possible answer is: [0,-3,9,-10,null,5], which represents the following height balanced BST:
      0
     / \
   -3   9
   /   /
 -10  5*/
 /**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */

var sortedArrayToBST = function(nums) {
  if (nums.length===0) return null;
  return createBST(nums, 0, nums.length-1)
};

let createBST = (nums, left, right) => {
  if (left>right) return null;
  let midpoint = left + Math.ceil((right - left)/2);
  //ORRRRR let midpoint = Math.floor((right + left)/2);
  let node = new TreeNode(nums[midpoint]);
  node.left = createBST(nums, left, midpoint-1)
  node.right = createBST(nums, midpoint +1 , right)
  return node
}