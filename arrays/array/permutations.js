/*Given a collection of distinct integers, return all possible permutations.
Input: [1,2,3]
Output:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]*/
var permute = function(nums) {
    let allCombos =[]
    let helper = function(options, permutation) c{
        if (permutation.length === nums.length) { //base case
            allCombos.push(permutation);
            return;
        }
        options.forEach((option, index) => {  //as the starting scope, EACH OPTION WILL get to be placed at index 0 in new arr
            //how to get remaining options
            let remainingOptions = options.slice(0,index).concat(options.slice(index+1))
                                    //#1 idx0   [].concat([2,3])
                                    //#2 idx1   [1].concat([3])
                                    //#3 idx2   [1,2].concat([])    //even if index > length, it'll know to return []
                                    //thus remaining option skips current index bc current index is being added to result already
            //how to get current permuation
            let currentPermutation = permutation.concat(option)  //first round = [1]    [2]     [3]
                //concat creates a NEW arr so it won't affect the original permutation for the next iteration sibling
            //given curr index, slice curr option up to our index and slice remaining
                //^ concat these
            //permutation.concat(new el)
            helper(remainingOptions, currentPermutation) //first round = [1]    [2]     [3]
            //then TRUST recursion to take care of the rest
            //think about what you need to pass into next recursion BEFORE thinking about other implementations to find what you need to do for the arguments HIGH LEVEL IMPLEMENTATION
        })
    }
    helper(nums, [])
    //immediately invoked function expressions IIFE
    return allCombos
}

// BUT THIS IS REALLY LONG!  might run out of heap if you have long inputs
//use the HEAP algorithm (NOT datastructor) and do SWAPS  https://www.youtube.com/watch?v=GuTPwotSdYw&list=PLjOkk6IoTYIFmFvW7k8r0MpyQEKVoCYL4&index=2
 //height aka depth = length of string/arr
 //branches will decrease by logn bc you have less and less options as you go down
 //thus branch factor = logn

//OPTIMIZED SWAPPING ALGO
var permutateArr = function (nums) {//or arr
    let allCombos = [nums] 
    let helperPermute = function (arr, leftIdx, rightIdx){
        if (leftIdx === rightIdx){

        }
    }
    let swap = function (idx1, idx2, arr){
        [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
    }
    helperPermute(nums, 0, 0)

}





//note: trees = O(branchFactor^depth) bc options are fixed for branch factor aka branch factors are the number of options
//space: trees = //dont' count input, nor output, 
    //for DFS = O(n) stack space worst case is when have a linkedlist like tree
         // DFS = O(depth = log n) balanced because go down to root then up on one side to the other
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
