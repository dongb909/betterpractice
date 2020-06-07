/*Invert a binary tree.
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

 //edge: if only 1 child and other is null, if only 1 root node aka no children, no root, 
var invertTree = function(root) {  
  if (!root) return root ; //just used to stop recursion but not storing anything anywhere
  //same with if one child is null and other is value bc still swapping so only care about swapping
  if(!root.left && !root.right)return root //this allows it to skip the last step of the leaf node
    //good for when you have a lot of leaf nodes. if not then it makes th ecode more ugly
  invertTree(root.left)   // 9  //inverted IN PLACE
  invertTree(root.right)   //6  //inverted IN PLACE
  const temp = root.left
  root.left = root.right
  root.right = temp  
  return root;    //returning the inverted tree at that root
};

//inverting tree in place so don't have to return anything bc just working on the reference of the tree

var invertTree = function(root) {
  if (root) {
      [root.left, root.right] = [invertTree(root.right), invertTree(root.left)]
  }
  return root
};