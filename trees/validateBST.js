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





//recursively
// var isValidBST = function(root) {
//     return isValid(root, -Infinity, Infinity)//NO!! want them to == null to reflect leaf nodes children!
//     // return isValid(root, null, null)
// };

// let isValid = function (node, min, max) {
//     if(!node) return true;
//     // console.log(0>max)
//     //check if node val is OUTSIDE of your window
//     if(node.val <= min || node.val >= max) return false;
//     return isValid(node.left,min,node.val) && isValid(node.right, node.val, max)     //THINK WINDOWWWWW
// }


//shrinking window as you traverse
    //     4
    //   /   \
    // 2       6
    ///  \    /  \
//   1    3   5   7
/*Number.MIN_VALUE is 5e-324, i.e. the smallest positive number that can be represented within float precision, i.e. that's as close as you can get to zero. It defines the best resolution floats give you.

Now the overall smallest value is Number.NEGATIVE_INFINITY although that's not really numeric in the strict sense.*/




// IN ORDER TRAVERSAL
// var isValidBST = function(root) {
//     let stack = []
    
//     //prev at first is the null child of most left node, then also becomes the parent of right child
//     while(root || stack.length){         //iterate all to left node
//         while(root){
//             stack.push(root)
//             root = root.left
//         }  
//         //curr is not null so use stack and see if prev aka the left child node of curr is > curr(in the first case is -infinity)
//         root = stack.pop()
//         root = root.right //if right is ever less than prev that's false too
//     }
//     return true
// };
//[1,5,3,4,6]

//stack is just to keep track of your traversal
//it's separate from evaluating and comparing.
//so traverse first then add the other stuff.

var isValidBST = function(root) {
  let stack = []
  let curr = [root,-Infinity, Infinity]
  //prev at first is the null child of most left node, then also becomes the parent of right child
  while(curr[0] || stack.length){         //iterate all to left node
      while(curr[0]){
          stack.push(curr)
          let [node, min, max] = curr
          if (node.val <=min || node.val >= max) return false
          curr = [node.left, min, node.val]
          // curr = [curr[0].left, curr[1],curr[0].val] // KEEP WITHIN WINDOW
      }  
      //curr is not null so use stack and see if prev aka the left child node of curr is > curr(in the first case is -infinity)
      curr = stack.pop()
      let [node, min, max] = curr //if right is ever less than prev that's false too
      if (node.val <=min || node.val >= max) return false
      curr = [node.right, node.val, max]
  }
  return true
};


/*
public class Solution {
  public boolean isValidBST(TreeNode root) {
      return isValidBST(root, Long.MIN_VALUE, Long.MAX_VALUE);
  }
  
  public boolean isValidBST(TreeNode root, long minVal, long maxVal) {
      if (root == null) return true;
      if (root.val >= maxVal || root.val <= minVal) return false;
      return isValidBST(root.left, minVal, root.val) && isValidBST(root.right, root.val, maxVal);
  }
}




public boolean isValidBST(TreeNode root) {
  if (root == null) return true;
  Stack<TreeNode> stack = new Stack<>();
  TreeNode pre = null;
  while (root != null || !stack.isEmpty()) {
     while (root != null) {
        stack.push(root);
        root = root.left;
     }
     root = stack.pop();
     if(pre != null && root.val <= pre.val) return false;
     pre = root;
     root = root.right;
  }
  return true;
} */