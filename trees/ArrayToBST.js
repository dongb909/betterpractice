/*Given an array where elements are sorted in ascending order, convert it to a height balanced BST.
For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.

Given the sorted array: [-10,-3,0,5,9],
One possible answer is: [0,-3,9,-10,null,5], which represents the following height balanced BST:
      0
     / \
   -3   9
   /   /                    YOU DON'T HAVE TO CARE ABOUT ORDER BC THE ARRAY IS ALREADY SORTED SO IF YOU GO THROUGH THE ARR IN A BINARY WAY, IT WILL AUTOMATICALLY END UP WHERE IT SHOULD BE IN A BST
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

/*
 //NOT CALCULATING IF IT'S BALANCED HERE. JUST MAKING IT BALANCED AS YOU CREATE IT.
var sortedArrayToBST = function(nums) {
  if (nums.length===0) return null;
  return createBST(nums, 0, nums.length-1) //YOU'RE STARTING WITHIN BOUNDS HERE ALREADY, THE FUNCTION NEVER LETS YOU GO OUT OF BOUNDS AND JUST HAVE TO DO 1 COMPARISON CHECK.
};

let createBST = (nums, left, right) => {
  if (left>right) return null;              ///YOU KEEP FORGETTING THIS PART.
  let midpoint = left + Math.ceil((right - left)/2);
  //ORRRRR let midpoint = Math.floor((right + left)/2);
  let node = new TreeNode(nums[midpoint]);
  node.left = createBST(nums, left, midpoint-1)
  node.right = createBST(nums, midpoint +1 , right)
  return node
}
*/

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

//PRACTICE
function sortedArrayToBST(nums) {
  if (nums.length === 0) return null;
  return createBST(nums, 0, nums.length - 1);
}

function createBST(arr, l, r) {
  // let midpoint = Math.floor((r - l)/2)NO!!
  if (l > r) return null; //FORGOT TO DO THIS!!!, AND SHOULD BE > NOT EQUAL TO bc we still need to add in that last node
  let midpoint = l + Math.ceil((r - l) / 2); //where the l index currently is and then ADD half of the current range from THE LEFT point
  let node = new TreeNode(arr[midpoint]);
  node.left = createBST(arr, l, midpoint - 1); //don't want to include the index we already dealt with
  node.right = createBST(arr, midpoint + 1, r);
  return node;
}

console.log(sortedArrayToBST([-10, -3, 0, 5, 9]));
