/*Given a non-empty special binary tree consisting of nodes with the non-negative value, where each node in this tree has exactly two or zero sub-node. If the node has two sub-nodes, then this node's value is the smaller value among its two sub-nodes. More formally, the property root.val = min(root.left.val, root.right.val) always holds.

Given such a binary tree, you need to output the second minimum value in the set made of all the nodes' value in the whole tree.

If no such second minimum value exists, output -1 instead.

Example 1:

Input: 
    2
   / \
  2   5
     / \
    5   7

Output: 5
Explanation: The smallest value is 2, the second smallest value is 5.
 

Example 2:

Input: 
    2
   / \
  2   2

Output: -1
Explanation: The smallest value is 2, but there isn't any second smallest value. */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// var findSecondMinimumValue = function(root) {
//     //if null root return -1
//     //if left and right === return -1
//     //if one side is -1 then return the other
//     //else return smallest of two
//     //recurse somewhere...
//     if (!root) return -1
//     const left = findSecondMinimumValue(this.left)
//     const right = findSecondMinimumValue(this.right)
//     // if (left === right) return -1 NOOOO
//     if (left === right) {
//         if(left === root.val) {
//             return -1
//         }
//         else {
//             return root.val
//         }
//     }
//     if (left > -1 && right > -1) {
//         if (left > root.val && right > root.val) {
//             return Math.min(left, right)
//         }else if (left > root.val) {
//             return left
//         } else {
//             return right
//         }
//     }
//     if (left === -1 && right > root.val) return right
//     if (right === -1 && left > root.val) return left
    
// };

var findSecondMinimumValue = function(root) {
    let min = root.val //nothing will be smaller than root
    // let secMin = Infinity
    return traverse(root, min)
    
}

let traverse = function (node, min, secMin) {
    if (!node) return -1;
    if (node.val !== min) return node.val
    //else current node is same as parent so keep traversing
    const left = traverse(node.left, min)
    const right = traverse(node.right, min)
     
    //if both children are null or equal to curr val
    if (left === -1 && right === -1) return -1
    //if one return is -1 and one is another num
    if (left === -1 || right === -1) return Math.max(left, right)
    //both are diff nums returned
    return Math.min(left, right)
}



/*
def findSecondMinimumValue(self, root):
    self.ans = float('inf')
    min1 = root.val

    def dfs(node):
        if node:
            if min1 < node.val < self.ans:
                self.ans = node.val
            elif node.val == min1:
                dfs(node.left)
                dfs(node.right)

    dfs(root)
    return self.ans if self.ans < float('inf') else -1*/

/*
var findSecondMinimumValue = function(node, minVal = node.val) {
    if (!node) return -1;
    if (node.val !== minVal) return node.val;
    
    const leftVal = findSecondMinimumValue(node.left, minVal);
    const rightVal = findSecondMinimumValue(node.right, minVal);        
    
    if (leftVal === -1 && rightVal === -1) return -1;
    if (leftVal === -1 || rightVal === -1) return Math.max(leftVal, rightVal);

    return Math.min(leftVal, rightVal);
};*/