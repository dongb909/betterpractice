//is valid graph. Check if is non cyclic and if is tree by MATH or seen.length NOT by way of how we did detect cycle in graph with arr of 0,1,2
//https://www.youtube.com/watch?v=q9N_pBNgrC4
//tree is undirected so it doesn't matter what node you start with, you'll be traversing all nodes regardless and we're just checking if the edges are connected correctly, not caring for order or even keeping track of values
/*
Given n nodes labeled from 0-n-1 and a list of undirected edges, write a function to check whether these edges make up a valid tree
ex1:
input: n=5, edges = [[0,1],[0,2],[0,3],[1,4]]
output: true

ex2:
input: n=5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]
output: false
Can assume that no duplicate edges will appear. so there's not [0,1] then [1,0]

edge cases: when edges >= vertices, if correct number of edges but one edge forms a cycle and thus leaves an unreachable node without an edge connecting it to the rest of the tree, if there's less edges than we need, if no tree at all
*/

const validTreeGraph = (n, edges) => {
  //if there's no tree at all
  if (!n || !edges.length) return false;
  //if more or equal edges than nodes //if less edges than we need// USE MATH AS BASE CASE
  if (edges.length >= n || edges.length < n - 1) return false;
  //create adj list
  const adj = new Array(n).fill(null).map(() => new Array());
  edges.forEach(([a, b]) => {
    adj[a].push(b);
    adj[b].push(a);
  });
  console.log(adj);
  const seen = new Set([0]); //already on 0 so add it to seen
  const q = [0]; //just start at 0, even if root is not zero, edges are undirected so you'll end up there regardless
  while (q.length) {
    let curr = q.shift();
    seen.add(curr);
    for (let nei of adj[curr]) {
      if (!seen.has(nei)) {
        //only process if haven't seen , if seen then don't do anything
        // seen.add(nei)
        q.push(nei);
      }
    }
  }
  console.log(seen.size, n);
  return seen.size === n;
};

console.assert(
  validTreeGraph(5, [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 4],
  ]) === true,
  "Should return true"
);
console.assert(
  validTreeGraph(5, [
    [0, 1],
    [1, 2],
    [2, 3],
    [1, 3],
    [1, 4],
  ]) === false,
  "Should return false bc there's a cycle"
);
