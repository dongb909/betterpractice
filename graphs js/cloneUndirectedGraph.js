/*
METHOD 1) 
BFS    https://www.youtube.com/watch?v=vma9tCQUXk8&list=PLjOkk6IoTYIFmFvW7k8r0MpyQEKVoCYL4&index=2
given adjacenty list of just values NOT NODES! you're going to turn those values into nodes and thereby vetices and edges!  you want to MAP the VALUE of that node to a NEW node bc we're COPYING OVER, NOT the original node, you have reference to the orginal node by the given adjacency list. MAP will help keep reference to the new graph.
Key will be the value only, for current value, create a new node for it and iterate through neighbors. add to queue if haven't seen neighbor. If neighbor value is already in map then connect current node to the value at that neighbor key value. If neighbor key is not in map yet then create new node for that key and connect current node to this new neighbor node. DON'T connect new neighbor node to the current key, just keep going, you'll be able to set it when you iterate on that term. Thus, focus on just 1 node at a time and connecting it to its neighbors. When reach a main value in the queue that's already in the map, just connect its neighbors to finish things up  
Node = val and array or node filled neighbors
if no graph then return null
METHOD 2) if node values are numbered start from 0 or 1 and consecutive then can use an array instead of a map. https://www.youtube.com/watch?v=f2EfGComRKM&list=PLjOkk6IoTYIFmFvW7k8r0MpyQEKVoCYL4&index=4
time = |vectors|+|edges|
space = |vectors|

METHOD 3)
add on recurse on each neighbor and return the curr new node: https://www.youtube.com/watch?v=e5tNvT1iUXs&list=PLjOkk6IoTYIFmFvW7k8r0MpyQEKVoCYL4&index=3
space and time = o(n)

*/

/*Given a reference of a node in a connected undirected graph.

Return a deep copy (clone) of the graph.

Each node in the graph contains a val (int) and a list (List[Node]) of its neighbors.

class Node {
    public int val;
    public List<Node> neighbors;
}
 

Test case format:

For simplicity sake, each node's value is the same as the node's index (1-indexed). For example, the first node with val = 1, the second node with val = 2, and so on. The graph is represented in the test case using an adjacency list.

Adjacency list is a collection of unordered lists used to represent a finite graph. Each list describes the set of neighbors of a node in the graph.

The given node will always be the first node with val = 1. You must return the copy of the given node as a reference to the cloned graph.

 

Example 1:


Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]
Explanation: There are 4 nodes in the graph.
1st node (val = 1)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
2nd node (val = 2)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
3rd node (val = 3)'s neighbors are 2nd node (val = 2) and 4th node (val = 4).
4th node (val = 4)'s neighbors are 1st node (val = 1) and 3rd node (val = 3).
Example 2:


Input: adjList = [[]]
Output: [[]]
Explanation: Note that the input contains one empty list. The graph consists of only one node with val = 1 and it does not have any neighbors.
Example 3:

Input: adjList = []
Output: []
Explanation: This an empty graph, it does not have any nodes.
Example 4:


Input: adjList = [[2],[1]]
Output: [[2],[1]]
 

Constraints:

1 <= Node.val <= 100
Node.val is unique for each node.
Number of Nodes will not exceed 100.
There is no repeated edges and no self-loops in the graph.
The Graph is connected and all nodes can be visited starting from the given node. */

/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {
    
};