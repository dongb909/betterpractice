/*Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

Example:

Input: [-2,1,-3,4,-1,2,1,-5,4],
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
Follow up:

If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

Accepted */

// var maxSubArray = function(nums) {
//     let max = Number.NEGATIVE_INFINITY +1;
//     let nextMax = Number.NEGATIVE_INFINITY;
//     for (let i = 0; i < nums.length; i++){
//       if (nums[i]>max && nums[i]> nextMax) {
//         max = nums[i];
//       } else if (max>nums[i]>nextMax){
//         nextMax = nums[i]
//       }
//     }


// };

//CONTIGUOUS ARRAY
// var maxSubArray = (nums) => {

//  let max=nums[0]
//  let currSum=nums[0]

//  for(let i = 1; i < nums.length; i++) {
//    currSum +=nums[i]
//   // if (max>currSum && max > nums[i]){
//   //   //do nothing
//   // }
//   if(currSum > max) {
//     end=i;
//     max=currSum;
//   }

//   if ( nums[i] > currSum) {

//     currSum = nums[i] 
//     if (nums[i]>max){

//       max=nums[i]
//     }
//   }

//  }
// //  let maxArr = nums.slice(start, end+1)
//  return max
// }

// const maxSubArray = (nums) => {
  //   let sum=0;
  //   let ans=Number.NEGATIVE_INFINITY;
  //   for (let i=0; i<nums.length; i++) {
    //     sum += nums[i];
    //     if (nums[i] > sum) sum = nums[i];
    //     ans = Math.max(sum, ans);
    //   }
    //   return ans;
    // };
    
    let maxSubArray = (arr) => {
      let currSum =0;
      let max = Number.NEGATIVE_INFINITY;
      for (let i=0; i<arr.length; i++) {
        currSum += arr[i];
        if (arr[i]>currSum) {
          currSum = arr[i]
        }
        if (currSum > max) {
          max = currSum
        }
      }
      return max
    }
    console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))