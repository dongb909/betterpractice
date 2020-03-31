/*You are given an n x n 2D matrix representing an image.

Rotate the image by 90 degrees (clockwise).

Note:

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

Example 1:

Given input matrix = 
[
  [1,2,3],
  [4,5,6],
  [7,8,9]
],

rotate the input matrix in-place such that it becomes:
[
  [7,4,1],
  [8,5,2],
  [9,6,3]
]
Example 2:

Given input matrix =
[
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
], 

rotate the input matrix in-place such that it becomes:
[
  [15,13, 2, 5],
  [14, 3, 4, 1],
  [12, 6, 8, 9],
  [16, 7,10,11]
] */

/*I=matrix
0= rotated matrix
C= in place, clockwise
E = empty matrix*/
//this is a perfect square 

var rotate = function(matrix) {
    //transpose
    let len= matrix.length
    let temp
  for (let i=0; i<len; i++){
    for(let j=i; j<len;j++){  //J must = I NOT 0
      //store current value in temp
      temp=matrix[i][j];
      //replace current index with the value in the tranpose position
      //aka swap row with col
      matrix[i][j] = matrix[j][i]
      matrix[j][i] = temp
    }
  }
    //swap colomns from ends accounting for even and ood by iterating each row
    //must do one at a time
  for(let i = 0; i<len; i++) {
    //j will only go up to half the cols
    for(let j = 0; j < Math.floor(len/2); j++){  //J =O ok
      temp = matrix[i][j];
      //swapping colums l to r r to l so rows should stay the same
      matrix[i][j] = matrix[i][len-1-j];// because it's a perfect square so can use len
      matrix[i][len-1-j] = temp
    }
  }
  return matrix
};



console.log(rotate([
  [1,2,3],
  [4,5,6],
  [7,8,9]
]))


// [7,4,1],
//   [8,5,2],
//   [9,6,3]