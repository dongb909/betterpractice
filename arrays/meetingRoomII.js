/*
Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), find the minimum number of conference rooms required.

Example 1:

Input: [[0, 30],[5, 10],[15, 20]]
Output: 2
Example 2:

Input: [[7,10],[2,4]]
Output: 1
NOTE: input types have been changed on April 15, 2019. Please reset to default code definition to get new method signature.
*/

var minMeetingRooms = function(intervals) {
  if(intervals.length === 0 || intervals[0].length === 0 || !intervals) return []
  console.log(intervals)
  intervals.sort((a,b) => a[0] - b[0])
  console.log(intervals)
  let rooms = 1
  for(let i = 0; i < intervals.length-1; i++){
      if (intervals[i][1] > intervals[i+1][0]) rooms++
      console.log(intervals[i][1], intervals[i+1][0])
  }
  return rooms
};

console.log(minMeetingRooms(
  
[[9,10],[4,9],[4,17]]
))