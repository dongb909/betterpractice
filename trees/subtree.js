/*Given two non-empty binary trees s and t, check whether tree t has exactly the same structure and node values with a subtree of s. A subtree of s is a tree consists of a node in s and all of this node's descendants. The tree s could also be considered as a subtree of itself.

Example 1:
Given tree s:

     3
    / \
   4   5
  / \
 1   2
Given tree t:
   4 
  / \
 1   2
Return true, because t has the same structure and node values with a subtree of s.
Example 2:
Given tree s:

     3
    / \
   4   5
  / \
 1   2
    /
   0
Given tree t:
   4
  / \
 1   2
Return false. */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */

class Node {
   constructor(val) {
     this.val = val
     this.right = this.left = null
   }
 }
 
 // let result = null;
 
 const isSubtree = (s, t) => { // boolean (true or false)
   if (!s || !t) return false;
   let nodeFound = findPair(s,t);
   return !nodeFound ? false: compareNodes(nodeFound,t)  // false
 }
 
 const findPair = (snode, tnode) => {
   if (!snode || !tnode) return false;
   if (snode.val === tnode.val) return snode;
   return findPair(snode.left, tnode) || findPair(snode.right, tnode);
 }
 
 const compareNodes = (snode, tnode) => { // boolean (true or false)
   if (!snode && !tnode) return true;
   if (!snode || !tnode) return false;
   if (snode.val !== tnode.val) return false;
   //if equal then check children
   let left = compareNodes(snode.left, tnode.left)
   let right = compareNodes(snode.right, tnode.right)
   return left && right; 
   
 }
 
 
 
 let s = new Node(3)
 s.right = new Node(5)
 s.left = new Node(4)
 s.left.left = new Node (1)
 s.left.right = new Node (2)
 
 
 let t = new Node(4)
 t.left = new Node(1)
 t.right = new Node(2)
 
 isSubtree(s,t)
 console.log(result);
 
 
 // IFFE (immediate invoked function expression)