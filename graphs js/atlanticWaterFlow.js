/*MEDIUM
Given an m x n matrix of non-negative integers representing the height of each unit cell in a continent, the "Pacific ocean" touches the left and top edges of the matrix and the "Atlantic ocean" touches the right and bottom edges.

Water can only flow in four directions (up, down, left, or right) from a cell to another one with height equal or lower.

Find the list of grid coordinates where water can flow to both the Pacific and Atlantic ocean.

Note:

The order of returned grid coordinates does not matter.
Both m and n are less than 150.
 

Example:

Given the following 5x5 matrix:

  Pacific ~   ~   ~   ~   ~   //IGNORE THE WAVES, JUST KNOW THAT ALL SIDES CAN REACH THE WAVE BC WILL BE > MIN VAL
       ~  1   2   2   3  (5) *  //( ) are the ones the meet the criteria
       ~  3   2   3  (4) (4) *
       ~  2   4  (5)  3   1  *
       ~ (6) (7)  1   4   5  *
       ~ (5)  1   1   2   4  *
          *   *   *   *   * Atlantic

Return:

[[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]] (positions with parentheses in above matrix). */
// we're going to go from outwards in. so as we go in, the number must be greater than our prev. instead of goinging from inside out which would be harder

var pacificAtlantic = function (matrix) {
  //create trackers for both oceans
  if (!matrix.length || !matrix[0].length) return [];
  const rows = matrix.length;
  const cols = matrix[0].length;
  const pacific = new Array(rows).fill(null).map(() => new Array(cols).fill(0));
  const atlantic = new Array(rows)
    .fill(null)
    .map(() => new Array(cols).fill(0));
  //iterate through top of pacific, and bottom of atlandtic
  for (let col = 0; col < cols; col++) {
    dfs(matrix, 0, col, Number.MIN_VALUE, pacific); //want to check across starting with top row 0
    dfs(matrix, rows - 1, col, Number.MIN_VALUE, atlantic); //want to check across starting with bottom row
  }
  //iterate through left of pacific and right of atlantic
  for (let row = 0; row < rows; row++) {
    dfs(matrix, row, 0, Number.MIN_VALUE, pacific); //want to check vertically starting with first col 0
    dfs(matrix, row, cols - 1, Number.MIN_VALUE, atlantic); //want to check vertically starting with last col
  }
  //iterate through both trackers, whichever position both has 1 aka is reachable then add coordinate to final nested arr
  const reachableCoords = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (pacific[row][col] === 1 && atlantic[row][col] === 1)
        reachableCoords.push([row, col]);
    }
  }
  return reachableCoords;
};

const dfs = (matrix, row, col, prevVal, ocean) => {
  if (
    row < 0 ||
    row >= matrix.length ||
    col < 0 ||
    col >= matrix[0].length ||
    matrix[row][col] < prevVal
  )
    return; //going from outside in so current num needs to be >= prev to reach ocean
  if (ocean[row][col] === 1) return; //break out if already processed this location
  ocean[row][col] = 1;
  dfs(matrix, row + 1, col, matrix[row][col], ocean);
  dfs(matrix, row - 1, col, matrix[row][col], ocean);
  dfs(matrix, row, col + 1, matrix[row][col], ocean);
  dfs(matrix, row, col - 1, matrix[row][col], ocean);
};

console.log(
  pacificAtlantic([
    [1, 2, 2, 3, 5],
    [3, 2, 3, 4, 4],
    [2, 4, 5, 3, 1],
    [6, 7, 1, 4, 5],
    [5, 1, 1, 2, 4],
  ])
);
//[[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]

console.log(
  pacificAtlantic([
    [3, 3, 3],
    [3, 1, 3],
    [0, 2, 4],
  ])
);
//[[0,0],[0,1],[0,2],[1,0],[1,2],[2,0],[2,1],[2,2]] //missing [2,0], [2,1]
