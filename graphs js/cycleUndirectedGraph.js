/*Approach: Run a DFS from every unvisited node. Depth First Traversal can be used to detect a cycle in a Graph. DFS for a connected graph produces a tree. There is a cycle in a graph only if there is a back edge present in the graph. A back edge is an edge that is joining a node to itself (self-loop) or one of its ancestor in the tree produced by DFS. 
To find the back edge to any of its ancestor keep a visited array and if there is a back edge to any visited node then there is a loop and return true.
Algorithm: 

Create the graph using the given number of edges and vertices.
Create a recursive function that that current index or vertex, visited and recursion stack.
Mark the current node as visited and also mark the index in recursion stack.
Find all the vertices which are not visited and are adjacent to the current node. Recursively call the function for those vertices, If the recursive function returns true return true.
If the adjacent vertices are already marked in the recursion stack then return true.
Create a wrapper class, that calls the recursive function for all the vertices and if any function returns true, return true.
Else if for all vertices the function returns false return false. 

Ex: 1
input: vertices 4, edges = 4, 0 1, 1 2, 2 3, 0 2 
return True

Ex: 2
input: vertices 4, edgs 3, 0 1, 1 2, 2 3 
all vertices start with 0
*/

const { Console } = require("console");

// https://www.youtube.com/watch?v=L0DcePeWHnM&list=PLjOkk6IoTYIFmFvW7k8r0MpyQEKVoCYL4&index=13
//Use graph coloring. 0 = unvisited, 1 = processing, 2 = done processing, or white, grey, black
//kinda weird bc undirected, so when you process next node, it can just lead back to current node
//make adjlist from input. Then create a status array initialized to 0. Pick a node an perform dfs. Not topological bc  is an UNDIRECTED graph
//This is considered more like graph coloring
//if 0 then change to 1, if 1 then change to 2, if already 2 then that means this is our 2nd time visiting the node. thus there's a cycle
//if there's no next node then backtrack and change number back to what parent was
//aka if there's no cycle, then there's no reason for you to have visited a node twice. the 0,1,2 are just the number of times a node has been visited


const cycleIsPresent = (v, edges) => {
  //v = vertices
  // const adj = {} //better to do nested arrs bc you can set a well definied arr length and also easier to nest the arr instead of having to check for the presence of a key already
  const adj = new Array(v).fill(null).map(() => new Array());
  edges.forEach(([a, b], idx) => {
    adj[a].push(b);
    adj[b].push(a);
  });
  const status = new Array(v).fill(0);
  // console.log(adj, status)
  //recuse
  return dfs(adj, status, 0);
};

function dfs(adj, status, currV) {
  if (status[currV] === 2) return true; //bc we're detecting if there's a graph or not
  // console.log(status[currV])
  if(status[currV]=== 1) { //YOU WERE MISSING THIS THE ENTIRE TIME!!!! IF SEE 1, THEN DON'T WANT TO CONTINUE PROCESSING IT!!!!!!!!!!! OR ELSE YOU'LL ALWAYS END UP WITH 2
    status[currV]+=1
    return
  }
  // console.log(status)
  for(let i = 0; i < adj[currV].length; i++){
    status[currV]+=1; //inc visit count for current vertex
    if(dfs(adj, status, adj[currV][i])) return true
    status[currV]-=1;
  }
  //we already processed all neighbors for this vertex in this round so we're going to backtrack and unvisit it 
  return false
}
// 
console.assert(
  cycleIsPresent(4, [
    [0, 1],
    [1, 2],
    [2, 3],
    [0, 2],
  ]) === true,
  "Cycle was supposed to be detected"
);
console.assert(
  cycleIsPresent(4, [
    [0, 1],
    [1, 2],
    [2, 3],
  ]) === false,
  "There is no cycle though"
);
