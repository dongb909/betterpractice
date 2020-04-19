/*
A tree is "superbalanced" if the difference between the depths of any two leaf nodes ↴ is no greater than one.


  function isBalanced(treeRoot) {

  // A tree with no nodes is superbalanced, since there are no leaves!
  if (!treeRoot) {
    return true;
  }

  const depths = []; // We short-circuit as soon as we find more than 2

  // Nodes will store pairs of a node and the node's depth
  const nodes = [];
  nodes.push([treeRoot, 0]);

  while (nodes.length) {

    // Pop a node and its depth from the top of our stack
    const nodePair = nodes.pop();
    const node = nodePair[0];
    const depth = nodePair[1];

    if (!node.left && !node.right) {

      // Сase: we found a leaf
      // We only care if it's a new depth
      if (depths.indexOf(depth) < 0) {
        depths.push(depth);

        // Two ways we might now have an unbalanced tree:
        //   1) More than 2 different leaf depths
        //   2) 2 leaf depths that are more than 1 apart
        if (
          (depths.length > 2)
          || (depths.length === 2 && Math.abs(depths[0] - depths[1]) > 1)
        ) {
          return false;
        }
      }
    } else {

      // Case: this isn't a leaf - keep stepping down
      if (node.left) {
        nodes.push([node.left, depth + 1]);
      }
      if (node.right) {
        nodes.push([node.right, depth + 1]);
      }
    }
  }

  return true;
} */

//returning true or false
function isBalanced(treeRoot) {
  if (!treeRoot) return true; //no node is considered balanced
  //else there IS a node so check it's return, root node is always considered at height 0
  //check node's left and right to see if their sum is < 2
  return check(treeRoot) !== -1;

}
//returning a number
function check (node){
  //if current node is null, it should return -1 to parent
  if (!node) return 0;
  let left = check(node.left)
  let right = check(node.right)
  if (Math.abs(left-right) > 1 || )return -1 

  //don't care about val , just if node is present and we've passed that node is present
  //since node is present, then check left and right children and return the max value of both returned and add 1 to count for that level
  return Math.max(left, right) + 1; //node left if present will return 0 if it's a leaf node, bc its left -1 right -1 max of that is -1 + 1 = 0 which belongs to leaf node level
  //if node right will return 0  as well then that means that current nodes two children returns max of 0 which of 0 so current level is 1 etc
  //thus, current node would return 1 to it's parent to count itself

}

///ASKING FOR NO TREE HEIGHT TO BE 0, IF THERE IS A ROOT THEN ROOT IS 1 which maked sense since  level can't be negative!

var isBalanced = function(node) { //this function returns a boolean
  //if node is null then you return true for just this currence
  if (!node) return true;
  //now we know node is present, check to see if height of left and height of right is no > 1
  return Math.abs(getHeight(node.left) - getHeight(node.right)) < 2// IS STOP HERE THEN 
  //therefore now we know there is a node, check to see if right and left are balanced.
  // return isBalanced(node.left) && node.right(node.right) //so you can check at each node level and return early?

}


  function getHeight(node) { //this is a totally different function that finds the depth of the current node, returns only a number
      if(!node) return 0; //bc there's no level, if there is a node then return the max of its children's depth, THIS IS NOT CHECKING FOR BALANCE
      let left = getHeight(node.left);
      let right = getHeight(node.right);
      return Math.max(left, right) + 1;
};


let height = function(root){
  if(root==null)
      return 0;
  return 1+Math.max(height(root.left),height(root.right)); //giving you your local height
};
var isBalanced = function(root) {
  return root==null|| isBalanced(root.left)&&isBalanced(root.right)   //YOU'RE CHECKING BALANCE OF YOUR CHILDREN
  //why? have to ask? can't you just subtract

  &&Math.abs(height(root.left)-height(root.right))<2;  //YOU'RE CHECKING THE BALANCE OF YOURSELF OF JUST A NODE
  //if just have this then you're literally just checking height of the CORE ROOT and not it's children
  //but just because or left and right children have same height, doesn't mean that the left is balanced because left can be root.left.left.left and non have right side 
};
