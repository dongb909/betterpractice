/*A tree is "superbalanced" if the difference between the depths of any two leaf nodes ↴ is no greater than one.
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
// V1
//returning true or false
// function isBalanced(treeRoot) {
//   if (!treeRoot) return true; //no node is considered balanced
//   //else there IS a node so check it's return, root node is always considered at height 0
//   //check node's left and right to see if their sum is < 2
//   return check(treeRoot) !== -1;

// }
// //returning a number
// function check (node){
//   //if current node is null, it should return -1 to parent
//   if (!node) return 0;
//   let left = check(node.left)
//   let right = check(node.right)
//   if (Math.abs(left-right) > 1 || )return -1 

//   //don't care about val , just if node is present and we've passed that node is present
//   //since node is present, then check left and right children and return the max value of both returned and add 1 to count for that level
//   return Math.max(left, right) + 1; //node left if present will return 0 if it's a leaf node, bc its left -1 right -1 max of that is -1 + 1 = 0 which belongs to leaf node level
//   //if node right will return 0  as well then that means that current nodes two children returns max of 0 which of 0 so current level is 1 etc
//   //thus, current node would return 1 to it's parent to count itself

// }

/*


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





var isBalanced = function(root) {
  if (!root) return true
  
  var dfs = function(node) {
      if (!node) return 0;
      let left = 1 + dfs(node.left); //if there is no node.left, then current node is 1
      let right = 1 + dfs(node.right);
      if (Math.abs(left - right) > 1) return Infinity; //DOESN'T MATTER WHICH IS BIGGER TO SUBTRACT AS LONG AS THE DIFFERENCE IS < 1
      //THIS IS ANYWHERE ALONG THE RECURSION, IF >1 IN DIFFERENCE THEN BREAK OUT EARLY
      return Math.max(left, right);
  }
  
  return dfs(root)==Infinity?false:true;
};
*/

