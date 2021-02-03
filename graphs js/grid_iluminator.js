/*You are given a grid of size N x N, and each cell of this grid has a lamp that is initially turned off.

You are also given an array of lamp positions lamps, where lamps[i] = [rowi, coli] indicates that the lamp at grid[rowi][coli] is turned on. When a lamp is turned on, it illuminates its cell and all other cells in the same row, column, or diagonal.

Finally, you are given a query array queries, where queries[i] = [rowi, coli]. For the ith query, determine whether grid[rowi][coli] is illuminated or not. After answering the ith query, turn off the lamp at grid[rowi][coli] and its 8 adjacent lamps if they exist. A lamp is adjacent if its cell shares either a side or corner with grid[rowi][coli].

Return an array of integers ans, where ans[i] should be 1 if the lamp in the ith query was illuminated, or 0 if the lamp was not.

 

Example 1:


Input: N = 5, lamps = [[0,0],[4,4]], queries = [[1,1],[1,0]]
Output: [1,0]
Explanation: We have the initial grid with all lamps turned off. In the above picture we see the grid after turning on the lamp at grid[0][0] then turning on the lamp at grid[4][4].
The 0th query asks if the lamp at grid[1][1] is illuminated or not (the blue square). It is illuminated, so set ans[0] = 1. Then, we turn off all lamps in the red square.

The 1st query asks if the lamp at grid[1][0] is illuminated or not (the blue square). It is not illuminated, so set ans[1] = 0. Then, we turn off all lamps in the red rectangle.

Example 2:

Input: N = 5, lamps = [[0,0],[4,4]], queries = [[1,1],[1,1]]
Output: [1,1]
Example 3:

Input: N = 5, lamps = [[0,0],[0,4]], queries = [[0,4],[0,1],[1,4]]
Output: [1,1,0]
 

Constraints:

1 <= N <= 109
0 <= lamps.length <= 20000
lamps[i].length == 2
0 <= lamps[i][j] < N
0 <= queries.length <= 20000
queries[i].length == 2
0 <= queries[i][j] < N */

/**
 * @param {number} N
 * @param {number[][]} lamps
 * @param {number[][]} queries
 * @return {number[]}
 */
var gridIllumination = function(N, lamps, queries) {
    const result = []
    const lampSet = new Set()
    if (N === 0) return result
    const lit = new Array(N).fill(null).map(()=> new Array(N).fill(0))

    //liuminate all cells in way of lamps
    lamps.forEach(([row, col])=>{
      luminate(N, lit, row, col)
      lampSet.add(""+row+col)
    })
    // console.log(lit)
    //check query cell, turn off any lamp in vicinity
    queries.forEach(([row,col])=>{
      result.push(lit[row][col] > 0 ? 1:0) //or "light, dark" if on hackerrank
      turnOff(N, lit, row, col)
    })

    //check if cell is still luminated by another lamp

    //add to results
    };
    
    //light up other cells even diagonally. NOT RECURSIVE!! or else ALL CELLS will light up
// function luminDiag(N, lit, row, col){
//   //check boundaries
//   if(row < 0 || col < 0 || row >= N || col >=N) return
//   // increment count for this cell //non 0s means its lit
//   lit[row][col]++
//   luminDiag(N, lit, row, col)
//   luminDiag(N, lit, row, col)
//   luminDiag(N, lit, row, col)
//   luminDiag(N, lit, row, col)
// 
// }

function luminate(N, lit, row, col){
  //light up row and col
  for(let i = 0; i < N; i++){
    lit[row][i]++
    lit[i][col]++
  } //this will cause current cell to be 2 so just minus 1
  lit[row][col]--
  //light up diag downright
  let rowDiag = row
  let colDiag = col
  console.log(row, col)
  while(!(rowDiag < 0 || colDiag < 0 || rowDiag >= N -1 || colDiag >= N-1 )) {
    lit[++rowDiag][++colDiag]++

  }
  //up left
  rowDiag = row
  colDiag = col
  while(!(rowDiag < 1 || colDiag < 1 || rowDiag >= N || colDiag >= N)) {
    lit[--rowDiag][--colDiag]+=1
  }
  //up left
  rowDiag = row
  colDiag = col
  while(!(rowDiag < 1 || colDiag < 0 || rowDiag >= N || colDiag >= N - 1)) {
    lit[--rowDiag][++colDiag]++
  }
  //down left
  rowDiag = row
  colDiag = col
  while(!(rowDiag < 0 || colDiag < 1 || rowDiag >= N - 1|| colDiag >= N - 1)) {
    lit[++rowDiag][--colDiag]+=1
  }
}

function deluminate(N, lit, row, col){
  for(let i = 0; i < N; i++){
    lit[row][i]--
    lit[i][col]--
  } //this will cause current cell to be 2 so just minus 1
  lit[row][col]++
  //light up diag downright
  let rowDiag = row
  let colDiag = col
  console.log(row, col)
  while(!(rowDiag < 0 || colDiag < 0 || rowDiag >= N -1 || colDiag >= N-1 )) {
    lit[++rowDiag][++colDiag]--

  }
  //up left
  rowDiag = row
  colDiag = col
  while(!(rowDiag < 1 || colDiag < 1 || rowDiag >= N || colDiag >= N)) {
    lit[--rowDiag][--colDiag]--
  }
  //up left
  rowDiag = row
  colDiag = col
  while(!(rowDiag < 1 || colDiag < 0 || rowDiag >= N || colDiag >= N - 1)) {
    lit[--rowDiag][++colDiag]--
  }
  //down left
  rowDiag = row
  colDiag = col
  while(!(rowDiag < 0 || colDiag < 1 || rowDiag >= N - 1|| colDiag >= N - 1)) {
    lit[++rowDiag][--colDiag]++
  }
}

function turnOff(N, lit, row, col){
  if(row < 0 || col < 0 || row >= N || col >=N) return true
  return false
}


console.log(gridIllumination(6, [[3,3], [0,0]]))