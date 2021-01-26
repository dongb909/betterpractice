


//IGNORE THIS FILE


/*Medium
On an N x N board, the numbers from 1 to N*N are written boustrophedonically starting from the bottom left of the board, and alternating direction each row.  For example, for a 6 x 6 board, the numbers are written as follows:
You start on square 1 of the board (which is always in the last row and first column).  Each move, starting from square x, consists of the following:

You choose a destination square S with number x+1, x+2, x+3, x+4, x+5, or x+6, provided this number is <= N*N.
(This choice simulates the result of a standard 6-sided die roll: ie., there are always at most 6 destinations, regardless of the size of the board.)
If S has a snake or ladder, you move to the destination of that snake or ladder.  Otherwise, you move to S.
A board square on row r and column c has a "snake or ladder" if board[r][c] != -1.  The destination of that snake or ladder is board[r][c].

Note that you only take a snake or ladder at most once per move: if the destination to a snake or ladder is the start of another snake or ladder, you do not continue moving.  (For example, if the board is `[[4,-1],[-1,3]]`, and on the first move your destination square is `2`, then you finish your first move at `3`, because you do not continue moving to `4`.)

Return the least number of moves required to reach square N*N.  If it is not possible, return -1.

Example 1:

Input: [
[-1,-1,-1,-1,-1,-1],
[-1,-1,-1,-1,-1,-1],
[-1,-1,-1,-1,-1,-1],
[-1,35,-1,-1,13,-1],
[-1,-1,-1,-1,-1,-1],
[-1,15,-1,-1,-1,-1]]
Output: 4
Explanation: 
At the beginning, you start at square 1 [at row 5, column 0].
You decide to move to square 2, and must take the ladder to square 15.
You then decide to move to square 17 (row 3, column 5), and must take the snake to square 13.
You then decide to move to square 14, and must take the ladder to square 35.
You then decide to move to square 36, ending the game.
It can be shown that you need at least 4 moves to reach the N*N-th square, so the answer is 4.
Note:

2 <= board.length = board[0].length <= 20
board[i][j] is between 1 and N*N or is equal to -1.
The board square with number 1 has no snake or ladder.
The board square with number N*N has no snake or ladder. */

//Step 1: convert to an array of numbers for better understanding
//create a 1D array from the 2D array so instead of n^2, we're working with just n.
//every cell that doesn't have a snake or ladder, set to -1, if ladder, then put number that it leads to
//if snake then put number it goes back to
//total number of moves from our dice is 1-6
//always starting at the first position so if add 6 then your position is 7, not 6
//DON'T HAVE TO WORRY ABOUT WHAT'S A SNAKE/LADDER BECAUSE THE INPUT MATRIX ALREADY SET THE FINAL VALUE FOR YOU AND THE -1. YOU JUST HAVE TO NOW MAKE THE EXACT VALUES INTO AN ARRAY SO IT'S EASIER TO IMPLEMENT THE REST OF THE LOGIC
//Step 2: use a queue that keeps track of (index, #ofHopsToGetToThisIndx)
//first in queue is (1, 0) //index aka position starts at 1 so when calculate, you really actually want to do 1-1 wince array indeces start at 0 and number of jumps to get here is 0
// OR! you can do queue is (0,0) but the thing is, the value at the index is already set for you as 1 based on the original matrix
//But the thing is, you can ignore the 0 and just start at 1 because you WILL NOT be interacting with the array itself much anyways
//number you're keeping track of for the position is the ENDING /FINAL position. so if at idx 3 and its value is 16 then keep the 16 instead of the 3, while all th eother ones, if idx value is -1 then keep the idx itself instead of the value -1
// 3)keep track of what already visited. As you visit each idx, add to queue
// 4)iterate up til 6 possible positions, while adding to queue, then start deququeing 6 times. Your number of hops stay the same for 6 rolls
// 5)as you dequeue, roll dice 6 times for 6 positions and add to queue, then dequeue the next one, keeping only the min number of rolls
//but SKIP the positions that's already been visited bc it's already going to have the min jump, and only enqueue the ones you haven't visited
// 6)keep going until you hit the end of the matrix aa arr
// 7)return the minimum hop you end up with when reaching the end of the matrix

var snakesAndLadders = function (board) {
  let flattenedBoard = convertBoardToArr(board);
  // console.log(flattenedBoard);
  return findMinHops(flattenedBoard);
};

function convertBoardToArr(board) {
  //CAREFULY!!! 0,0 on this board is the first el of the matrix but is the upper left hand corner
  //we want to start from lower left hand corner and move to the upper left and corner in a ZIGZAG order!!!!!
  let flattenedBoard = [0]; //START WITH 0 SO LATER WHEN USED, CAN JUST START AT IDX 1 FOR CORRECT POSITIONING
  let currRow = board.length - 1; //NO!!! START WITH LAST ROW INDEX FIRST BECAUSE THAT'S HOW YOU WANT THE ORDER TO BE
  let arrRow = 0; //set counter so it's easier to do the while loop
  let colStart = 0;
  let colEnd = board[0].length - 1;
  while (arrRow < board.length) {
    // if (currRow % 2 === 0) { NO GUARANTEE HOW BIG MATRIX WILL BE, STARTING AT END OF MATRIX FROM BOTTOM
    //push numbers in that row into arr from left to right
    if (arrRow % 2 === 0) {
      while (colStart <= colEnd) {
        flattenedBoard.push(board[currRow][colStart++]);
      }
      colStart = 0; //reset col start since it never changes, was just incrementing it for iteration
    } else {
      //else it's an odd row so add from right to left
      while (colEnd >= 0) {
        flattenedBoard.push(board[currRow][colEnd--]);
      }
      colEnd = board[0].length - 1;
    }
    arrRow++;
    currRow--;
  }
  // console.log(flattenedBoard.length);
  return flattenedBoard;
}

function findMinHops(arr) {
  let visited = new Array(arr.length).fill(false); //create a set but that's not a constant
  //add first cell to queue. Right now it's just an matrix with a number, need to convert it to a cell with new properties such as final position number and hops
  let q = [new Cell(1, 0)]; //now working with array not the matrix no more NOT WORKING WITH INDEX 0!!!!!! BC POSITION IS BASED OFF OF ARR INDEX NUMBER. THE BOARD DOESN'T GIVE YOU THAT. JUST GIVES YOU -1 AND SNAKES/LADDER VALUES
  let newCell, currCell, idx;
   visited[1] =true
  //we iterate q until it's empty
  while (q.length > 0) {
    currCell = q.shift();
    console.log(currCell);
    idx = currCell.position;
    console.log(q)
    if (idx === arr.length - 1) return currCell.hops;
    //iterate through each possible dice roll for this particular position
    for (let idxAfterRoll = idx + 1; idxAfterRoll <= idx + 6; idxAfterRoll++) {
      if (idxAfterRoll === arr.length) break; //check boundary
      //if already visited then don't need to visit again, because each loop through dice roll is 1 hop, we can already reach this cell with LESS hops so we don't want to update its current values with longer hops
      if (!visited[idxAfterRoll]) {
        // visited[idxAfterRoll] = new Cell(   NO!! don't set the cell like this because the final position for cell.position is NOT idxAfterRoll, it's only position after roll if the cell's value = -1. else you have to jump to that cell value
        newCell = new Cell();
        newCell.hops = currCell.hops + 1; //NOTE: NOT setting position until check if snake or ladder first
        visited[idxAfterRoll] = true;
        //   idxAfterRoll,
        //   currCell.hops + 1
        // );//SET TO NEW CELL on ARR, NOT on VISITED. THERE ARE 2 different arrays here that we're working with. to true.
        if (arr[idxAfterRoll] !== -1) {
          newCell.position = arr[idxAfterRoll]; //set newcell position to the value at this idx on original arr
          // visited[idxAfterRoll]//set that FINAL position to be visited so next time a new cell and addd hop number won't be created but will be working with an old cell instead
        }
        //check if snake or lader first before updating position
        else newCell.position = idxAfterRoll;
        q.push(newCell); //we're not replacing index value with anything. just creating new cells and adding to q
      }
      //don't need an else. if it's already been visited then just skip is fine
    }
    // just return when arr.length is reached which is the last newCell created. no need to process remaining q
  }
  // console.log(q)
  return newCell.hops;
}

class Cell {
  constructor(position, hops) {
    this.position = position;
    this.hops = hops;
  }
}
// 
// console.assert(
//   snakesAndLadders([
//     [-1, -1, -1, -1, -1, -1],
//     [-1, -1, -1, -1, -1, -1],
//     [-1, -1, -1, -1, -1, -1],
//     [-1, 35, -1, -1, 13, -1],
//     [-1, -1, -1, -1, -1, -1],
//     [-1, 15, -1, -1, -1, -1],
//   ]) === 4,
//   "Should return 4"
// );
// 
// console.assert(
//   snakesAndLadders([
//     [-1, -1],
//     [-1, 3],
//   ]) === 1,
//   "Should return 1"
// );
// console.assert(
//   snakesAndLadders([
//     [-1, 7, -1],
//     [-1, 6, 9],
//     [-1, -1, 2],
//   ]) === 1,
//   "Should return 1"
// );
console.log(
  snakesAndLadders(

    [[1,1,-1],[1,1,1],[-1,1,1]]))


function(){
  fsdfs

}
