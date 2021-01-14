//similar to subsetsII
/*Given a collection of numbers, find all unique combos that sums to target
each number in list may only be used once
should not return duplicate combinations, target will always be positive
use backtracking / DFS aka take or not take

ex1: [10,1,2,7,6,1,5] target 8
soln: [[1,7], [1,2,5], [2,6], [1,1,6]]

ex2: [2,5,2,1,2] target 5
soln: [[1,2,2],[5]]*/


function combinationSum(nums, target){
  const combos = []
  nums.sort((a,b)=> a-b)  //didn't work at first bc didn't sort it! so got a lot of nums, still getting duplicates tho so see line 31
  console.log(nums)
  recurse(nums, target, 0, new Array(), combos)
  return combos
}
//NOT DONE WITH THIS PROBLEM!!!!! NEED TO FIGURE OUT WHY IT'S GOING BACKWARDS TO GET 6,2 AND 1,5,2. THOSE SHOULDN'T BE INCLUDED
function recurse(nums, target, idx, currCombo, combos){
  //base case if sum of current combo before this call sums to 0 add to final combos and return
  if(target === 0){
    combos.push([...currCombo])
    return 
  }
  //if sum went beyond what we needed, since subtracting will be a neg num, return
  if (target < 0) return
  //subtract from target, increment idx but check if duplicate first, recurse WITH new number added aka TAKE
  for(let i = idx; i < nums.length; i++){
    // if (i >= 0 || nums[i] !== nums[i-1]){ //i === idx or can do i>=0, as long as the first is true then the 2nd will run and be tested
    if (nums[i] !== nums[i-1]){ //was getting [ [ 1, 2, 5 ], [ 1, 5, 2 ], [ 1, 7 ], [ 2, 6 ], [ 6, 2 ] ], not sure why it's going backwards too?
      currCombo.push(nums[i])
      recurse(nums, target - nums[i], idx + 1, currCombo, combos)
      //get rid of that new number before iterating to next num, aka NOT TAKE
      currCombo.pop()
    }
  }
}

//space =  n
//time = 2^n bc every possible combination either taking or not taking the number

console.log(combinationSum([10,1,2,7,6,1,5], 8))