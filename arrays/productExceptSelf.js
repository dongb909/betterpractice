/*
Given an array nums of n integers where n > 1,  return an array output such that output[i] is equal to the product of all the elements of nums except nums[i].

Example:

Input:  [1,2,3,4]
Output: [24,12,8,6]
Constraint: It's guaranteed that the product of the elements of any prefix or suffix of the array (including the whole array) fits in a 32 bit integer.

Note: Please solve it without division and in O(n).

Follow up:
Could you solve it with constant space complexity? (The output array does not count as extra space for the purpose of space complexity analysis.)

*/
var productExceptSelf = function(nums) {
  let output = []
  let leftProd = 1
  let rightProd = 1
  for (let i = 0; i < nums.length; i++){//setting output arr:: going left to right, there's nothing to the left of 0 index
    output[i] = leftProd      //must SET output indices first to a value or else will get NaN
    leftProd *= nums[i]//from orig numbers:: now left products to the next index will be the currently calculated times curr val
  }
  for (let j = nums.length - 1; j>=0; j--){ //going right to left, there's nothing to the right of the last num thus 1
    output[j] *= rightProd        //have all prods to left of index, now * to prods to right of index 
    rightProd *= nums[j]  //update products to include current index val for next index
  }
  return output
};



//O(n) DOES NOT MEAN 1 PASS!!!!
//


[1,2,3,4]
     c
iteration 1 => 1, 2, 6, 24    -> = from left

iteration 2 => 24, 24, 12, 4   <- = from right

iterate c => index c-1 + c+1 indexing with boundary check and place in final arr

  anything left c then  EXCLUE c index c-1 + c+1 indexing with boundary check 
       
still O(n)!!!! linear time doesn't mean ONLY LINEAR PASS, so O(n) doesn't mean it's faster if you have many vs a n^2
space = O(2n) not counting result arr


set arr to another var since that's not new space but just referencing