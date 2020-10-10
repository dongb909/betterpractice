/*Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.

Note:

The solution set must not contain duplicate triplets.

Example:

Given array nums = [-1, 0, 1, 2, -1, -4],

A solution set is:
[
  [-1, 0, 1],
  [-1, -1, 2]
] */
/////////////////////////trial 1
// var threeSum = function(nums) {
//   let triplets = [];
//   let unique = {};
//   let target;
//   let pair;
//   if (nums.length <3){
//     return []
//   }
//   if (nums.length ===3) {
//     if (nums[0] + nums[1] + nums[2] === 0){
//       return [nums];
//     } else {
//       return [];
//     }
//   }
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] in unique) {
//       continue;
//     }
//     target = -nums[i];
//     pair = twoSums(nums, i, target);
//     if (pair) {
//       pair.push(nums[i])
//       triplets.push(pair)
//     }
//     unique[nums[i]] = i
//   }
//   return triplets
// };

// let twoSums = (arr, i, target) => {
//   let storage = {};
//   //don't have to worry abotu duplicates bc one will be in obj and one will be the current num, there wouldn't be a third bc the third would be target
//   //obj for easier retrieval
//   for (let j=0; j<arr.length; j++){
//     console.log(storage)

//     if (j!==i) {
//       if (target - arr[j] in storage) {
//         return [arr[j], target-arr[j]]
//       }
//       storage[arr[j]]=j
//       j++
//     }

//   }
//   return null;
// }

// console.log(threeSum([0,0,0]))

/////////////////////////trial2

let threeSum = (arr) => {
  let triplets = [];
  //if arr less than triplet then return
  if (arr.length < 3) return triplets;
  let sorted = arr.sort((a, b) => {
    return a - b;
  });
  for (let i = 0; i < arr.length - 2; i++) {
    //-2 because k is at the other end
    //if first sorted number (i) is positive then adding the rest will just increase the number, never going to 0, so don't even have to check the rest
    //0 is ok because can be 0 0 0
    if (sorted[i] > 0) return triplets;
    //no point in having any of the numbers equal the first number or else it'll never equal 0 and can have duplicates
    if (i > 0 && sorted[i] === sorted[i - 1]) continue;
    //check from both ends since would be neg and pos number
    for (let j = i + 1, k = arr.length - 1; j < k; ) {
      //comma NOT semicolon
      //this is the only time you push, all else , you just increment or decrement
      if (sorted[i] + sorted[j] + sorted[k] === 0) {
        triplets.push([sorted[i], sorted[j], sorted[k]]);
        // then increment after done
        j++;
        k--;
        //???does it jump to other ifs tooo?
        //after increment, make sure it's not another duplicate for j and k separately, do another increment if is before looping back to the if statement
        //also do a while loop in case there's more than 1 duplicate instead of an if statement which will only account for 1 duplicate
        while (j < k && sorted[j] === sorted[j - 1]) {
          j++;
        }
        while (j < k && sorted[k] === sorted[k + 1]) {
          k--;
        }
        //now if the 3 items aren't equal zero then just increment taking into acount if j and k are the same as the previous as well but only do so if not equal 0
        // and must account for if sum is > or < 0
      } else if (sorted[i] + sorted[j] + sorted[k] > 0) {
        //that means that the sum is too big so move k to the left
        k--;
      } else {
        //numer is too small so move j to the right to make it bigger
        j++;
      }
    }
  }
  return triplets;
};

// console.log(threeSum([-1, 0, 1, 2, -1, -4]))

//Input = array , there are negative numbers,
//ask are there floats
//do I have to handle empty arrays or assume there's at least 3 nums
//are they ordered or not ordered
//you see duplicates but should ask to make sure if there are duplicates
//output = nested array
//constraints = no duplicate triplets,
//as for space and time complexity if don't know then ask if can begin with brute force and optimize from there
//

// -4, -1, -1, 0, 0, 1, 2
//   ^               ^ => 1
//.        ^
//
//-4 + 2 = -2
//-2 - -1 = -1
//
//-1 + 2 = 1        // used this to move
//-1 + 1 = 0
//push results [-1,-1, 2] , [-1,0,1]

//-1+1 = 0
// return
//terminal condition if 2sum =0

function threeSum2(arr) {
  let result = [];
  if (arr.length < 3) return result;
  arr.sort((a, b) => {
    return a - b;
  }); //nlogn
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    //n  worst case will not break early
    if ((arr[left] < 0 && arr[right] < 0) || arr[left] > 0) return result; //if both are neg or if left is already positive
    if (left > 0 && arr[left] === arr[left - 1]) {
      //THIS IS HOW YOU GET PREVIOUS, also need to make sure left is >0 for this check to work or else there wouldn't be a previous to compare to. don't need to compare the first one aka index 0 because that will be our first combo regardless and that's the starting point of comparison
      //left > 0 INDEX not VALUE here, dont' get confused
      left++; //increase left so there's no duplicate, don't change both left and right  bc may miss another combo
      continue; //inc left and dec right meet in middle but 1/2n is till n
      //continue to break out of the ENTIRE loop to go again using the new left value, this is for when there's like 1 1 1 1 1 for the left value
    }
    let twoSum = arr[right] + arr[left]; //don't want to do the summing until down here to make sure all the conditions pass and we have the 'right' starting poitn for the left ptr to go off of
    for (let thirdPtr = left + 1; thirdPtr < right; thirdPtr++) {
      //let third pointer start out right next to the left pointer with its boundaries btwn the left and right pointers and do the iteration within this window
      if (thirdPtr > left + 1 && arr[thirdPtr] === arr[thirdPtr - 1]) {
        //YOU MISSING THIS ENTIRE SECTION BC NEED TO ACCOUNT FOR DUPLICATES IN THE LEFT PTR AND THE MID PTR
        thirdPtr++;
        continue;
      }
      if (twoSum + arr[thirdPtr] === 0) {
        result.push([arr[left], arr[thirdPtr], arr[right]]);
      }
    }
    if (twoSum <= 0) left++;
    //to make the sum go from neg to more ==> 0
    else right--; //to make the sum go to 0 <== direction
  }
  return result;
}

//know time complex/space for sorts
//non consistent style, better to use if else than ternary
//spaces
//give them examples while explaining so they can see it
//consistent variable names, better with first, second, third, or a, b, c

//why do you have to sort? bc there's possibility of duplicates and sorting will provide you where the duplicates are. HAVE TO SORT FOR ANY PROBLEMS NOT LEETING YOU HAVE DUPS to be efficient
//can do threeSum if dups are ok
//if can't sort then optimize by using set and no full scan of list again brute force which is less efficient
//time: reduced from n^3 to n^2
//space: O(1)

//PRACTICE FROM SAME THING ABOVE
function threeSum3(arr) {
  const result = [];
  if (arr.length < 3 || !arr) return result;
  const sorted = arr.sort((a, b) => a - b);
  let left = 0;
  let right = sorted.length - 1;
  // while(left >=0 && right <) NOO just simple, don't worry about boundaries bc you've already kinda set it
  while (left < right) {
    if ((sorted[left] < 0 && sorted[right] < 0) || sorted[left] > 0)
      //accounting for if both are neg, or both are positive
      return result;
    if (left > 0 && sorted[left] === sorted[left - 1]) {
      //ACCOUNTING FOR DUPLICATE LEFTS
      left++;
      continue;
    }
    let twoSum = sorted[left] + sorted[right]; //two sum here NOT before the condition checking
    for (let mid = left + 1; mid < right; mid++) {
      if (mid > left + 1 && sorted[mid] === sorted[mid - 1]) {
        //YOU MISSING THIS ENTIRE SECTION BC NEED TO ACCOUNT FOR DUPLICATES IN THE LEFT PTR AND THE MID PTR
        mid++;
        continue;
      }
      if (twoSum + sorted[mid] === 0)
        result.push([sorted[left], sorted[mid], sorted[right]]);
    }
    //now move left and right ptrs depending on which will get you closer to 0
    if (twoSum > 0) right--;
    else left++;
  }
  return result;
}

console.log(threeSum3([-1, 0, 0, 0, 0, 1, 2, -1, -4]));
