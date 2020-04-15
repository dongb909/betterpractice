/*
Given a binary tree, find its maximum depth.

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

Note: A leaf is a node with no children.

Example:

Given binary tree [3,9,20,null,null,15,7],

    3
   / \
  9  20
    /  \
   15   7
return its depth = 3. */

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
class Node {
  constructor (val) {
    this.val = val;
    this.left=this.right=null;
  }
}


//keep track of current depth to compare with max depth and update max depth
//clarify with interviewer what they consider rootnode as, normally it's 0 for root
//don't want to access global veriables from closures
//create outter function that holds max
//helper traversal dfs
    //return val and compare with max

//root = null, no

// maxDepth(root);

// var maxDepth = function(root) {}    //get's hoisted must declare in order
//



// function findMaxDepth(root) {        //not hoisted, can call even before it's made
//    //assuming valid root
//   return traverse(root) - 1   //2
  
// }

// /*
//      3 node.left = 2
//     /
//    9 node.left = 1
//   /
//  8   
// */

// function traverse (node) {
//  if(!node) return 0; // haven't yet accounted for the node, we must do so somewhere. right?
//  let left = traverse(node.left)  // 0
//  let right = traverse(node.right)  // 0
//  return Math.max(left, right) + 1 // the 1 represents your 8 node
// }

// can't really hear you right now.




// function findMaxDepth (root) {
//   let stack = [[root,0]];
//   let depth = 0;
//   while (stack.length !== 0) {
//     let [node, currentDepth] = stack.pop();
    
//     if (node.left) stack.push([node.left, currentDepth+1])
//     if (node.right) stack.push([node.right, currentDepth+1])
//     depth = Math.max(depth, currentDepth) 
//   }
//   return depth;
// }




let tree = new Node (3)
tree.left = new Node (9)
tree.left.left = new Node (8)
tree.right = new Node (11)
tree.right.right = new Node (15)

tree.right.right.right = new Node (17)
tree.right.right.right.left = new Node(88)
tree.right.right.right.left.left = new Node(90)






/*
      3
     / \
    9   11
   /     \
  8       15
           \
           17
           /
          88
        /
        90
          
*/

console.log(findMaxDepth(tree))


function findMaxDepth(root) {
   //assuming valid root
  return traverse(root) - 1   //2
  
}

/*
     3 node.left = 2
    /
   9 node.left = 1
  /
 8   
*/

function traverse (node) {
 if(!node) return 0; // haven't yet accounted for the node, we must do so somewhere. right?
 let left = traverse(node.left)  // 0
 let right = traverse(node.right)  // 0
 return Math.max(left, right) + 1 // the 1 represents your 8 node
}

