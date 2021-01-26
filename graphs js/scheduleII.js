/* METHOD 4: DFS https://www.youtube.com/watch?v=HcRo3BFV8-M&list=PLjOkk6IoTYIFmFvW7k8r0MpyQEKVoCYL4&index=2 (CONNECTED VERSION)
NOTE HOW IN THE VIDEO, he does NOT visit 2 from 0 since 2 has already been processed. the order is the REVERSE of what you print out. move BASED ON IDEX of visited, ONLY mark that its visited AFTER processsed everything. if already visited then there's a cycly. need a DFS helper

NOTE: ONLY ADD TO VISITED AFTERRRR YOU BACKTRACK TO IT AND AFTERRRR YOU'VE ALREADY DEALT WITH THE CHILDREN
https://www.youtube.com/watch?v=sQnIdYxxmeE&list=PLjOkk6IoTYIFmFvW7k8r0MpyQEKVoCYL4&index=2 (TREE LIKE VERSION)
both versions are the same but this one is more complicated.


RETURN THE ORDER YOU'D HAVE TO TAKE TO TAKE ALL THE COURSES. AKA YOU KNOW IT'S POSSIBLE

you have to create your own adj list btw, where list[1] is the key bc is the prereq, list[0] is the value aka the class you can take now after taken pre*/

/*There are a total of n courses you have to take labelled from 0 to n - 1.

Some courses may have prerequisites, for example, if prerequisites[i] = [ai, bi] this means you must take the course bi before the course ai.

Given the total number of courses numCourses and a list of the prerequisite pairs, return the ordering of courses you should take to finish all courses. AKA DIRECTED GRAPH. PRINT ORDERING

If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.

 

Example 1:

Input: numCourses = 2, prerequisites = [[1,0]]
Output: [0,1]
Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].
Example 2:

Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0,2,1,3]
Explanation: There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.
So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].
Example 3:

Input: numCourses = 1, prerequisites = []
Output: [0]

Constraints:

1 <= numCourses <= 2000
0 <= prerequisites.length <= numCourses * (numCourses - 1)
prerequisites[i].length == 2
0 <= ai, bi < numCourses
ai != bi
All the pairs [ai, bi] are distinct. */

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
  //MUST create adjList first or else don't know who's who's neighbors
  const adj = new Array(numCourses).fill(null).map(()=> new Array())
  for(let [course, precourse] of prerequisites){
    //directed 
    adj[precourse].push(course)
  }
  const order = new Array(numCourses).fill(null) 
  const visited = new Array(numCourses).fill(false) 
  let currIdxToAdd = numCourses - 1
  for(let precourse = 0; precourse < adj.length; precourse++){
    if(!visited[precourse]){ //if haven't processed this course yet
      currIdxToAdd = dfs(currIdxToAdd, precourse, order, adj)
    }
  }
  return ordering
};
function dfs (currIdxToAdd, precourse)


console.log(findOrder(4, [[1,0],[2,0],[3,1],[3,2]]))





















 /*


METHOD 3) Topological ordering = an ordering where for each directed edge from node A to node B, node A appears before node B in the ordering. ordering are NOT unique
-Topological sort https://www.youtube.com/watch?v=eL-KzMXSXXI, are only considered topological if it's ACYCLIC. Thus, every tree has a topological ordering. Note that the order won't always print out the same depending where your entry point is
-best way to do this is by cherry picking off the leaf nodes first, in whatever order in the tree but make sure to add FROM end of arr aka add TO beginning as you go so that final node aka root node is idx 0
1)pick any unvisited node. graph is an adj list so can get length from there. set all to false
  create another arr for ordering, all filled as 0 ORRRR just an empty array, pretending its a STACK! last in, first out. aka arr that you add to back and pop from back
2) do DFS on only unvisited nodes
3)on the recursive cb, add the current node to the order arr in from the end first
4) only when popping do you add to the order

*/
function topsort(graph, n){ //graph is a list of edges
  let v = new Array(n).fill(false) //visited = v
  let ordering = new Array(n).fill(0) //aka result
  let i = n-1//adding to order frmo the end to front
  for (let currIdx = 0; currIdx<n; currIdx++){
    if (!v[currIdx]){
      i = dfs(currIdx, v, visitedNodes, graph) 
    }
  }
  return ordering
}
function def(i, currIdx, v, ordering, graph){
  v[currIdx] = true 
  let edges = graph.getEdgesOutFromNode(currIdx)
  for(let edge of edges){
    if (!v[edge.to]){
      i = dfs(i, edge.to, v, ordering, graph)
    }
  }
  ordering[i] = currIdx//?????
  return i -1 //new insertion position which is next idx down
}