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
var permute = function (nums) {
  let allCombos = [];
  let helper = function (options, permutation) {
    if (permutation.length === nums.length) {
      //base case
      allCombos.push(permutation);
      return;
    }
    options.forEach((option, index) => {
      //as the starting scope, EACH OPTION WILL get to be placed at index 0 in new arr
      //how to get remaining options
      let remainingOptions = options
        .slice(0, index)
        .concat(options.slice(index + 1));
      //#1 idx0   [].concat([2,3])
      //#2 idx1   [1].concat([3])
      //#3 idx2   [1,2].concat([])    //even if index > length, it'll know to return []
      //thus remaining option skips current index bc current index is being added to result already
      //how to get current permuation
      let currentPermutation = permutation.concat(option); //first round = [1]    [2]     [3]
      //concat creates a NEW arr so it won't affect the original permutation for the next iteration sibling
      //given curr index, slice curr option up to our index and slice remaining
      //^ concat these
      //permutation.concat(new el)
      helper(remainingOptions, currentPermutation); //first round = [1]    [2]     [3]
      //then TRUST recursion to take care of the rest
      //think about what you need to pass into next recursion BEFORE thinking about other implementations to find what you need to do for the arguments HIGH LEVEL IMPLEMENTATION
    });
  };
  helper(nums, []);
  //immediately invoked function expressions IIFE
  return allCombos;
};

// BUT THIS IS REALLY LONG!  might run out of heap if you have long inputs
//use the HEAP algorithm (NOT datastructor) and do SWAPS  https://www.youtube.com/watch?v=GuTPwotSdYw&list=PLjOkk6IoTYIFmFvW7k8r0MpyQEKVoCYL4&index=2
//height aka depth = length of string/arr
//branches will decrease by logn bc you have less and less options as you go down
//thus branch factor = logn

//OPTIMIZED SWAPPING ALGO
// var permutateArr = function (nums) {//or arr
//     let allCombos = [nums]
//     let helperPermute = function (arr, leftIdx, rightIdx){
//         if (leftIdx === rightIdx){
//
//         }
//     }
//     let swap = function (idx1, idx2, arr){
//         [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
//     }
//     helperPermute(nums, 0, 0)
//
// }

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

/*
Heap's permutation algorithm with swapping
at each level, the number of branches decrease by 1. depth is length of str
https://www.youtube.com/watch?v=GuTPwotSdYw&list=PLjOkk6IoTYIFmFvW7k8r0MpyQEKVoCYL4&index=2

Pseudocode:
if length is just 1 char, then just return it. no more combinations

*/
/*
let permutation2 = str => {
    
  if (str.length <=1) return [str]
  let charsArr = str.split('')
  let result = [[...charsArr]]
//   console.log(result)
  permutate(charsArr, 0, charsArr.length, result)
  return charsArr
}

let swap = (arr, idx1, idx2) => {
    let temp = arr[idx1]
    arr[idx1] =  arr[idx2]
    arr[idx2] = temp
//   console.log(arr[idx1], arr[idx2])
//   [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]] 

}


function permutate (arr, left, right, result){
    // console.log(result)
  if (left >= right) return 
  for (let i = left; i < right; i++){
      if (left === i){
          result.push([...arr])
      }
      console.log(left, i)
    //   [arr[left], arr[i]] = [arr[i], arr[left]]
    //   permutate([...arr], left + 1, right, result)
    //   [arr[left], arr[i]] = [arr[i], arr[left]]
  }
}

permutation2('1234')

let hey = [1,2,3,4]
[hey[0],hey[3]] = [hey[3], hey[0]]
console.log(hey)
*/
const getPermutations = (arr) => {
  const output = [];
  generate(arr.length, arr.slice(), output);
  return output;
};
// let hey = [1,2,3,4]
// let yo = [[...hey]]
// console.log(yo)
const swap = (arr, idx1, idx2) => {
  let temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
};

const generate = (length, currArr, output) => {
  if (length === 1) {
    //this is if the array is composed of just 1 number originally anyways, then don't need to recurse at all
    output.push([...currArr]);
    return;
  }
  generate(length - 1, currArr, output);
  for (let i = 0; i < length - 1; i++) {
    if (length % 2 === 0) {
      swap(currArr, i, length - 1);
    } else {
      swap(currArr, 0, length - 1);
    }
    generate(length - 1, currArr, output); //no swap back at all
  }
};
// console.log(getPermutations([1,2,3]))

/************************PRACTICE***********************/
const getDistinctPermutations = (arr) => {
  let output = [];
  recurse([...arr], output, arr.length - 1);
  return output;
};

function recurse(combo, output, rightIdx) {
  //setting base as n instead of 0 since starting idx will always be 0 instead of dynamic like ending index
  output.push([...combo]);
  if (combo.length === 1) return;
  // recurse([...combo], output, rightIdx-1)
  //   if(rightIdx === 0) return //THIS THIS MESSED UP THE RECURSION. DON'T NEED A BASE CASE BECAUSE THE FORLOOP WILL RETURN AFTER ITS DONE AND THE FORLOOP ALREADY SETS THE END POINTS
  for (let leftIdx = 0; leftIdx < rightIdx; leftIdx++) {
    //swap to recurse
    recurse([...combo], output, rightIdx - 1);
    if (combo.length % 2 === 1)
      [combo[0], combo[rightIdx]] = [combo[rightIdx], combo[0]];
    else [combo[leftIdx], combo[rightIdx]] = [combo[rightIdx], combo[leftIdx]];
    //swap back for next index
    // [combo[leftIdx], combo[rightIdx]] = [combo[rightIdx], combo[leftIdx]];
  }
  return;
}
// console.log(getDistinctPermutations([1,2,3]))

//[1,2,3]
//[3,2,1] l = 0, r = 2
//  [2,3,1] l = 0, r = 1
//  [3,2,1]

//      l = r so loop stops
//[1,2,3]
//[1,3,2] l = 1, r = 2

// let arr = [1,2,3,4,5];
// let a = arr[1];
// let b = arr[4];WILL NOT WORRRRRK IF YOU DON'T PUT IN THE SEMICOLONS!!!!!!!!!
// [arr[1],arr[4]] = [arr[4],arr[1]];
// console.log(arr)

//just chopping of the n for slicing and space btu still n! for call stack. just like quick sort vs merge sore. both n log n but with merge sort you need more space. 

let headsOrTailCombo = (n) => {
  let allPossibleResult = [];
  const recurse = (n, memo = []) => {
    if (memo.length === n) {
      allPossibleResult.push(memo); //can just push memo instead of making a new one bc we won't be touching it anymore
      return;
    }
    recurse(n, [...memo, "heads"]); //build up the array combo until at correct length of n, and then push to result arr.
    recurse(n, [...memo, "tails"]); //not changing n at all. only creating new memo arrays each time
  };
  recurse(n, []);
  return allPossibleResult;
};

// console.log(headsOrTailCombo(3))

/*compare 2 strings to see if they are permutations of each other
answer:
-split them into arrays, .sort then .join the compare
 */
let arePerumutations = (str1, str2) => {
  return str1.split("").join("") === str2.plit("").join("");
};

function permWithSlicing(arr) {
  let output = [];
  let helper = function (options, currCombo) {
    if (currCombo.length === arr.length) {
      output.push(currCombo);
      return;
    }
    options.forEach((option, idx) => {
      let newCombo = [...currCombo, option];
      let remainingOptions = options
        .slice(0, idx)
        .concat(options.slice(idx + 1)); //first time will be [] + [2,3]
      helper(remainingOptions, newCombo);
    });
  };
  helper(arr, []);
  return output;
}
console.log(permWithSlicing([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]));
