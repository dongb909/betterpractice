/*
Given a binary tree, determine if it is a valid binary search tree (BST).

Assume a BST is defined as follows:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.

From the above properties it naturally follows that:
• Each node (item in the tree) has a distinct key.
 

Example 1:

    2
   / \
  1   3

Input: [2,1,3]
Output: true
Example 2:

    5
   / \
  1   4
     / \
    3   6

Input: [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4. */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */

function TreeNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
}

var isValidBST = function(root) {

//   const traverse = node => {
//     //will always care about left child first. not even current node
//     node.left && traverse(node.left);
//     compareNodes(node);
//     node.right && traverse(node.right); 
//   }
  return compareNodes(root)
    
};

let compareNodes = node => {
    if (node === null) return true;
    if (node.left && node.val < node.left.val || node.right && node.val > node.right.val) return false;
    return compareNodes(node.right) && compareNodes(node.left);
}

let tree = new TreeNode(3)
tree.left = new TreeNode(2)
tree.right = new TreeNode(0)
tree.left.left = new TreeNode(1)
// tree.left.left.left = new TreeNode(0)


console.log(isValidBST(tree))

// console.log(tree)




/*  function isBinarySearchTree(treeRoot, lowerBound, upperBound) {
  lowerBound = (typeof lowerBound !== 'undefined') ? lowerBound : Number.NEGATIVE_INFINITY;
  upperBound = (typeof upperBound !== 'undefined') ? upperBound : Number.POSITIVE_INFINITY;

  if (!treeRoot) return true;

  if (treeRoot.value >= upperBound || treeRoot.value <= lowerBound) {
    return false;
  }

  return isBinarySearchTree(treeRoot.left, lowerBound, treeRoot.value)
    && isBinarySearchTree(treeRoot.right, treeRoot.value, upperBound);
}


Complexity
O(n)O(n) time and O(n)O(n) space.*/
