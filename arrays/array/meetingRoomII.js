/* Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), find the minimum number of conference rooms required.
Input: [[0, 30],[5, 10],[15, 20]]
Output: 2
Input: [[7,10],[2,4]]
Output: 1
NOTE: input types have been changed on April 15, 2019. Please reset to default code definition to get new method signature.*/

// var minMeetingRooms = function(intervals) {
//   if(intervals.length === 0 || intervals[0].length === 0 || !intervals) return 0
//   intervals.sort((a,b) => a[0] - b[0])
//   let rooms = 1
//   for(let i = 0; i < intervals.length-1; i++){
//       if (intervals[i][1] > intervals[i+1][0]) rooms++
//       console.log(intervals[i][1], intervals[i+1][0])
//   }
//   return rooms
// };

// console.log(minMeetingRooms([[9,10],[4,9],[4,17]]))
// [4,9],[9,10][4,17],[12,13]
// if there's a meeting btwn 8 am and 10 am and i have a meeting at 2 
// another meeting 9-11

// startMinHeap: 12
// endMinHeap: 10,13, 17
// if start min < end min then increment extract start min
// if start min >= end min then leave as is and take out both mins

// roomCount = 2
// return room Count when start heap is 0,, don't care when other meetings end. bc no more meetings are needed to be schedule. 
// ///if you know in constant time whether meeting starts after an existing meeting then you are good without looking at the other meeting's endpoint
// //if start time doesn't overlap with earliest ending meeting then don't need to allocate a new room
// //what does it mean for a meeting to have ended

// n = # of minMeetingRooms log n
// space = 2n bc 2 heaps of size n

//other method with only 1 heap only maintains meeting that's happening and then evict rooms when incoming meeting is starting later than what's at top of heap
// and add new room in, comparing 1 item to see if it's overlatpping and then evitt one of them