/*

Given a collection of integers that might contain duplicates, nums, return all possible subsets (the power set).

Note: The solution set must not contain duplicate subsets.

Example:

Input: [1,2,2]
Output:
[
  [2],
  [1],
  [1,2,2],
  [2,2],
  [1,2],
  []
]
*/

var subsetsWithDup = function(nums) {
    nums.sort((a, b) => a - b);
    const res = [];
    const dfs = (nums, i, arr) => {
        if(i === nums.length) {
            res.push(arr);
            return;
        }
        dfs(nums, i+1, arr);
        let newarr = arr.concat(nums[i]);
        dfs(nums, i+1, newarr);
    };
    dfs(nums, 0, []);
    return Array.from(new Set(res.map(JSON.stringify)), JSON.parse);
};


var subsetsWithDup = function(nums) {
        
    nums = nums.sort((a,b) => a-b);
    
    const res = [];
    
    function fn(length, start=0, arr = []) {
        if (arr.length === length) {
            res.push(arr.slice());
            return;
        }
        for(let i=start; i<nums.length; i++) {       
            if (i !== start && nums[i-1] === nums[i]) continue;
            arr.push(nums[i]);
            fn(length, i+1, arr);
            arr.pop();            
        }
    }
    
    for(let length=0; length<=nums.length; length++) {
        fn(length);
    }
    
    return res;
};