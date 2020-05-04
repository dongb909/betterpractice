let cases = [[7,[2,5], 2], [2,[2,5],1], [9,[2,5],3]];

function climbStairs (n) {
    if (n <= 0) return 0 
    if (n===2) return 1;
    if (n===5) return 1;    ///IT'S THE SAME PROBLEM OR SOLUTION IN TERMS OF THE RECURRANCE RELATION BUT THE BASE CASES IS WHAT YOU NEED TO CHANGE FOR STEPS
//IF HAVE MANY AVAIL STEPS THEN CLEAN UP BY
  //LET availSteps = [2,5,8,23,100]
  // for(step of availSteps){
  //   if (n === step) {
  //     return 1;
  //   }
  // }
  //LET availSteps = {2,5,8,23,100} 
  //if (availSteps.has(n)) return 1;  ==> O(1)
    return climbStairs(n-2) + climbStairs(n-5) 

    //return availSteps.reduce(sum, step => {
    //   return sum + climbStairs(n-step);
    // },0)
    //      (5)                 (2)
    //      (3)                 (0)
}

// cases.forEach(([n, expected]) => {
//   let result = climbStairs(n) 
//   if(result !== expected) {
//     console.log (n, expected, result)
//   }
// })




/**
 * @param {number} n
 * @return {number}
 */

//order matters bc diff steps technically
//zero is not a positive integer
//think and discuse recursively and that approach first (more elegant and concise) and then explain what's wrong with it 
//and THENNN reach for dp (more verbose but easier to access runtime)
//possible steps only work with small numbers, you have to prove it for bigger numbers but it won't work


//MOST OPTIMAL FOR steps 1 and 2
// var climbStairs = function(n) {
//     if (n<2) return 1;
//     if (n===2) return 2;
//     let result = [1,2];
//     for (let i = 3; i < n + 1 ; i++){
//         let temp = result[1];
//         result[1] = result[0] + result[1];
//         result[0] = temp;
//     }
//     return result[1];
// };
//time: O(n) disregard small n
//space: O(1)


// function climbStairs (n) {
       // if (n <= 0) return 0 (when steps are greater than available steps)
//     if (n<2) return 1;
//     if (n===2) return 2;
        
//     return climbStairs(n-1) + climbStairs(n-2) 
// + climbStairs(n-5) if n < 5 then return 0 NOOOOOO
// }

///time for recursions are always based on tree to branch factor is 2 and max depth is n aka number of steps thus exponential super bad
//space complexity: O(n) bc you're doing dfs so you're going to go all the way down before going up the branch currently on to go to the next branch thus, it's just n for the callstack


// var climbStairs = function(n) {
//   if (n<2) return 1;
//   if (n===2) return 2;
//   let result = [1,2];
//   for (let i = 3; i < n + 1 ; i++){
//       let temp = result[1];
//       result[1] = result[0] + result[1];
//       result[0] = temp;
//   }
//   return result[1];
// };
//steps 2 and 5
var climbStairs = function(n, steps) {      //(n = 7, steps = [2,5], result = 2)
  steps.sort((a,b) => a-b);
  let possibilities = Array(n+1).fill(0);  // [0,0,1,0,0,0,0,0]
  for(let level = 0; level < possibilities.length; level++) {
    for (step of steps) {
      let prevLevel = level - step 
        //either 2 or 5         4  //YOU GOT STUCK HEREEEEEEEE 
      if (prevLevel === 0 || possibilities[prevLevel] > 0) {
        possibilities[level] = possibilities[prevLevel] + 1;
      }
    }

  }
  return possibilities[n]

}

cases.forEach(([n, steps, expected]) => {
  let result = climbStairs(n, steps) 
  if(result !== expected) {
    console.log (n, expected, result)
  }
})