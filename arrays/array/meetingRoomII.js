/* Given an array of meeting time intervals consisting of start and end times [[s1,e1],[s2,e2],...] (si < ei), find the minimum number of conference rooms required.
Input: [[0, 30],[5, 10],[15, 20]]
Output: 2
Input: [[7,10],[2,4]]
Output: 1
NOTE: input types have been changed on April 15, 2019. Please reset to default code definition to get new method signature.*/

const { start } = require("repl");

//THIS WILL NOT WORK
// var minMeetingRooms = function(intervals) {
//   if(intervals.length === 0 || intervals[0].length === 0 || !intervals) return 0
//   intervals.sort((a,b) => a[0] - b[0])
//   let rooms = 1
//   for(let i = 0; i < intervals.length-1; i++){
//       if (intervals[i][1] > intervals[i+1][0]) rooms++
//       // console.log(intervals[i][1], intervals[i+1][0])
//   }
//   return rooms
// };

// console.log(minMeetingRooms([[9,10],[4,9],[4,17]])) //returns 3 but shouldn't be 3 rooms, just 2
//bc when sorted by start time[[4,9],[4,17],[9,10]]] //yes 9 < 17 BUT the meeting room it should be in is part of the 1st meeting room but our function can only compare it to what's immediately before it.

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

var minMeetingRooms = function (meetings) {
  if (!meetings.length || !meetings[0].length) return 0;
  let rooms = 0; //start with 0 so it's just easier to not add additional conditions
  //we're going to pretend we have access to the Heap class to work wtih, so we can't really verify
  let currStart, currEnd;
  let minHeapStart = new Heap((a, b) => {
    a[0] - b[0];
  });
  let minHeapEnd = new Heap((a, b) => {
    a[1] - b[1];
  });
  for (let meeting of meetings) {
    minHeapStart.add(meeting[0]);
    minHeapEnd.add(meeting[0]);
  }
  while (minHeapStart.size() > 0) {
    if (minHeapStart.peek() < minHeapStart.peek()) {
      rooms++;
      minHeapStart.pop();
    } else if (minHeapStart.peek() >= minHeapEnd.peek()) {
      minHeapEnd.pop();
      minHeapStart.pop();
    }
  }
  return rooms;
};

//[4,9],[4,17],[9,10],[9,15],[12,13], [14,15]
// startMinHeap: 4,4,9,9,12, 14
// endMinHeap: 9, 10,13, 15,15,17,

// start 4    end 9    4 < 9   rooms = 1             next start min
// start 4             4 < 9   rooms = 2             next start min
// start 9             9 = 9   no new room needed    next start min    //AND next end min
// NOOO// start 9             9 = 9 //NO NEED TO ADD ANOTHER ROOM HERE SO for the above, can't just change start, must also get next end too
// start 9   end 10    9 < 10  rooms = 3             next start min
// start 12            12 > 10 no new room bc prev meeting already ended at 10 so can start new meeting at 12    next end
// //NOOOsince both are sorted, now start time will always be > 10 if we don't increment, increment END only until one is > start
// //NOOO           end 13   12 < 13 rooms = 4           next start min
// //NOOO  start 14            14 > 13 no new room
// //     total new rooms = 4
// start 14  end 13    14 > 13  no new room   MUST INCREMENT BOTH
// end of start
// total room 3

//room 1: [4,9],[9,15]     room2: [4,17]   room 3: [9,10][12,13][14,15]      room 4:[]
