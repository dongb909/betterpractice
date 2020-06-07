/* If we have a left subtree but not a right subtree, then the current node is the largest overall (the "rightmost") node. The second largest element must be the largest element in the left subtree. We use our findLargest() function above to find the largest in that left subtree!
If we have a right child, but that right child node doesn't have any children, then the right child must be the largest element and our current node must be the second largest element!
Else, we have a right subtree with more than one element, so the largest and second largest are somewhere in that subtree. So we step right.
  function findLargest(root) {
  let current = root;
  while (current) {
    if (!current.right) return current.value;
    current = current.right;
  }
}*/
function findSecondLargest(root) {
  if (!root || (!root.left && !root.right)) return;
  let current = root;
  while (current) {
    // Case: current is largest and has a left subtree
    // 2nd largest is the largest in that subtree
    if (current.left && !current.right) return findLargest(current.left); //the node you're on is the largest since there's no right node
    // Case: current is parent of largest, and largest has no children,
    // so current is 2nd largest
    if (current.right && !current.right.left && !current.right.right) return current.value;
    current = current.right;
  }
}
/* Complexity
We're doing one walk down our BST, which means O(h)O(h) time, where hh is the height of the tree (again, that's O(\lg{n})O(lgn) if the tree is balanced, O(n)O(n) otherwise). O(1)O(1) space.
What We Learned
Here we used a "simplify, solve, and adapt" strategy.
The question asks for a function to find the second largest element in a BST, so we started off by simplifying the problem: we thought about how to find the first largest element.
Once we had a strategy for that, we adapted that strategy to work for finding the second largest element.
Notice how simple finding the second largest node got when we divided it into two cases:
The largest node has a left subtree.
The largest node does not have a left subtree.
Whenever a problem is starting to feel complicated, try breaking it down into cases.*/