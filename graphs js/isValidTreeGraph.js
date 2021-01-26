//is valid graph. Check if is non cyclic and if is tree by MATH or seen.length NOT by way of how we did detect cycle in graph with arr of 0,1,2
//https://www.youtube.com/watch?v=q9N_pBNgrC4
//tree is undirected so it doesn't matter what node you start with, you'll be traversing all nodes regardless and we're just checking if the edges are connected correctly, not caring for order or even keeping track of values
/*
Given n nodes labeled from 0-n-1 and a list of undirected edges, write a function to check whether these edges make up a valid tree
ex1:
input: n=5, edges = [[0,1],[0,2],[0,3],[1,4]]
output: true

ex2:
input: n=5, edges = [[0,1],[1,2],[2,3],[1,3], [1,4]]
output: true
Can assume that no duplicate edges will appear. so there's not [0,1] then [1,0]

edge cases: when edges >= vertices, if correct number of edges but one edge forms a cycle and thus leaves an unreachable node without an edge connecting it to the rest of the tree, if there's less edges than we need, if no tree at all
*/

const validTreeGraph = () => {};
