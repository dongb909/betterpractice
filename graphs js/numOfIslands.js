/*MEDIUM
Given an m x n 2d grid map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Example 1:

Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
Example 2:

Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] is '0' or '1'. */

const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require("constants");

var numIslands = function (grid) {
  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      // console.log(grid[row][col]===1)//BE CAREFUL!!! THE ELEMENTS ARE STRINGS!!!! NOT NUMBERS
      if (grid[row][col] === "1") {
        count++;
        dfs(grid, row, col);
      }
    }
  }
  return count;
};

const dfs = (grid, row, col) => {
  //boundary check
  if (
    row < 0 ||
    row > grid.length-1 ||
    col < 0 ||
    col > grid[0].length-1 ||
    grid[row][col] === "0"
  )
    return;
  //process current cell
  grid[row][col] = "0";
  //expand
  dfs(grid, row + 1, col);
  dfs(grid, row - 1, col);
  dfs(grid, row, col + 1);
  dfs(grid, row, col - 1);
};

console.assert(
  numIslands([
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "0", "0", "0"],
  ]) === 1,
  "Should equal 1"
);
console.assert(numIslands([
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
])===3, "Should equal 3")
