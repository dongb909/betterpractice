/*Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

Given binary search tree:  root = [6,2,8,0,4,7,9,null,null,3,5]


 

Example 1:

Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6
Explanation: The LCA of nodes 2 and 8 is 6.
Example 2:

Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
Output: 2
Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.
 

Note:

All of the nodes' values will be unique.
p and q are different and both values will exist in the BST. */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */


const lowestCommonAncestor = (root, p, q) => {
  if (!root || root === p || root === q) return root
  const left = lowestCommonAncestor(root.left, p, q)  //==> will return a node
  const right = lowestCommonAncestor(root.right, p, q)  //==> will return a node
  if (!left) return right  // p and q are in the right subtree because left node is null and if it had found something then a node would have returned for it
  if (!right) return left  // p and q are in the left subtree
  return root              // p is in one side and q is in the other  //both left and right have valid nodes returned 
};






function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  var resL = lowestCommonAncestor(root.left, p, q);
  var resR = lowestCommonAncestor(root.right, p, q);
  return (resL && resR) ? root : (resL || resR);
}




/*class Tree {
    constructor(name) {
        this.name = name;
        this.ancestor = null;
    }
}

//3 instances of the class, you don't know the children
//1 = root
//2 = 
//3 = 

//return youngest ancestor to the 2 descendants


function yca (root, des1, des2) {
    if (root.name === des1.name && root.name === des2.name) return root;
    
    let desA = new Set(); // A, I, D, B
    desA.add(root.name);
    
    while (des1.name !== root.name) {
        desA.add(des1.name);
        des1 = des1.ancestor;
    }
    
    while (!desA.has(des2.name)) {
        des2 = des2.ancestor;
    }
    
    return des2;
}


topAncestor = Node A
descendantOne = Node I
descendantTwo = Node E

          A
       /     \
      B       C
    /   \   /   \
   D     E F     G
 /   \
H     I

Output: Node B
 */

/*unction getYoungestCommonAncestor(topAncestor, descendantOne, descendantTwo) {
    const detectedAncestorsOne = new Set();
    const detectedAncestorsTwo = new Set();
    let nodeOne = descendantOne;
    let nodeTwo = descendantTwo;
    
    while (nodeOne.ancestor || nodeTwo.ancestor) {
        detectedAncestorsOne.add(nodeOne.name);
        detectedAncestorsTwo.add(nodeTwo.name);
        
        if (detectedAncestorsTwo.has(nodeOne.name)) {
            return nodeOne;
        }
        
        if (detectedAncestorsOne.has(nodeTwo.name)) {
            return nodeTwo;
        }
        
        if (nodeOne.ancestor) {
            nodeOne = nodeOne.ancestor;
        }
        
        if (nodeTwo.ancestor) {
            nodeTwo = nodeTwo.ancestor;
        }
    }
    
    return topAncestor; */