/* METHOD 4: DFS https://www.youtube.com/watch?v=HcRo3BFV8-M&list=PLjOkk6IoTYIFmFvW7k8r0MpyQEKVoCYL4&index=2 (CONNECTED VERSION)
NOTE HOW IN THE VIDEO, he does NOT visit 2 from 0 since 2 has already been processed. the order is the REVERSE of what you print out. move BASED ON IDEX of visited, ONLY mark that its visited AFTER processsed everything. if already visited then there's a cycly. need a DFS helper

NOTE: ONLY ADD TO VISITED AFTERRRR YOU BACKTRACK TO IT AND AFTERRRR YOU'VE ALREADY DEALT WITH THE CHILDREN
https://www.youtube.com/watch?v=sQnIdYxxmeE&list=PLjOkk6IoTYIFmFvW7k8r0MpyQEKVoCYL4&index=2 (TREE LIKE VERSION)
both versions are the same but this one is more complicated.


RETURN THE ORDER YOU'D HAVE TO TAKE TO TAKE ALL THE COURSES. AKA YOU KNOW IT'S POSSIBLE

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

//  TOPOLOGICAL
var findOrder = function (numCourses, prerequisites) {
  if (prerequisites.length === 0 || !numCourses) return [];
  const adj = new Array(numCourses).fill(null).map(() => new Array());
  const indegree = new Array(numCourses).fill(0); //ALWAYS if looking for topological sort
  const q = []; //ALWAYS if looking for topological sort
  const order = []; //ALWAYS if looking for topological sort
  //MUST create adjList and indegree first or else don't know who's who's neighbors
  // const visited NO DON'T NEED THIS BC Q WILL ONLY HAVE NODES THAT ARE NOW INDEGREE 0 SO WE'LL NEVER REVISIT ANYTHING. Also, won't add in any loops
  prerequisites.forEach(([post, pre]) => {
    adj[pre].push(post);
    indegree[post]++;
  });
  for (let i in indegree) {
    if (indegree[i] === 0) q.push(Number(i));
  }
  while (q.length) {
    let curr = q.shift();
    order.push(curr);
    for (let nei of adj[curr]) {
      if (--indegree[nei] === 0) q.push(nei);
    }
  }
  return order;
};

// console.log(
//   findOrder(4, [
//     [1, 0],
//     [2, 0],
//     [3, 1],
//     [3, 2],
//   ])
// );
// console.log(findOrder(2, [[1, 0]]));
// console.log(findOrder(1, []));
// console.log(
//   findOrder(4, [
//     [1, 0],
//     [2, 0],
//     [1, 2],
//     [3, 2],
//     [0, 3],
//   ]),
//   "cyclic"
// );

var findOrderDFS = function (numCourses, prerequisites) {
  const adj = new Array(numCourses).fill(null).map(() => new Array());
  prerequisites.forEach(([post, pre]) => {
    adj[pre].push(post);
  });
  const status = new Array(numCourses).fill(0); //1=processing 2 = done // if not numbered nodes that starts with 0 then should use 2 sets instead
  const order = [];
  //iterate through adj list and perform dfs on any node we haven't processed yet
  for (let course = 0; course < numCourses; course++) {
    // if(status[course]===0) dfs(adj, status, order, course) NO! check the status WITHIN the recursive function so it also checks with each call
    dfs(adj, status, order, course);
  }
  return order.reverse();
};
//not returnnig anything bc only care baout the order
function dfs(adj, status, order, course) {
  //if reach another class and that class has already been processed, return to stop recursion here
  //if reach another class but we're also currently processing that class, that means we have a loop
  if (status[course] === 2 || status[course] === 1) return;
  for (let nextCourse of adj[course]) {
    //and recurse on reach neighbor
    dfs(adj, status, order, nextCourse);
  }
  order.push(course);
  status[course] = 2;
}

console.log(
  findOrderDFS(4, [
    [1, 0],
    [2, 0],
    [3, 1],
    [3, 2],
  ])
);
console.log(findOrder(2, [[1, 0]]));
console.log(findOrder(1, []));
console.log(
  findOrder(4, [
    [1, 0],
    [2, 0],
    [1, 2],
    [3, 2],
    [0, 3],
  ]),
  "cyclic"
);
