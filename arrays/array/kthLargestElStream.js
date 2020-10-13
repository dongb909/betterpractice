/*Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Your KthLargest class will have a constructor which accepts an integer k and an integer array nums, which contains initial elements from the stream. For each call to the method KthLargest.add, return the element representing the kth largest element in the stream.

Example:

int k = 3;
int[] arr = [4,5,8,2];
KthLargest kthLargest = new KthLargest(3, arr);
kthLargest.add(3);   // returns 4
kthLargest.add(5);   // returns 5
kthLargest.add(10);  // returns 5
kthLargest.add(9);   // returns 8
kthLargest.add(4);   // returns 8
Note:
You may assume that nums' length ≥ k-1 and k ≥ 1. */

const { kMaxLength } = require("buffer");

var KthLargest = function (k, nums) {
  //THEY'RE TREATING THIS LIKE A CLASS! NOTE THE CAPITAL K AND THE "NEW" KEYWORD
  this.k = k;
  this.nums = nums;
  this.getMinHeap = function (k1, nums1) {
    if (nums1.length < k1) return null;
    const minHeap = [];
    let i = k1;
    //making minheap default
    while (k1) {
      minHeap.push(nums1.pop());
      k1--;
    }
    // //heapify so not counting this as sorting in this case
    minHeap.sort((a, b) => a - b);
    while (nums1.length > 0) {
      let currNum = nums1.pop();
      if (currNum > minHeap[0]) {
        minHeap.shift();
        minHeap.push(currNum);
        minHeap.sort((a, b) => a - b);
      }
    }
    // console.log(minHeap);
    return minHeap;
  };
  this.minHeap = this.getMinHeap(this.k, this.nums);
  this.kthLargestEl = this.minHeap[0];
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  if (val > this.minHeap[0]) {
    this.minHeap.shift();
    this.minHeap.push(val);
    this.minHeap.sort((a, b) => a - b);
    //MUST ALSO REDEFINE THE largest ELEMENT BECAUSE THOSE WON'T BE DONE AUTOMATICALLY, IT'LL STAY WHAT IT WAS WHEN THE CLASS WAS FIRST CALLED
    this.kthLargestEl = this.minHeap[0];
  }
  return this.kthLargestEl;
};

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

let test = new KthLargest(3, [4, 5, 8, 2]);
console.log(test);
/*KthLargest {
  k: 3,
  nums: [[4,5,8,2]],
  getMinHeap: [Function],
  minHeap: [ 4, 5, 8 ],
  kthLargestEl: 4
} */
// KthLargest kthLargest = new KthLargest(3, arr);
console.log(test.add(3)); // returns 4
console.log(test.add(5)); // returns 5
console.log(test.add(10)); // returns 5
console.log(test.add(9)); // returns 8
console.log(test.add(4)); // returns 8
