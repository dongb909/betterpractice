/**
 * @param {number} N
 * @return {number}
 */

//I: int
//O: int
//E: no neg, no floats
var fib = function (N) {
  if (N === 0) return 0;
  if (N < 3) return 1;
  return fib(N - 1) + fib(N - 2);
};

// run time = branch factor^ max depth 2^N = exponential
//ex binary tree branch factor is 2
//recrusive problems are express as decision trees

//   var fib = function(N) {
//     // if (N === 0) return 0
//     // if (N < 3) return 1;
//     const fib = {0:0, 1:1, 2:1}
//     for (let i = 3; i <= N; i++){
//         fib[i] = fib[i-1] + fib[i-2];
//     }
//     return fib[N]
// };
//0,1,1,2,3,5,8,13,21 //linear with O(n) space

var fib = function (N) {
  const memo = [0, 1, 1];
  for (let i = 3; i <= N; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }
  return memo[N];
};

// behavior specific to js , it allocates the space dynamically
// linear with O(1) space
// var fib = function(N) {
//     if (N === 0) return 0
//     if (N < 3) return 1;
//     let off2 = 1;
//     let off1 = 1;
//     let curr
//     for (let i = 3; i <= N; i++){
//         curr = off2 + off1;
//         off2 = off1;
//         off1 = curr
//     }
//     return curr;
// };

// var fib = function(N) {
//     if (N === 0) return 0
//     if (N < 3) return 1;
//     const memo = [0, 1];
//     for (let i = 2; i <= N; i++){
//         let temp = memo[0] + memo[1];
//         memo[0] = memo[1];
//         memo[1] = temp
//     }
//     return memo[1]
// };

let fib = function (n) {
  if (n === 0) return 0;
  if (n < 3) return 1;
  return fib(n - 1) + fib(n - 2);
};
