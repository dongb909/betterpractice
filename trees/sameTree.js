/*
Given two binary trees, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical and the nodes have the same value.

Example 1:

Input:     1         1
          / \       / \
         2   3     2   3

        [1,2,3],   [1,2,3]

Output: true
Example 2:

Input:     1         1
          /           \
         2             2

        [1,2],     [1,null,2]

Output: false
Example 3:

Input:     1         1
          / \       / \
         2   1     1   2

        [1,2,1],   [1,1,2]

Output: false */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */

class Node {
constructor(val) {
        this.val = val
        this.right = this.left = null
}
}

let s = new Node(3)
s.right = new Node(5)
s.left = new Node(4)
s.left.left = new Node (1)
s.left.right = new Node (2)


let t = new Node(4) 
t.left = new Node(1)
t.right = new Node(2)

let v = new Node(4) 
v.left = new Node(1)
v.right = new Node(2)




var isSameTree = function(p, q) {
  if (p === null && q === null) return true;
  if (!p || !q || p.val !== q.val) return false;
  return isSameTree(p.left,q.left) && isSameTree(p.right,q.right)
};

console.log(isSameTree(v,t))