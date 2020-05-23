/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    let permutations =[]
    let helper = function(options, permutation) {
        if (permutation.length === nums.length) {
            permutations.push(permutation);
            return;
        }
        options.forEach((option, index) => {
            //how to get remaining options
            //how to get current permuation
            //given curr index, slice curr option up to our index and slice remaining
                //^ concat these
            //permutation.concat(new el)
            let remainingOptions = options.slice(0,index).concat(options.slice(index+1))
            let currentPermutation = permutation.concat(option)
            helper(remainingOptions, currentPermutation )
            //think about what you need to pass into next recursion BEFORE thinking about other implementations to find what you need to do for the arguments HIGH LEVEL IMPLEMENTATION
        })
    }
    helper(nums, [])

    //immediately invoked function expressions IIFE
    
    return permutations
}

//note: trees = O(branchFactor^depth) bc options are fixed for branch factor
//space: trees = //dont' count input, nor output, 
    //for DFS = O(n) stack space worst case is when have a linkedlist like tree
          DFS = O(depth = log n) balanced because go down to root then up on one side to the other
    //for BFS = O(n) the largest queue length, callstack is just 1 frame though, don't assume binary tree
          //^ Think about 1 root and the the rest of n as that root node's children
          // if binary tree space = O(2^maxdepth)
//time for this one = n!(bc 3*2*1 for branch factor at each level of recursion) * (line 18) O(n)
//when you've had an option, you have less next time, depth incr and dec branch factor
//final answer n!*n
//factorials are when your options aka branch factors are changing in a decreasing fashion
//space: n! NOOOOOO don't count output bc output is free, so here count callstack size
//space: call stack size = permutation tree is n-ary thus O(n) bc n is the depth DUHHRRRRRRHRHRHRHRHRH stupid.

//given a set of nums, this input, attempt to put every remaining char at every possible position. choose an el, hold it in a given place and then rearrange th e remaining nums you have in the various availaable places
