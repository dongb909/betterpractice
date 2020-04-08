/**Write a function that returns true if the given Binary Tree of size N is SumTree else return false. A SumTree is a Binary Tree in which value of each node x is equal to sum of nodes present in its left subtree and right subtree . An empty tree is SumTree and sum of an empty tree can be considered as 0. A leaf node is also considered as SumTree.

Following is an example of SumTree.

          26
        /    \
      10      3
    /   \   /   \ 
   4     6  1    2
 

Input:
The first line of input contains the number of test cases T. For each test case, there will be only a single line of input which is a string representing the tree as described below: 

The values in the string are in the order of level order traversal of the tree where, numbers denote node values, and a character “N” denotes NULL child.

For example:

For the above tree, the string will be: 1 2 3 N N 4 6 N 5 N N 7 N

Output:
Print "1" if the given tree is SumTree else print "0". */