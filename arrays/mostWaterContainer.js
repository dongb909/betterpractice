/*
Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.

Note: You may not slant the container and n is at least 2.

The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
Input: [1,8,6,2,5,4,8,3,7]
Output: 49 */

var maxAreaWater = function(height) {
  let currArea = 0
  let maxArea = 0
  let width=0
  for (let i = 0, j=height.length-1; i < j;) {
    width = j-i;
    if (height[i] <= height[j]) {
      currArea = height[i] * width;
      i++
    } else if (height[i] > height[j]) {
      currArea = height[j] * width;
      j--
    } 
    // else {
    //   currArea = height[i] * width;
    //   i++ //doesn't matter which one so just pick one
    // }
    maxArea = Math.max(maxArea, currArea);
  }
  return maxArea
};

console.log(maxAreaWater([1,8,6,2,5,4,8,3,7]))
// var maxArea = function(height) {
//   let left=0, right=height.length-1;
//   let max=0;
//   while(left<right) {
//       max=Math.max(max, Math.min(height[left], height[right])*(right-left));
//       height[left]<height[right] ? left++ : right--;
//   }
  
//   return max;
// };

// function maxArea(height) {
//   let maxarea = 0, l = 0, r = height.length - 1;
//   while (l < r) {
//       maxarea = Math.max(maxarea, Math.min(height[l], height[r]) * (r - l));
//       if (height[l] < height[r]) {
//         l++;
//       }
//       else {
//         r--;
//       }
//   }
//   return maxarea;
// }