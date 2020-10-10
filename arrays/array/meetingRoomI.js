/*
Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), determine if a person could attend all meetings.

Example 1:

Input: [[0,30],[5,10],[15,20]]
Output: false
Example 2:

Input: [[7,10],[2,4]]
Output: true
NOTE: input types have been changed on April 15, 2019. Please reset to default code definition to get new method signature.
 */

// var canAttendMeetings = function(intervals) {
//   if(intervals.length === 0 || intervals[0].length === 0 || !intervals) return true
//   intervals.sort((a,b) => a[0] - b[0])
//   let [prevStart, prevEnd] = intervals[0]
//   for(let i = 1; i<intervals.length; i++){
//       let [currStart, currEnd] = intervals[i] //obj destructuring for better naming/understanding
//       if(currStart < prevEnd) return false
//       [prevStart, prevEnd] = intervals[i] //MUST DO THIS FOR NEXT ITERATION
//   }
// return true  
// };

// OR 

var canAttendMeetings = function(intervals) {
  intervals.sort(function(a, b) {       //sort start times first
      return a[0] - b[0]
  })
  for (var i = 0; i < intervals.length - 1; i++) { //compare if current end time overlaps next start time
      if (intervals[i][1] > intervals[i + 1][0]) {
          return false;
      }
  }
  return true;
};

console.log(canAttendMeetings([[0,2],[5,10],[15,20]]))