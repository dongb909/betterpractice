/* We have a list of points on the plane.  Find the K closest points to the origin (0, 0).
(Here, the distance between two points on a plane is the Euclidean distance.)
You may return the answer in any order.  The answer is guaranteed to be unique (except for the order that it is in.)
Input: points = [[1,3],[-2,2]], K = 1    Output: [[-2,2]]
Explanation: 
The distance between (1, 3) and the origin is sqrt(10).
The distance between (-2, 2) and the origin is sqrt(8).
Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
We only want the closest K = 1 points from the origin, so the answer is just [[-2,2]].
Example 2:
Input: points = [[3,3],[5,-1],[-2,4]], K = 2
Output: [[3,3],[-2,4]]
(The answer [[-2,4],[3,3]] would also be accepted.)*/

var kClosest = function(points, K) {
  //go through points and store distance with points to origin but add into queue as you go
  let pq = new PriorityQueue((a,b) => b.distance - a.distance); //== [] with insert and extractMax functions//ABSTRACT OUT THE SORTING AND []
  points.forEach(([x,y], idx) => {  //pythag = d^2 = (x1-x2)^2 + (y1-y2)^2
      let distance = Math.sqrt(x*x + y*y)
      let point = {distance, point: points[idx]}
      if(pq.size() < K) pq.add(point)
      else if (distance < pq.peek().distance){
          pq.remove()
          pq.add(point)
      }
  })
  //go through k to get just the points to return
  let result = []
  while(pq.size() > 0) {
      result.push(pq.remove())
  }
  return result
};
//use max heap to know which of those are the bigger of the two to know if any incoming # falls WITHIN the window of my maxheap, more efficient bc not dumping all points in bc only need to know 2 bc only sorting 2 instead of 1000000\
//why priority queue vs max heap(just a value)
//bc need to store the points location as well as the distance
//it's the same really