
// AAAAAMMMMAAAAZZZOONNNN
 //stream of qs, identify top 10 questions asked


// q1,10
// q2,50
// q3,4
// ...
// q1000, 100
// q3, 50


// return top3 questions {q1000, q2, q1}

// [{Ques: "", count:#},{}, {}]

//min heap k = 10
//assuming have access to heap, pop, min, push
//yes assume stream length > k
// function findTopQs (stream, k) {
//     //go through entire stream make heap
//     let minHeap = new Heap();
//     for (let i = 0, i < stream.length; i++) {
//         if (minHeap.size < k) {
//             minHeap.push(stream[i]);
//         } else if (minHeap.min[count] < stream[i][count]) {
//             minHeap.pop();
//             minHeap.push(stream[i]);
//         } 
//     }
//     //heap complete, print out top k q
//     let result = [];
//     while (minHeap.size > 0) {
//         result.push(minHeap.pop()[Ques]);
//     }
//     return result;
// }

// #%26 = bucket, load factor = # of items in the table/capacity of the table aka th % of how full the hashtable is to determine when to resize
//OBJECTS ARE ACTUALLY HASHTABLES UNDER THE HOOD
//JS DOESN'T HAVE A HASHTABLE SO THE CLOSEST THING YOU HAVE IS AN OBJ AKA ASSOCIATIVE ARRAY (key value pairs).

// time: O(n logk) space: heap k , result, k
/*generators: a way to similate, a lazy loaded obj that lets you ask the generator to give you the next number so you don't have to get all 100 questions at a time
  create a class to hide the heap from the leader board then ask what's the top. initialize the leaderboard with a constructor with the top capacity. This way it allows you to 
  keep adding things to it. Each time it pulls something off the stream and it calls the method add a message that asks the leader board to return the current score. 
  Seperate the stream processing from the leaderboard. Decoupling to do it separately. This way you can do multiple things at once. Cant really test since a stream is endless.
  can use generators to mimic a stream. 
vs eager evaluation*/

//heap 
class TopQs {
  constructor(){

  }
}