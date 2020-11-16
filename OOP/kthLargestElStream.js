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

//USING FUNCTIONS
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
  if (this.minHeap.length === 0) return "heap not created yet";
  if (val > this.minHeap[0]) {
    this.minHeap.shift();
    this.minHeap.push(val);
    this.minHeap.sort((a, b) => a - b);
    //MUST ALSO REDEFINE THE largest ELEMENT BECAUSE THOSE WON'T BE DONE AUTOMATICALLY, IT'LL STAY WHAT IT WAS WHEN THE CLASS WAS FIRST CALLED
    this.kthLargestEl = this.minHeap[0];
  }
  return this.kthLargestEl;
};
// let test = new KthLargest(3, [4, 5, 8, 2])
// console.log(test.add(3))
/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

// let test = new KthLargest(3, [4, 5, 8, 2]);
// console.log(test);
/*RETURNS => KthLargest {
  k: 3,
  nums: [[4,5,8,2]], //this was [] for some reason, but when print it by itself, it was correct weird, not bothering with it.
  getMinHeap: [Function],
  minHeap: [ 4, 5, 8 ],
  kthLargestEl: 4
} */
// KthLargest kthLargest = new KthLargest(3, arr);
// console.log(test.add(3)); // returns 4
// console.log(test.add(5)); // returns 5
// console.log(test.add(10)); // returns 5
// console.log(test.add(9)); // returns 8
// console.log(test.add(4)); // returns 8

/* USSING OBJECT LITERALS
NO DON'T EVER RETURN OBJECTS LIKE THIS BECAUSE ADDING ON AND ALSO USING METHODS WILL BE HARD! CANNOT USE 'THIS' WITHIN THE OBJ TO REFER TO ITSELF
// var KthLargest2 = function (k, nums) {
//   //THEY'RE TREATING THIS LIKE A CLASS! NOTE THE CAPITAL K AND THE "NEW" KEYWORD
//   return {
//     k: k,
//     nums: nums,
//     getMinHeap: function () {
//       if (this.nums.length < this.k) return null;
//       const minHeap = [];
//       let i = this.k;
//       //making minheap default
//       while (this.k) {
//         minHeap.push(this.nums.pop());
//         this.k--;
//       }
//       // //heapify so not counting this as sorting in this case
//       minHeap.sort((a, b) => a - b);
//       while (this.nums.length > 0) {
//         let currNum = this.nums.pop();
//         if (currNum > minHeap[0]) {
//           minHeap.shift();
//           minHeap.push(currNum);
//           minHeap.sort((a, b) => a - b);
//         }
//       }
//       return minHeap;
//     }
//     ,
//     // minHeap: this.getMinHeap(this.k, this.nums),      CANNOTTTTTT USE THIS.FUNCTION!!! CAN ONLY USE THIS.VARIABLE WITHIN THE OBJ DEFINITION!!
//     // kthLargestEl: this.minHeap[0]
//     minHeap: [],
//     kthLargestEl: null
//   }
// };
let test = new KthLargest2(3, [4, 5, 8, 2]);
console.log(test);
// let bindGetMinHeap = test.getMinHeap.bind(test); //bc bind function return a new function 
// console.log(bindGetMinHeap(this.k, this.nums)) //can't use bind bc can't call 
//SOLN, TAKE OUT THE PARAMETER REQUIREMENTS FOR GETMINHEAP AND USE THIS.K, THIS.NUMS INSIDE THE FUNCTION INSTEAD
test.minHeap = test.getMinHeap()
test.kthLargestEl = test.minHeap[0]


console.log(test)
console.log(test.add(3)); // returns 4            //USING PROTOTYPES TO ADD METHODS WON'T WORK! YOU HAVE TO DEFINE THE FUNCTION SEPARATELY AND THEN USE THIS.BIND TO BIND THE TEST OBJ AFTER YOU'VE ALREADY CALLED ON GETMINHEAP
// console.log(test.add(5)); // returns 5
// console.log(test.add(10)); // returns 5
// console.log(test.add(9)); // returns 8
// console.log(test.add(4)); // returns 8

//CANNOT ADD METHOD TO CLASS BECAUSE SEE HERE https://stackoverflow.com/questions/19720600/cant-add-method-prototype-to-javascript-object

*/

//USING CLASSESSSSSSS
// class KthLargest3 (k, nums) { NO!!!! never add params here AT ALL
class KthLargest3 {
  constructor(k, nums) {
    this.k = k;
    this.nums = nums;
    this.minHeap = [];
    this.kthLargestEl = null;
  }
  // getMinHeap (this.k,this.nums) {//NO!!
  getMinHeap() {
    if (this.nums.length < this.k) return null;
    const minHeap = [];
    let i = this.k;
    //making minheap default
    while (this.k) {
      minHeap.push(this.nums.pop());
      this.k--;
    }
    // //heapify so not counting this as sorting in this case
    minHeap.sort((a, b) => a - b);
    while (this.nums.length > 0) {
      let currNum = this.nums.pop();
      if (currNum > minHeap[0]) {
        minHeap.shift();
        minHeap.push(currNum);
        minHeap.sort((a, b) => a - b);
      }
    }
    // console.log(minHeap);
    this.minHeap = minHeap;
    this.kthLargestEl = minHeap[0];
    return minHeap;
  }
}

KthLargest3.prototype.add = function (val) {
  if (this.minHeap.length === 0) return "heap not created yet";
  if (val > this.minHeap[0]) {
    this.minHeap.shift();
    this.minHeap.push(val);
    this.minHeap.sort((a, b) => a - b);
    //MUST ALSO REDEFINE THE largest ELEMENT BECAUSE THOSE WON'T BE DONE AUTOMATICALLY, IT'LL STAY WHAT IT WAS WHEN THE CLASS WAS FIRST CALLED
    this.kthLargestEl = this.minHeap[0];
  }
  return this.kthLargestEl;
};
let test = new KthLargest3(3, [4, 5, 8, 2]);
// console.log(test);
console.log(test.getMinHeap(), test); // ==> [ 4, 5, 8 ] KthLargest3 { k: 0, nums: [], minHeap: [ 4, 5, 8 ], kthLargestEl: 4 }

console.log(test.add(3)); // returns 4
console.log(test.add(5)); // returns 5
console.log(test.add(10)); // returns 5
console.log(test.add(9)); // returns 8
console.log(test.add(4)); // returns 8
