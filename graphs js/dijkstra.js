/*https://www.youtube.com/watch?v=pSqmAO-m7Lk
*****SEE NOTES IN DOC******** or see colt steele's algo course
NOTE: can only use this algo IF edges are NON-NEGATIVEly weighted. This ensures that once a node has been visited, its optimal distance cannot be improved thus allowing for greedy manner by always selecting the next most promising node
Two ways to implement it 1) LAZY:find shortest path and stopping early vs EAGER using indexed priority q 

******* LAZY ********Best only for sparse graphs
0)create adj list from weighted graph if it's not a adj list already 
00) created visited arr, so we don't reprocess a node 
1)dist array [0, infinity, infinity ...] where distance to every node is inifinity except starting node = 0
2) PQ: (node index, distance)tells you which node to visit next based on minimum value
3)start pq with [s,0], s is usually 0 so (0,0) bc best distance of starting node to starting node is 0. priority is based upon shortest distance
4) dequere and iterate over all edges outward from current node and then append a NEW n(onde index, distance) processed edge to pq aka, add each node you visit to the pq
5) Do this until q is empty
6)This implementation allows for duplicate work on a node that already has the shortest distance measured. that's why it's called lazy. we just delete the longer route node when we get there in the que
7)creating a new node each time  is not space efficient but is time efficient O(logn) for inserting bc it would take a longer time searching for our node in the q and updating it O(n)than it would be for us to create a new one and add to q
8)a way around this is to jsut skip it once we dequeue if we already found a better distance
***^^ this helps you find the shortest DISTANCE
*** but what if you want to know what path you actually took? aka the vertices? you need an additional tracker to keep track of the previous node we took to get to the current node
9) prev = [null] where it holds the value of the node you took before you reached node at index i
9a) loop backgrouds to get the reverse order until to reach null because start will never have a previous node

*******
******
*****if know start AND ending node, then can stop early once reach end node. will only have to go through all nodes at worst case scenario, otherwise, dijkstra forces you to take the shortest path first to reach ending node. and that doesn't change even if more future nodes are visited
10) so just check if current node == end node and stop there
*****not good method for dense graphs be we end up with mant stale outdated key-value paris n the pq. so use Eager moethod in stead

EAGER is not commonly used tho bc much more complicated
INDEX PQ: https://www.youtube.com/watch?v=jND_WJ8r7FE&t=0s
EAGER *********Best for dense graphs
AVOIDS duplicate pairs because UPDATES but updates in O(logn) bc using an INDEXED PQ instead of a regular pq
-is like pq but also supports quick updates and deletions of pairs bc you can look up values on the fly by giving an INDEX to each key thus forming a BIDIRECTIONAL mapping. index btwn 0 and n-1
Why does this work? pqs act as heaps but are really simply arrays under the hood. Very often tho, the keys themselves are already integers from 0-1 so there's no need for the mapping. But just an fyi. Can use this to have additional pq methods such as decreaseKey(keyidx, value) and increaseKey => O(logn). Key index must be UNIQUE and you can assign it to whatever you want as long as the idx stays the same for that name/key. 
-then to get the value then map to that index in the value in the POSITION MAP
table: Name, Ki, Position map, Vals, inverse map lookup



O(Edges*log(Vertices))









*/















//more dijkstra problems
//1)https://leetcode.com/problems/path-with-maximum-probability/
//2)https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/
//3)https://leetcode.com/problems/path-with-minimum-effort/
// 4)https://leetcode.com/problems/the-maze-ii/
//5)https://leetcode.com/problems/the-maze-iii/