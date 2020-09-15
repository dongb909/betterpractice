/*Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:

Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
*/

//horrible 160ms first attempt
// var twoSum = function(nums, target) {
//   let index2; 
//   for (let i = 0; i<nums.length; i++) {
//     index2 = nums.indexOf(target - nums[i]) //slow because index of is also On
//     if((index2!== i) && (index2!== -1)) {

//       return [i, index2]
//     }
//   }
//   return []
// };

// console.log(twoSum([3,2,4],
//   6))
//////////////////////////////////////////////////////////////
/*const twoSum = (nums, target) => {
  const map = [];

  for (let i = 0; i < nums.length; i++) {
    const another = target - nums[i];

    if (another in map) {
      return [map[another], i];
    }

    map[nums[i]] = i;
  }

  return null;
}; */
//////////////////////////////////////////////////////////////
/*
const twoSum = (nums, target) => {
  const map = {};

  for (let i = 0; i < nums.length; i++) {
    const another = target - nums[i];

    if (another in map) {
      return [map[another], i];
    }

    map[nums[i]] = i;
  }

  return null;
}; */
//////////////////////////////////////////////////////////////

// var twoSum = function(nums, target) {
//     let dic = {};
//     for(let i in nums){
//       console.log(dic, 'dic')
//       console.log('i', i)
//       console.log('diff', target-nums[i])
//       if(target-nums[i] in dic) {
//           return [dic[target-nums[i]], i];
//       }
//         dic[nums[i]] = i;
//     }
//  }; 
//  //////////////////////////////////////////////////////////////





let twoSum = (nums, target) => {
  let map = {};
  //go through all indices and add to map if over, then compare to see if the diff in is map
  for(let i in nums) { //keys of arrays are indices so setting indices to i aka keys to i
    // if (target-nums[i] === map[nums[i]] ){
    if (target-nums[i] in map){
      return [map[target-nums[i]], i]
    }
    map[nums[i]] = i
  }
  return null;
}

console.log(twoSum([3,2,4],
  6))