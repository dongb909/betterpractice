/*
Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Example 1:

Input: [3,2,1,5,6,4] and k = 2
Output: 5
Example 2:

Input: [3,2,3,1,2,4,5,5,6] and k = 4
Output: 4
Note: 
You may assume k is always valid, 1 ≤ k ≤ array's length.
*/


//distinct: repeats matter so it's the NUMBER NOT INDEX
//not distinct: repeats don't matter, it's the POSITION INDEX, NOT THE NUMBER
//I: arr, int, null? empty arr? no number
//O: kth largest int
//E:
//can use .sort or not? just say here's what I'm thinking, there's 2 ways, implement sort if i'm permitted or 2nd is using a heap

//Can I assume I have access to a heap class?

var findKthLargest = function(nums, k) {
    let minHeap = new Heap();
    nums.forEach(el => {
        if (minHeap.size < k) { 
            minHeap.push(el)
        } else if (minHeap.size === k && minHeap.min() < el){
            minHeap.pop()
            minHeap.push(el)
        }
    });
    return minHeap.min();
    
};


// [1,2,3,4,5,6] => 5
// [1,2,2,3,3,4,5,5,6] => 4
    
//     5
//     /
//     6


// n(arr)logk(heapification) with heap space O(k)
    //faster 
//nlogn with sort but space is O(1)
//if constrained by space then don't have more space then go back to .sort
//trading time for space or space for time. 







/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
var topKFrequent = function(words, k) {
    let counter = words.reduce((acc, el) => {
        if (el in acc) {
            acc[el]++
            return acc;
        } else {
            acc[el] = 1;
            return acc
        }
    }, {})
    let minHeap = new Heap();
    for (let [word, freq] in counter) {
        if(minHeap.size < k) {
            minHeap.push([freq, word]);
        } else if (minHeap === k &&  minHeap.min() < freq) {
            minHeap.pop();
            minHeap.push([freq, word]);
        } else if ( minHeap === k &&  minHeap.min()[1] > word) {
            minHeap.pop();
            minHeap.push([freq, word]);
        }           
    }

    let result = [];
    //MIN HEAP IS NOT ENUMBERABLE THINK OF THE APIS even if the ds is really an arr
    //min, pop, push, size
    while (minHeap.size > 0) {
        //result.push(minHeap.pop()[1]); // PUSHING ARRAY ONLY WANT WORD
        
        result.unshift(minHeap.pop()[1]);
        //sort 
    }
    return result;

};
 
[love, is, the, hey]
{love: 5, the: 3, a:3, hey:3 } k = 3 min heap

             [3, a] = HEAP DOESN'T ORDER BC IT DOESN'T KNOW THE WORD
            /
    3       [3, is] = minHeap
            /
    /       [5, love]
    5


the
//first value in a tuple is what a heap sorts by
//heap just knows to do [0]

//return all in heap from lowest to highest