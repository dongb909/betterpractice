/*Given an array of integers, find if the array contains any duplicates.

Your function should return true if any value appears at least twice in the array, and it should return false if every element is distinct.

Example 1:

Input: [1,2,3,1]
Output: true
Example 2:

Input: [1,2,3,4]
Output: false
Example 3:

Input: [1,1,1,3,3,4,3,2,4,2]
Output: true */

// var containsDuplicate = function(nums) {
//   let dict = {};
//   for (let i = 0; i<nums.length; i++) {
//     // console.log(dict[nums[i]])
//     // if (dict[nums[i]]) { THIS IS NOT A THING!!!!!, can set but cannot see if true
//     if (nums[i] in dict){
//       // console.log(nums[i])
//       return true;
//     } 
//     dict[nums[i]] = i;
//   }  
//   return false;
// };

var containsDuplicate = function(nums) {
  if(nums.length ===0){
    return false
  }
  let unique = new Set(nums)//takes in an array ALWAYS, even if just 1 number
  // ********************
  // ********************
  // console.log([...unique]) ********************
  //********************
  //********************
  // console.log(nums.length)
  // return unique.length !== nums.length   NO because a set is an obj LIKE arr NOT an obj obj but not an arr arr, not an arr
  return unique.size !== nums.length
}




console.log(containsDuplicate([0]))

/*************************************************************
var containsDuplicate = function(nums) {
    return [...new Set(nums)].length !== nums.length;   CAN SPREAD SETS bc its {1,2,3,4} not key value pair but not an array either
}; *************************************************************/