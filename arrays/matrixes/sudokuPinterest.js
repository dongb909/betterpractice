/*
  Args:
    matrix: an NxN array of arrays containing the matrix to check
  Returns:
    The string "VALID" if matrix contains a valid sub-sudoku solution, and
    "INVALID" otherwise
*/
function checkSubSudoku(matrix) {
  //1...N so need to check for zeros? 
  //check for negative nums
  //no floats. just integers
  //no need check diagonals
  let n = matrix.length
  for (let row = 0; row < n; row++) {
    if(!isValidRow(matrix, row, n)) return "INVALID";
  }
  for (let col = 0; col < n; col++){
    if(!isValidCol(matrix, col, n)) return "INVALID";
  }
  return "VALID";
}

function isValidRow(matrix, row, n){
  let set = new Set();
  for (let i = 1; i <= n; i++) set.add(i);
  for (let num of matrix[row]){
//     if(!set.has(num)) return false;
    set.delete(num);
  }
  return set.size === 0;
}

function isValidCol(matrix, col, n){
  let set = new Set();
  for (let i = 1; i <= n; i++) set.add(i);
  for (let row = 0; row < n; row++){
//      if(!set.has(matrix[row][col])) return false;
    set.delete(matrix[row][col]);
  }
  return set.size === 0;
}


Problem Statement
You are working on a logic game made up of a series of puzzles. The first type of puzzle you settle on is “sub-Sudoku”, a game where the player has to position the numbers 1..N on an NxN matrix.

Your job is to write a function that, given an NxN matrix, determines if the matrix is valid. A matrix is valid if every row and column contains exactly the numbers 1..N. For example, in a 4x4 matrix, each row and column would contain the numbers 1, 2, 3, and 4.

If the matrix is valid, return “VALID”. If it is not valid, return “INVALID”

The matrix may contain any integer, not just 1..N, and not just positive. However, the grid will only contain integers.

Examples
The following matrix would return “VALID”:

1 2 3
2 3 1
3 1 2
Each row and column contains exactly the numbers 1, 2, and 3 in a 3x3 matrix.

However, this matrix is “INVALID”:

1 2 3
1 2 3
1 2 3
Each row has the numbers 1, 2, and 3. However, the columns do not; the first column contains 1, 1, and 1.

The following matrix is also “INVALID”:

3 5 7
2 4 8
9 1 6
While each row and column has three different numbers, they are not the numbers 1, 2 and 3, so this is not valid.