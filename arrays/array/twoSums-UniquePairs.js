/*Given an int array nums and an int target, find how many unique pairs in the array such that their sum is equal to target. Return the number of pairs.
Input: nums = [1, 1, 2, 45, 46, 46], target = 47
Output: 2
Explanation:
1 + 46 = 47
2 + 45 = 47
Example 2:
Input: nums = [1, 1], target = 2
Output: 1
Explanation:
1 + 1 = 2
Example 3:
Input: nums = [1, 5, 1, 5], target = 6
Output: 1
Explanation:
[1, 5] and [5, 1] are considered the same. */

let twoSumUnique = (nums, target) => {
  let dict = new Map();
  let pushed = new Set();
  let pairs = [];
  let diff;
  for (let i = 0; i < nums.length; i++) {
    // console.log(nums.length)
    // if (!dict.has(nums[i]) ){
    diff = target - nums[i];

    if (!pushed.has(diff) && dict.has(diff)) {
      pairs.push([nums[i], diff]);
      pushed.add(nums[i]);
      pushed.add(diff);
    }
    dict.set(nums[i], i); //key value pairs with key being the element and value being the index
    console.log(dict, pushed, diff, nums[i]);
  }
  // }
  return pairs;
};

//aka with every el, add the el and its index to map
//before adding to map though, check to see if THE DIFFERENCE, NOT the ELEMENT already in the map or already in pushed
//if difference already in map BUT NOT pushed then add current el and diff (aka a num you've already seen) to pushed set
//at the same time, add the PAIR to pairs
//the set is there so you don't have to iterate through your pairs to check if you've already had those nums. so there's no duplicates
//you really don't even need the index, you can just have both key and value as itself.
//DON'T HAVE TO CHECK FOR DUPLICATE EITHER, CAN JUST OVERRIDE IT IN THE MAP SINCE YOU REALLY ONLY CARE ABOUT 1 BEING IN THE PAIR OF RESULTS
//DON'T WORRY ABOUT DELETING FROM THE MAP EITHER EVEN AFTER USE. IT'S JUST THERE FOR STORAGE OF WHAT YOU'VE ALREADY ENCOUNTERED
/*
{el 1: index 0}
//el 1 get over written
{el 1: index 1}
{el 1: index 1, el 2: index 2}
47-45 = 2
Set does not have 2 but dictionary does
so pairs = [45, 2 as difference not 2 as the element]
add difference 2 to set and 45 because must be unique and we won't ever take anything of the same pair again
    {2,45}
if next round is also 45, then it won't add because !pushed.has(45) will return false
47-46 = 1 and 1 is in dictionary
so push 46 and diff to pairs and add both to set
and so on
 */
console.log(twoSumUnique([1, 1, 2, 45, 46, 46], 47));

// O(n)
