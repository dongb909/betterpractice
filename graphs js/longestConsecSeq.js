/*HARD
Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
Example 1:
Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
Example 2:
Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9
 
Constraints:

0 <= nums.length <= 104
-109 <= nums[i] <= 109
 

Follow up: Could you implement the O(n) solution?
 */
var longestConsecutive = function (nums) {
  //get rid of duplicates and allow for easy lookup
  if (!nums.length) return 0;
  const uniqueNums = new Set(nums);
  let count = 0;
  let maxSequence = Number.MIN_VALUE;
  for (let num of uniqueNums) {
    //'of' returns the correct type of element. 'in' returns a stringed number
    //if there's a value less than this num, then skip it because we only want to count from the smallest number of the seq so we don't duplicate counting
    // so only address when we don't have that num and our current num is smallest
    if (!uniqueNums.has(num - 1)) {
      while (uniqueNums.has(num)) {
        count++;
        num++;
      }
    }
    maxSequence = Math.max(maxSequence, count);
    count = 0;
  }
  return maxSequence;
};

// console.assert(longestConsecutive([100,4,200,1,3,2])===4, "Should equal 4")
console.assert(
  longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]) === 9,
  "Should equal 9"
);
console.assert(longestConsecutive([0, 0]) === 1, "Should equal 1");
console.assert(longestConsecutive([]) === 0, "Should equal 0");
