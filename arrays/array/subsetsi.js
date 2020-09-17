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
			generatePowerset([...path, nums[i]], i + 1);
		}
	}
	return powerset;
}

var subsets = function(nums) {
    let result = [];
    dfs([], 0);
    
    function dfs(current, index){
        result.push(current);
        for(let i = index; i < nums.length; i++) {
            dfs(current.concat(nums[i]), i + 1);
        }
    }
    
    return result;
};

console.log(subsets([1,2,3]))

/*
time: branch factor ^ max depth
    possible decisions   how far(height of tree)
    branch factor = n
    maxDepth = how large can each set be, max n
    n^n exponential bc the exponent is related to the input size

space: n * 2^n 

*/