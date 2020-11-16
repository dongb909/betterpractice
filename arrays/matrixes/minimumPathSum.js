/*Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.

Example:

Input:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
Output: 7
Explanation: Because the path 1→3→1→1→1 minimizes the sum. */

//move DOWN or RIGHT only [right[1,0] down [0,1]]
//edge: empty, 1 num, is the grid diff sizes

var minPathSum = function(grid) {
  if(grid.length === 0) return 0;
  if(grid[0].length === 0) return 0;
  return findSmallest(grid, 0, 0, 0)
};

let findSmallest = function (grid, sum, row, col) {
  let rows = grid.length
  let cols = grid[0].length
  if (row === rows || col === cols) return Infinity //boundary check, the infinity will be checked by Math.min line 32 so it's ok
  const currSum = grid[row][col] + sum
  if (row === rows-1 && col === cols-1) return currSum //return when reach last cell
  
  return Math.min(  //if not at last cell, take this currSum and recurse right or down, adding the next cell and returning what's the smallest up the chain until hit line 25
      findSmallest(grid, currSum, row + 1, col), 
      findSmallest(grid, currSum, row, col + 1)
  ) 

}

console.log(minPathSum([
  [1,3,1,5,1],
  [1,5,1,2,1],
  [4,2,1,1,1]
]))
//NOTTTTTT:
// function dfs(grid, row, col, sum) {
//     let rows = grid.length, cols = grid[0].length;
//     if (row === rows || col === cols) return Infinity;
//     const newSum = sum + grid[row][col];
//     if (row === rows-1 && col === cols-1) return newSum
//     return Math.min(
//         dfs(grid, row + 1, col, newSum),
//         dfs(grid, row, col + 1, newSum)
//     )
// }
