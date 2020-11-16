/*Given a matrix of m x n elements (m rows, n columns), return all elements of the matrix in spiral order.
Input:
[
 [ 1, 2, 3 ],
 [ 4, 5, 6 ],
 [ 7, 8, 9 ]
]
Output: [1,2,3,6,9,8,7,4,5]
Example 2:
Input:
[
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9,10,11,12]
]
Output: [1,2,3,4,8,12,11,10,9,5,6,7] 
https://practice.geeksforgeeks.org/problems/spirally-traversing-a-matrix/0*/
var spiralOrder = function(matrix) {
  let result = [];
  if (matrix.length === 0) return result;
  let topRow = 0;
  let bottomRow = matrix.length-1;
  let startColumn = 0;
  let endColumn = matrix[0].length - 1;
  //****************** must be <= not just < and must be && not ||
  while (topRow <= bottomRow && startColumn <= endColumn) {   //boundaries
  //***************** 
    //iterate through each col of first row and add (row stays same)
    for (let col = startColumn; col <= endColumn; col++) {
      result.push(matrix[topRow][col]);
    }
    //done with this row so update toprow to next row
    topRow++;
    //now add the last col from top to bottom (col stays same)
    for (let row = topRow; row <= bottomRow; row++) { 
      result.push(matrix[row][endColumn]);
    }
    //done with last col so update last col to next to last col
    endColumn--;
    //now move left through columns in bottom row (row stays same)
    if(topRow <= bottomRow) { //MUST CHECK THIS AGAIN BECAUSE WE ++
      for (let col = endColumn; col >= startColumn; col--) {
        result.push(matrix[bottomRow][col]);
      }
      //done with last row so update the row to the next level up towards center
      bottomRow--;
    }
    if(startColumn <= endColumn) { //MUST CHECK THIS AGAIN BECAUSE WE --
      for (let row = bottomRow; row >= topRow; row--) {  //BE CAREFUL OF THE CONDITIONALS! > vs <
        result.push(matrix[row][startColumn]);
      }
      //done with most left col now move into center
      startColumn++;
    }
  }
  return result
};