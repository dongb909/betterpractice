//given an UNDIRECTED graph, print it. ORDER WILL NOT MATTER.
//BFS use a visited array of 0s, change to 1 if visited and a queue https://www.youtube.com/watch?v=YYq38LTz774
//don't care about copying neighbors. literally just printing the values

const UNdirectedGraph = {
  A: ["B", "C"],
  B: ["D", "E", "A"],
  C: ["A", "E"],
  D: ["B", "E", "F"],
  E: ["C", "B", "D", "F"],
  F: ["D", "E"],
};
const DIRectedGraph = {
  A: ["B", "C"],
  B: ["D"],
  C: [],
  D: ["E", "F"],
  E: ["B", "F"],
  F: [],
};
//BFS!!!!
const printDirectedGraph = (adj, start) => {
  const output = [];
  const visited = new Set(start); //NOTE:::: start out with A already visited too! since already in q
  const q = [start];
  let curr;
  while (q.length) {
    curr = q.shift();
    //visited.add(curr)//NOOOOOTE:::: NOT HERE or else will get duplicates in output!
    output.push(curr);
    for (let neighbor of adj[curr]) {
      // console.log(neighbor)
      if (!visited.has(neighbor)) {
        q.push(neighbor);
        visited.add(neighbor);
      }
      // console.log(q)
    }
  }
  // if (visited.size === n) return output; only adding to q what we haven't visited yet so, no need for this. also, undirected so all are connected, don't have to check for that
  return output;
};
// console.log(printDirectedGraph(UNdirectedGraph, "A"));

//given a DIRECTED graph, print it out
//same, visited arr of 0s, and a q
const printUNDirectedGraph = (adj, start) => {
  const output = [];
  const visited = new Set(start);
  const q = [start];
  let curr;

  while (q.length) {
    curr = q.shift();
    output.push(curr);
    for (let neighbor of adj[curr]) {
      // console.log(neighbor)
      if (!visited.has(neighbor)) {
        q.push(neighbor);
        visited.add(neighbor);
      }
      // console.log(q)
    }
  }
  return output;
};

console.log(printUNDirectedGraph(DIRectedGraph, "A")); //doens't work if you start with F bc it doesn't point to anything else. need to start at the right node
//or use indegrees to decide where to start and go from there just like for course schdeuleI
