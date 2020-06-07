/* Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.
The number of elements initialized in nums1 and nums2 are m and n respectively.
You may assume that nums1 has enough space (size that is greater or equal to m + n) to hold additional elements from nums2.

nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3
Output: [1,2,2,3,5,6]
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
//since nums1 is longer than nums2 and both are sorted, merge starting from end.
//question, assuming, remaining space in nums1 will be 0 always?

var merge = function(nums1, m, nums2, n) {
    let result = m + n - 1;
    let m1 = m - 1;
    let n2 = n - 1;
    // while (nums1RealLen > -1) { NO if both m and n reach 0 then that's the length already, don't need to worry about bigger arr
    while(m1 > -1 && n2 > -1){
        if(nums1[m1] >= nums2[n2]) nums1[result--] = nums1[m1--];
        else nums1[result--] = nums2[n2--];
    }
    //if there's still m1 then ignore it because it's already in the nums1 arr in the correct order and place.  //just have to worry about n2
    while (n2 > -1){
        nums1[result--] = nums2[n2--]
    }
};