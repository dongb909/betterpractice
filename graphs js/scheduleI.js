/*RETURN TRUE OR FALSE ON IF YOU CAN TAKE ALLL THE COURSES AT ALL
AKA Detecting Cycles in Undirected Graph
There are a total of numCourses courses you have to take, labeled from 0 to numCourses-1.

Some courses may have prerequisites, for example to take course 0 you have to first take course 1, which is expressed as a pair: [0,1] => THUS DIRECTED GRAPH. DETECT IF THERE's A CYCLE
Given the total number of courses and a list of prerequisite pairs, is it possible for you to finish all courses?

Example 1:
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. 
             To take course 1 you should have finished course 0. So it is possible.
Example 2:
Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take. 
             To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
Constraints:
The input prerequisites is a graph represented by a list of edges, not adjacency matrices. Read more about how a graph is represented.
You may assume that there are no duplicate edges in the input prerequisites.
1 <= numCourses <= 10^5
 */

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
//soln: https://leetcode.com/problems/course-schedule/discuss/526053/JavaScript-Topological-Sort
//This is using topological sorting instead of DFS
var canFinishTopo = function (numCourses, prerequisites) {
  //CREATE AN ADJ LIST
  const adj = {}; //either with map or nested arr
  const q = [];
  const order = [];
  const indegree = new Array(numCourses).fill(0);
  //Building adjList from nested prereq array
  prerequisites.forEach(([course, preCourse], idx) => {
    if (!adj[preCourse]) adj[preCourse] = [course];
    else adj[preCourse].push(course);
    //Adding indegree 0s to q for starting points
    indegree[course]++;
  });
  // console.log(adj, indegree)
  //Going through q
  indegree.forEach((val, idx) => {
    if (val === 0) q.push(idx);
  });
  // console.log(q)
  while (q.length) {
    //we're popping our starting point and iterating through courses that need them as prereqs, thus, what we're popping should be added only AFTER we've added what we're iterating through
    let pre = q.shift();
    if (adj[pre]) {
      //need this bc if what we're popping is NOT a prereq of anything, we just stop the iteration there and add to order. bc there's nothing to process. But if it POINTS to other nodes, then want to go through each of those nodes and TAKE AWAY THE INDEGREE bc since we're already processing this pre node, there's 1 less pointer / prereq we need to take. NOT adding it to q. ONLY ADD TO Q when indegree = 0 bc those classes don't have any prereq or any MORE prereqs we need to process first. https://www.youtube.com/watch?v=cIBFEhD77b4
      for (let postCourse of adj[pre]) {
        // console.log(adj[pre],postCourse, indegree, q)
        //we're proccesing it so one less arrow pointing to it
        indegree[postCourse]--;
        // console.log(indegree[postCourse])
        if (indegree[postCourse] === 0) q.push(postCourse);
      }
    }
    //add our pre course to the order arr
    order.push(pre);
    // console.log(order)
  }

  return numCourses === order.length;
};
//
// console.assert(canFinishTopo(2,[[1,0]]) === true, "Should equal true with 2 courses")
// console.assert(canFinishTopo(2,[[0,1]]) === true, "Should equal true with 2 courses")
// console.assert(canFinishTopo(3, [[1,0],[2,1]]) === true, "Should equal true with 3 courses")//0=>1=>2
//
// console.assert(canFinishTopo(2,[[1,0],[0,1]]) === false, "Should equal false with 2 courses cyclic")

//soln: https://leetcode.com/problems/course-schedule/discuss/146325/JavaScript-DFS
//this isn't the best soln tho, less efficient
var canFinishDFS = function (numCourses, prerequisites) {
  //0 = unvisited, 1 = processing, 2 = done with
  const status = new Array(numCourses).fill(0);
  // const adj = new Array(numCourses).map(() => new Array(1)); //can't just .map it. need to fill with null first then fill with new array
  const adj = new Array(numCourses).fill(null).map(() => new Array())
  //build adj list
  for (let [course, precourse] of prerequisites) {
    adj[precourse].push(course);
    // console.log(adj)
  }
  //iterate through courses based on its NUMBER in order // assuming courses are all ordered numbers starting from 0 aka the starting class
  for (let course = 0; course < numCourses; course++) {
    //really just iterating through adj list
    if (!dfs(course, status, adj)) return false;
  }
  return true;
};

function dfs(courseNum, status, adj) {
  //if reach another class and that class has already been processed, return true to stop recursion here
  if (status[courseNum] === 2) return true;
  //if reach another class but we're also currently processing that class, that means we have a loop
  if (status[courseNum] === 1) return false;
  //else status is 0 aka we haven't visited it at all then change it to processing
  status[courseNum] = 1;
  //iterate through it's neighbors
  for (let nextCourse of adj[courseNum]) {
    //can't use forEach bc it won't let you break early
    //and recurse on reach neighbor
    if (!dfs(nextCourse, status, adj)) return false;
  }
  //once completely processed all neighbors of that node, then mark it as completely processed
  status[courseNum] = 2;
  return true;
}

console.assert(
  canFinishDFS(2, [[1, 0]]) === true,
  "Should equal true with 2 courses"
);
console.assert(canFinishDFS(2,[[0,1]]) === true, "Should equal true with 2 courses")
console.assert(canFinishDFS(3, [[1,0],[2,1]]) === true, "Should equal true with 3 courses")//0=>1=>2

console.assert(canFinishDFS(2,[[1,0],[0,1]]) === false, "Should equal false with 2 courses cyclic")

/*Use color detection O(V+E)
given a list of edges for a DIRECTED graph, return true if there's a cycle. Can start at any node. ex: program dependencies or completing class series. 

METHOD 1:  Tarjan's strongly connected cycle https://www.youtube.com/watch?v=kXy0ABd1vwo
create vistedArray of 0s
we're going to use 0 to mean unvisted, 1 meaning already visited, 2 meaning it's what we're on now
start with index 0 aka node with val 0, return if node in visited array is 2 then there's a cycle bc you came back to a node your currently proccessing as well. Really choose node by starting with idex 0 if can

METHOD2:Khan's aka a topological sort algo
// using indegrees: number of edges pointing to each node
// keep track of count of all nodes that have an indegree of 0
// for each indegree of 0. add that node to q, get rid of next connection edge, decrement next connection's indegree. if 0, add to q
// only add the indegree 0 count when after you've popped from q
// when you reach a neighbor that still has an indegree of > 0, then stop.
// if count of 0 indegree !== input aka the pairs then that means there's a cycle
// 1. make adjacency list aka map
// 2. make arr of indegree of length n


https://www.youtube.com/watch?v=cIBFEhD77b4
https://www.youtube.com/watch?v=tggiFvaxjrY&list=PLjOkk6IoTYIFmFvW7k8r0MpyQEKVoCYL4&index=2
-Kahn's = repeatedly remove nodes that DONT have any dependencies from the graph and add them to the oder. As those nodes and their outgoing edges are removed, new nodes wihtout dependncies should become free. Do this until all nodes are processed or a cycle is discovered.without dependencies means that it has nothing pointing to it. AKA start from a ROOT down! and add starting at index 0! Need to keep a q. add all nodes with no dependencies to the q first. dequqe and add to order arr and then decreas the indegree of its neighbors. enqueue any nodes that are now indegree 0.  ORDER IS NOT UNIQUE. THERE IS NO WRONG ANSWER TO WHERE YOU START
WE DON'T CARE ABOUT WHAT INDEX WE ADD TO!!!!!!!!!! JUST WHETHER WE'RE STARTING FROM FRONT OR BACK OF ARR
1)CREATE indegree arr(of 0s) with size n. iterate through adj list aka each node and find its indegree by looping through edges , whatever edge POINTS to gets incremented 
2) loop through indegreeArr and add all with indegree 0 to q
3) initialize index = 0, and order, also arr of 0s, index keeps track of where you're at to add to next
4) remove nodes from graph as well as its edges, at end, if idx !== n, return null bc not all vals were processed bc there's a cycle
NEED INDEGREE TO DETERMIN WHICH NODES ARE THE STARTING POINTS OF A DIRECTED GRAPH 
*/
