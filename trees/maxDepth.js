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
return its depth = 3. */ // ROOT STARTS AT 1 HERE NOT 0

// Definition for a binary tree node.
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

/**
 * @param {TreeNode} root
 * @return {number}*/
class Node {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
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

// var maxDepth = function(root) {}    //only variable name is hoisted must declare in order
//

// function findMaxDepth(root) {        //IS hoisted, can call even before it's made
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

let tree = new TreeNode(3);

// tree.left = new Node (9)
// tree.left.left = new Node (8)
// tree.left.left.left = new Node(2)
// tree.right = new Node (11)
// tree.right.right = new Node (15)

// tree.right.right.right = new Node (17)
// tree.right.right.right.left = new Node(88)
// tree.right.right.right.left.left = new Node(90)

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

// console.log(findMaxDepth(tree))

/*
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
/*
function traverse (node) {
 if(!node) return 0; // haven't yet accounted for the node, we must do so somewhere. right?
 let left = 1 + traverse(node.left)  // 0
 let right = 1 + traverse(node.right)  // 0
 return Math.max(left, right) 
}




function maxDepth(node) {   //THEY WANT ROOT TO BE 1 or else if there's no tree then return 0 levels
  if (!node) return 0; //no node is considered balanced
  //else there IS a node so check it's return, root node is always considered at height 0
  return Math.max(maxDepth(node.left), maxDepth(node.right)) + 1; //checking depth NOT if is balanced

}

*/
//LITERALLY IS THE SAME EXCEPT FOR 1 LINE so combine!
//don't even need a helper functon
//returning a number
// function check (node){
//   //if current node is null, it should return -1 to parent
//   if (!node) return 0; //return -1 if they want root to equal 0 and no root to equal -1
//   //don't care about val , just if node is present and we've passed that node is present
//   //since node is present, then check left and right children and return the max value of both returned and add 1 to count for that level
//   return Math.max(check(node.left), check(node.right)) + 1; //node left if present will return 0 if it's a leaf node, bc its left -1 right -1 max of that is -1 + 1 = 0 which belongs to leaf node level
//   //if node right will return 0  as well then that means that current nodes two children returns max of 0 which of 0 so current level is 1 etc
//   //thus, current node would return 1 to it's parent to count itself

// }

//PRACTICE
function findMaxDepth(node) {
  //bottoms up approach
  if (!node) return 0;
  return Math.max(findMaxDepth(node.left), findMaxDepth(node.right)) + 1;
}

//PRACTICE ITERATIVE
function findMaxDepth2(root) {
  //top down approach
  if (!root) return 0;
  let q = [[root, 1]];
  // let depth = 1 //bc root counts as 1
  let max = 1;
  while (q.length > 0) {
    [node, lev] = q.shift();
    node.left && q.push([node.left, lev + 1]); //better to do it this way so the levels takes care of themselves instead of you having to track where the level is. its curr level will be saved and then the next round will add 1 to its saved level for the children nodes instead of using a global variable
    node.right && q.push([node.right, lev + 1]);
    max = Math.max(lev, max); //not lev + 1, but just lev, in case there's no more right/left node or any other children really
  }
  return max;
}
console.log(findMaxDepth2());
