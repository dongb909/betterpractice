/* Given a set of distinct integers, nums, return all possible subsets (the power set)
Note: The solution set must not contain duplicate subsets.
Input: nums = [1,2,3]
Output:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
*/
function subsets(nums) {
  const powerset = [];
  generatePowerset([], 0);
  function generatePowerset(path, index) {
    powerset.push(path);
    for (let i = index; i < nums.length; i++) {
      generatePowerset([...path, nums[i]], i + 1); //using SPREAD operator
    }
  }
  return powerset;
}

var subsets = function (nums) {
  let result = [];
  dfs([], 0);

  function dfs(current, index) {
    result.push(current);
    for (let i = index; i < nums.length; i++) {
      dfs(current.concat(nums[i]), i + 1); // using concat
    }
  }

  return result;
};

/* Walk through
line 33                                           line 34                                             line 35
current = [] pushed                             i = 0                                               dfs([1], 1)
    itera current = [1] pushed                         i = 1                                               dfs([1,2], 2)
        dfs current = [1, 2] pushed                         i = 2                                                 dfs([1,2,3], 3)
            dfs current = [1,2,3] pushed                        i = 3 break bc i > nums.length
        
    itera current = [1] already pushed                 i = 2                                        dfs([1,3], 3)
        dfs current = [1,3] pushed
itera current = [] already pushed               i = 1                                               dfs([2], 2)
    dfs current = [2] pushed                        i = 2                                           dfs([2,3], 3)
        dfs current = [2,3] pushed                      i = 3 break
itera current = [] already pushed               i = 2                                               dfs([3], 3)
    dfs current = [3] pushed                        i = 3  break

return results

*/

console.log(subsets([1, 2, 3]));

/*
time: branch factor ^ max depth
    possible decisions   how far(height of tree)
    branch factor = n
    maxDepth = how large can each set be, max n
    n^n exponential bc the exponent is related to the input size

space: n * 2^n 

*/
