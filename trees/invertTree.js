/*Invert a binary tree.

Example:

Input:

     4                      5             5
   /   \                  /   \         /    \      just swap chilren of 5
  2     7                3    7         7    3        BFS you're storing in Q so bettter to use DFS bc can store in stack with indices
 / \   / \
1   3 6   9           null null null
Output:

     4
   /   \
  7     2
 / \   / \
9   6 3   1
Trivia:
This problem was inspired by this original tweet by Max Howell:

Google: 90% of our engineers use the software you wrote (Homebrew), 
but you can’t invert a binary tree on a whiteboard so f*** off. */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root       9 is left subtree of 7 etc
 * @return {TreeNode}
 */

 //edge: if only 1 child and other is null, if only 1 root node aka no children, no root, 
var invertTree = function(root) {  //7
  if (!root) return root ; //just used to stop recursion but not storing anything anywhere
  // if (!root.left && !root.right) //ignore bc if both null, when swapped is some thing
  //same with if one child is null and other is value bc still swapping so only care about swapping
  if(!root.left && !root.right) {//this allows it to skip the last step of the leaf node
    //good for when you have a lot of leaf nodes. if not then it makes th ecode more ugly
    return root
    
  }
  invertTree(root.left)   // 9
  invertTree(root.right)   //6
  const temp = root.left
  root.left = root.right
  root.right = temp  
  return root;    //returning the inverted tree at that root
};

//inverting tree in place so don't have to return anything bc just working on the reference of the tree
//depends on the expection of the solution

var invertTree = function(root) {

}
