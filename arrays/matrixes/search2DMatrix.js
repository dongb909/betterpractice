/*Write an efficient algorithm that searches for a value in an m x n matrix. This matrix has the following properties:

Integers in each row are sorted in ascending from left to right.
Integers in each column are sorted in ascending from top to bottom.
Example:

Consider the following matrix:

[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
Given target = 5, return true.

Given target = 20, return false.
log(MN)
Accepted */

//FIRST ATTEMPT

// var searchMatrix = function(matrix, target) {
//   if (matrix.length ===0) return false;
//   if (target < matrix[0][0]) return false;
//   if (target === matrix[0][0]) return true;
// if (matrix[0][matrix.length-1] < target){
//   for(let col = 1; col < matrix[0].length; col ++){
//        if (matrix[0][col]=== target) {
//          return true;
//        }
//      }
// }
//   for(let row = 1; row < matrix.length; row++) {
//     //check only first colum first
//     if (target === matrix[row][0]){
//       return true;
//     } else if (target < matrix[row][0]) {
//         for(let col = 1; col < matrix[0].length; col ++){
//           //we know it's not equal to the first index so don't need col 0 and we know it's larger than the first index. 
//           if (matrix[row-1][col]=== target) {
//             return true;
//           }
//         }
//     } else if (target > matrix[row][0]) {
//       for(let col = 1; col < matrix[0].length; col ++){
//         //we know it's not equal to the first index so don't need col 0 and we know it's larger than the first index. 
//         if (matrix[row][col]=== target) {
//           return true;
//         }
//       }
//     }
//   }
//   return false;
// };


// var searchMatrix = function(matrix, target) {
//   if (matrix.length===0) return false;
//   for(let row=0; i< matrix.length; i++){
//     if (matrix[row][matrix.length-1] )
//   }

// }


// var searchMatrix = function(matrix, target) {
//   if (!matrix.length){
//       return false
//   }
//   let n = matrix[0].length
//   let m  =  matrix.length
//   let i = 0;
//   let j = n - 1;
//   while( i < m && j >=0){
//       let curr = matrix[i][j];
//       if(curr == target){
//           return true;
//       }
//       else if (curr > target){
//           j--
//       }
//       else {
//           i++
//       }
//   }
//   return false
// };


///2ND ATTEMPT
// function searchMatrix(matrix, target) {
//   if (!matrix.length || !matrix[0].length) return false; 

//   let row=0;
//   let col=matrix[0].length-1;

//   while(row < matrix.length && col>=0){
//     console.log(row, col)
//     if(matrix[row][col] === target){
//       return true;
//     } else if(matrix[row][col] > target){
//       col--;
//     } else {
//       row++;
//     }
//   }
//   return false;
// }

//3RD ATTEMPT WITH BINARY SEARCH

function searchMatrix(matrix, target) {
  if (!matrix.length) return false;
  let rows=matrix.length;
  let cols=matrix[0].length;
  
  let left = 0;
  //right is area of array but remember to -1 to factor in 0
  let right = rows*cols-1;

  //treat the matrix as a single sorted array and go inwards until left passes right, want to still check the element where left=right
  while(left <=right) {
    //find current midpoint
    //is not just right/2 because have to account for where left is and where the midpt is btwn l and r compared to 0
    //so half of the current box plus it's left posiiton from 0
    let midpointIndex = left + (right-left)/2; //DIVIDE 2 ON THE OUTSIDE!!
    //take that index and divide by how many cols it'll take. the whole number is row, the remainder is the col position (1/3 = 0 whole number and remainder is 1)
    let midpointValue = matrix[midpointIndex/cols][midpointIndex%cols];
    if (midpointValue === target){
      return true;
    } else if (midpointValue < target){
      //-/+1 since we've already checked the midpoint value itself. so now go one over
      left = midpointIndex+1
    } else if(midpointValue > target){
      right = midpointIndex-1
    }
  }
  return false;

}
//O(logm + logn)
//space(1)
//
//while:
  //watch your range but it's still iterating
//
//pointers: pointer = O(n) unless pointers can overalp eachotehr window
    // going inwards from ends
      


console.log(searchMatrix([
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
], 30))







/*function searchMatrix(matrix, target) {
  if (!matrix) return false;
  if (!matrix.length) return false;
  
  return binarySearch(mergeSortedArrays(matrix), target);  
}

function mergeSortedArrays(matrix) {
  const arr = [];
  
  for (const row of matrix) {
    for (const val of row) {
      arr.push(val);
    }
  }
  
  return arr;
}

function binarySearch(arr, target) {
  if (!arr) return false;
  if (!arr.length) return false;
  
  const iMid = Math.floor(arr.length / 2);
  const mid = arr[iMid];
  
  if (target === mid) return true;
  if (target < mid) return binarySearch(arr.slice(0, iMid), target);
  
  return binarySearch(arr.slice(iMid + 1), target);
} */