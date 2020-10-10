/* Given two sorted integer arrays nums1 and nums2, merge nums2 ==>"INTO"<== (keyword here) nums1 as one sorted array.
The number of elements initialized in nums1 and nums2 are m and n respectively.
You may assume that nums1 has enough space (size that is greater or equal to m + n) to hold additional elements from nums2.

nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3
Output: [1,2,2,3,5,6]
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
//since nums1 is longer than nums2 and both are sorted, merge starting from end.
//question, assuming, remaining space in nums1 will be 0 always?

var merge = function (nums1, m, nums2, n) {
  let result = m + n - 1; //number of actual idxs to work with
  let m1 = m - 1; //just getting the idices
  let n2 = n - 1;
  // while (nums1RealLen > -1) { NO if both m and n reach 0 then that's the length already, don't need to worry about bigger arr
  while (m1 > -1 && n2 > -1) {
    //aka while both indices are valid
    if (nums1[m1] >= nums2[n2]) nums1[result--] = nums1[m1--];
    //since both lists are ALREADY SORTED, and we know the end of list 1 are just filler 0s, best to not displace the actual values in the front but instead start filling the end of the list first
    else nums1[result--] = nums2[n2--];
  }
  //if there's still m1 then ignore it because it's already in the nums1 arr in the correct order and place.  //just have to worry about n2
  while (n2 > -1) {
    nums1[result--] = nums2[n2--]; //replacing the num1 values that you alreayd added to where it's supposed to be, with the n2 values and now everything is ordered corrected
  }
  return nums1;
};

// PRACTICE
var merge2 = function (nums1, m, nums2, n) {
  let finalIdx = m + n - 1;
  let mIdx = m - 1;
  let nIdx = n - 1;
  //don't even have to care about if one of the arr is empty, bc this loop condition won't even be met, and if m1 is empty too then returnning empty m1
  //if nums1 is empty but there's nums 2 then will enter 2nd while loop
  //if nums2 is empty but there's nums 1, no loops will even be entered bc nums1 is already sorted AND in the right place so just return nnums1 since nothing needs to be merged
  //thus, only merging when there's anything even in nums to really which would have 2 different merging depending on the conditions
  while (mIdx >= 0 && nIdx >= 0) {
    //while we havne't gone through all of 1 arr yet, EASIER TO USE IF > -1 instead of >= 0
    nums1[finalIdx--] =
      nums1[mIdx] >= nums2[nIdx] ? nums1[mIdx--] : nums2[nIdx--];
  }
  //once first while is done, check if need 2nd whil
  while (nIdx >= 0) {
    nums1[finalIdx--] = nums2[nIdx--];
  }
  return nums1;
};

console.log(merge2([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3));

//NOTE: ASK IF WE CAN ASSUME VALID INPUT
