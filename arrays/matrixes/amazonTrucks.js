/* Amazon plans to open Treasure Truck pop-ups in the park areas of Technicia. Technicia is represented as a grid of M*N blocks. each block represents either a park (1) or commericial area(0). Adj blocks with val 1 are considered contiguous parks (LR, UD), not diagonal. a park by itself is also contiguous. Count number of contiguous parks
3 inputs (row, col, grid)
output = number of parks
1,1,0,0
0,0,1,0
0,0,0,0
1,0,1,1
1,1,1,1
answer = 3 */
//don't care about 0s so can skip over
// the rest of the 1s won't even be looked at if it's linked to the one before it because will be turned to 0s
//keep a counter for islands

function numberTreasureTrucks(rows, columns, grid) {
  //go through each coloumn of each row 
  //if there's a 1 then look upbove it, below, left and right
  //make sure is not out of bounds
  if (grid.length !==rows || grid === null ||grid.length === 0) return 0;
  let count = 0;
  for (let row = 0; row<rows; row++) {
    for (let col = 0; col<columns; col++){  //when encounter 0, won't visit again and in worst case then entire matrix is 1 so entire matrix will be converted to 0 in 1 go so it's s
      if (grid[row][col]===1){              //but every other cell won't have another m*n again bc everything was converted to 0 anyways so it's not possible
        count+=1;
        checkAndCancelSurroundings(row, col, grid); //and then do count= because the 2 counts are different, because it's not a pointer based one. 
        //grid is a ppointers to Array, but integers or strings? / native datatypes are copletely a different one. 
      }
    }
  }
  return count
}
function checkAndCancelSurroundings(row, col, grid){
  //check if current index is out of bounds, if is then do nothing and don't check it
  if (row <0 || row>=grid.length || col<0 || col>=grid[row].length || grid[row][col]===0)return; //This is last because if it's out of bounds then it would be undefined. not 0
  else {
    //if not then if it's a 1 then change it to 0
      grid[row][col] = 0;
      checkAndCancelSurroundings(row,col-1,grid); //check left
      checkAndCancelSurroundings(row,col+1,grid);//right
      checkAndCancelSurroundings(row-1,col,grid);//above
      checkAndCancelSurroundings(row+1,col,grid);//below
      return ;
  }
}
// let matrix= [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]

console.log(numberTreasureTrucks(4,5,[[1,1,1,1,0],[1,1,0,1,0],[1,1,0,0,0],[0,0,0,0,0]]))
//   [[1,1,0,0],
// [0,0,1,0],
//   [0,0,0,0],
//   [1,0,1,1],
//   [1,1,1,1]]))

//time: O(mn), you're just going visit a place once O(mn), worst case 2(mn)
//space: O(1)


// make new matrix or in place
/*if new matrix for tracking then visited then space O(1)
 */
// backtracking: mn*mn
