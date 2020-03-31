/*Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

(i.e.,  [0,1,2,4,5,6,7] might become  [4,5,6,7,0,1,2]).

Find the minimum element.

You may assume no duplicate exists in the array.

Example 1:

Input: [3,4,5,1,2] 
Output: 1
Example 2:

Input: [4,5,6,7,0,1,2]
Output: 0 */


//brute force
// var findMin = function(nums) {
//   let min = Number.POSITIVE_INFINITY;
//   for(let i=0; i<nums.length; i++) {
//     if (nums[i]<min){
//       min=nums[i]
//     }
//   }
//   return min

// };
// var findMin = function(nums) {
//   //reguarding INDEXES not vals
//   var left = 0;
//   var right = nums.length - 1;

//   while (left < right) {
//     var mid = left + Math.floor((right - left)/2);
//     console.log(left, mid, right)
    
//     if (nums[mid] > nums[right]) {
//         left = mid + 1;
//     } else {
//       right = mid;
//     }
//   }
//   return nums[left];
// };





// var findMin = function(nums) {
  //we know if it's not pivoted then smallest will always be the first el since it's sorted guaranteed

  //we know if it's pivoted then no matter what the left el will be > than right el since all that in the front is moved to the back
  //so attack from both ends and keep track of the smallest number
// }

var findMin = function(nums) {
  //l = left, r=right, m=midpoint all INDECES not values
  let l = 0
  let r=nums.length-1
  if (nums[r] > nums[0]) {
    return nums[0]
  }

  while (l < r) { //l will always be less than r index untill r=l, r will never > l
    let m = Math.floor(r-l/2) - 1 //for indexing
    //want to divide our search by half so instead of comparing with l and right
    //compare with midpoint
    //and since the arr is mostly sorted, l will most likely be > right value if pivoted. 
    if (nums[m] > nums[r]) {
      l = m+1 //because we already established that m is not the smallest number so can rule it out
    } else { //if mid is < right or equal to right and it's sorted, then all nums to the right of mid is just going up so want to check to left of mid
      r = m //num[m] is smallest so far so keep it in next search
    }//this will go on until m=l
  }
  return nums[l]

}

console.log(findMin([4,5,6,7,0,1,2]))