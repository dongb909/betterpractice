/*

Given a binary matrix A, we want to flip the image horizontally, then invert it, and return the resulting image.

To flip an image horizontally means that each row of the image is reversed.  For example, flipping [1, 1, 0] horizontally results in [0, 1, 1].

To invert an image means that each 0 is replaced by 1, and each 1 is replaced by 0. For example, inverting [0, 1, 1] results in [1, 0, 0].

Example 1:

Input: [[1,1,0],[1,0,1],[0,0,0]]
Output: [[1,0,0],[0,1,0],[1,1,1]]
Explanation: First reverse each row: [[0,1,1],[1,0,1],[0,0,0]].
Then, invert the image: [[1,0,0],[0,1,0],[1,1,1]]
Example 2:

Input: [[1,1,0,0],[1,0,0,1],[0,1,1,1],[1,0,1,0]]
Output: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
Explanation: First reverse each row: [[0,0,1,1],[1,0,0,1],[1,1,1,0],[0,1,0,1]].
Then invert the image: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
Notes:

1 <= A.length = A[0].length <= 20
0 <= A[i][j] <= 1 */

// var flipAndInvertImage = function(A) {  //IS AN ARRAY OF ARRAY SO CAN'T JUST DO I, MUST DO J TOO
//   //no need to floor it
//   for(let i = 0; i<A.length; i++){ 
//     for(let j = 0; j<A[0].length/2; j++){
//       console.log(A.length-1-j)   //BE CAREFUL! IT'S -J NOT -I
//       if (A[i][j] === A[i][A.length-1-j]) {
//         if(A[i][j] === 0) {
//           A[i][j]=1;
//           A[i][A[0].length-1-j]=1;
//         } else{
//           A[i][j]=0;
//           A[i][A[0].length-1-j]=0;
//         }
//       }
//     }
//   }  
//   return A
// };


var flipAndInvertImage = function(A) {  //IS AN ARRAY OF ARRAY SO CAN'T JUST DO I, MUST DO J TOO
  //no need to floor it
  for(let i = 0; i<A.length; i++){ 
    for(let j = 0; j<A[0].length/2; j++){
      console.log(A.length-1-j)   //BE CAREFUL! IT'S -J NOT -I
      if (A[i][j] === A[i][A.length-1-j]) {
          A[i][j]= A[i][A[0].length-1-j]=A[i][j] === 0? 1 : 0;
     }
    }
  }  
  return A
};


console.log(flipAndInvertImage([[1,1,0],[1,0,1],[0,0,0]]))

//[[1,0,0],[0,1,0],[1,1,1]]