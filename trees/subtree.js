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
 
//THIS WORKS BUT NOT FOR IF THERE ARE DUPLICATE NUMBERS
 /********************** 
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
 ******************/

 //FOR DUPLICATE NUMBERS, HAVE TO JUST USE 2 RECURSIONS INSTEAD OF THREE
 const isSubtree = (s, t) => { 
  if (!s || !t) return false;
  //CHECK IF THE CURRENT NODES ARE SUBTREES, DON'T EVEN HAVE TO WORRY ABOUT CREATING ANOTHER HELPER TO TRAVERS S UNTIL FIND FIRST NODE THAT MATCHES T
  //COMPARENODES FUNCTION SHOULD ALREADY BE CHECKING IF THE NODES ARE EQUAL, SO IF IT RETURNS FALSE THEN RECURSE ON OWN FUNCTION
  if (compareNodes(s,t)) return true; 
  //you already see that current nodes don't work so check left and right node of s
  //if s tree is [1,1] t is [1] then it will only be true when it's the leaf node on the root node so the next round then the root node will also be the leaf node
  return isSubtree(s.left, t) || isSubtree(s.right, t)
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




 /* class Solution {
    public boolean isSubtree(TreeNode s, TreeNode t) {
        if (s == null) return false;
        /* treat each node as a root 
        if(isSame(s,t)) return true;
        return (isSubtree(s.left,t) || isSubtree(s.right,t)) ;
    }
    private boolean isSame(TreeNode s, TreeNode t){

        if(s==null && t==null ) return true;
        if(s==null || t==null) return false;
        
        if(s.val != t.val) return false;
        return isSame(s.left,t.left) && isSame(s.right, t.right);
        
    }
} */



/*
var isSubtree = function(s, t) {
  if(s===null) {
      return false;
  } else if(isSameTree(s,t)) {
      return true;
  } else {
      // if it's not the same tree or s is not null
      // call the function recursively checking with the
      // left and right nodes of s (return true if any of those are true)
      return isSubtree(s.left, t) || isSubtree(s.right, t)
  }
};

function isSameTree(s,t) {
    // if any of the trees is null they both should be null otherwise not the same
    if(s===null || t===null) return s===null && t===null;
    // if the root values are the same we continue to traverse the left and right sides of the trees
    if(s.val===t.val) {
        return isSameTree(s.left, t.left) && isSameTree(s.right, t.right);
    // otherwise return false
    } else {
        return false;
    }
} */



/*var isSubtree = function(s, t) {
    
    const checkTraversal = (snode, tnode) => {
        if(!snode && !tnode){
            return true;
        }
        if(!snode || !tnode || snode.val !== tnode.val){
            return false;
        }
        
        return snode.val === tnode.val && checkTraversal(snode.left, tnode.left) && checkTraversal(snode.right,tnode.right);
    }
    
    const traverse = (snode, tnode) => {
      
        return snode !== null && (checkTraversal(snode,tnode) || traverse(snode.left, tnode) || traverse(snode.right, tnode));
        
    }
    
    return traverse(s,t)
    
}; */