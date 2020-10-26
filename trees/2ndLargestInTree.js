/* 
Given a Binary Search Tree(BST), find the second largest element.


The second largest element is second last element in inorder traversal and second element in reverse inorder traversal. We traverse given Binary Search Tree in reverse inorder and keep track of counts of nodes visited. Once the count becomes 2, we print the node.


If we have a left subtree but not a right subtree, then the current node is the largest overall (the "rightmost") node. The second largest element must be the largest element in the left subtree. We use our findLargest() function above to find the largest in that left subtree!
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
    if (current.right && !current.right.left && !current.right.right) //BECAUSE THE PARENT NODE IS THE 2ND LARGEST
      return current.value;
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

//PRACTICE BST REVERSE ORDER RECURSIVELY
function findSecondLargest(root) {
  if (!root) return null;
  let count = 0;
  let num
  traverseAndGet2nd(root)
  // return traverseAndGet2nd(root); NO NOT RETURNING THE TRAVERSAL
  return num
}

function traverseAndGet2nd(node) {
  // if (!node) return null;  NO! CHECKING IF THERE'S LEFT OR RIGHT ALREADY SO WILL NEVER EVEN REACH NULL
  if (num) return
  if(node.right) traverseAndGet2nd(node.right)
  // if(++count === 2) return node.val //NOOO BECAUSE THIS RETURN WON'T GO ALL THE WAY TO THE TOP
  if(++count === 2) return num = node.val //THIS WILL ONLY RETURN TO THE STACK FRAME THAT CALLED IT. IT WON'T GO BACK TO THE TOP
  if(node.left) traverseAndGet2nd(node.left)
}
//QUESTION, HOW TO STOP A RECURSIVE CALL ABRUPTLY? SINCE SET NUM TO NODE VAL, JUST GO AHEAD AND HAVE THE BASE CASE BE IF GLOBAL NUM HAS A VALUE


// Our plan here is to first find the largest node then find the second largest node.
// largest has 2 conditions: 
//1) The current is largest (aka NO right subtree) BUT has a left subtree
//2)The current is the parent of largest, and largest has no children


/*

public static int findSecondLargestValueInBST(Node root)
    {
        int secondMax;
        Node pre = root;
        Node cur = root;
        while (cur.Right != null)
        {
            pre = cur;
            cur = cur.Right;
        }
        if (cur.Left != null)
        {
            cur = cur.Left;
            while (cur.Right != null)
                cur = cur.Right;
            secondMax = cur.Value;
        }
        else
        {
            if (cur == root && pre == root)
                //Only one node in BST
                secondMax = int.MinValue;
            else
                secondMax = pre.Value;
        }
        return secondMax;
    } */


    /*public static void main(String[] args) {    
        BinaryTreeNode result=isBinarySearchTree.secondLargest(rootNode);

            System.out.println(result.data);
        }

        private BinaryTreeNode secondLargest(BinaryTreeNode node) {

            BinaryTreeNode prevNode=null; //2nd largest Element
            BinaryTreeNode currNode=node;
            if(null == currNode)
                return prevNode;

            while(currNode.right != null){
                prevNode=currNode;
                currNode=currNode.right;
            }
            if(currNode.left != null){
                currNode=currNode.left;
                while(currNode.right != null){
                    currNode=currNode.right;
                }
                prevNode=currNode;
            }

            return prevNode;

        } */