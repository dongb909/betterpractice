//unique pairs, return arr of arrs, can be negative nums ?
/*function twoSum (arr, target){
  let unique = new Set(); //save the difference
  let saveEl = new Map(); //save the element as key, index as value
  let result = []
  let diff;

  for (let i = 0; i < arr.length; i++){
    diff = target - arr[i]; //doesn't matter if it's neg or pos since would be looking for the diff of that same value
    console.log(unique)
    if (!unique.has(diff) && saveEl.has(diff)) {
      //if set already has the difference that means we already found the matching pair in the orig arr
      //we only add to set if the diff hasn't been found in the orig arr
      // result = result.concat(diff, arr[i]) //this will merge arrays to 1
      // result = result.concat([diff, arr[i]]) //this will create merged arrays too same as above
      result.push([diff, arr[i]]) //CAN TOTALLY push an array instead of concatenating
      unique.add(diff).add(arr[i])

    }
    //add each el to obj, overwrite if duplicate to make it easier instead of conditions
    saveEl.set(arr[i],i)    //BE CAREFULE, IF USE MAP MUST USE .SET and .HAS METHODS not saveEl[arr[i]]
    //don't add diff to set yet because we only want to add when we find the diff in the map
  }
  return result
  //return [...unique]// NO BECAUSE WANT NESTED ARRAY FOR THE PAIRS
  //thus ok to reset same el value to a different index in map
  //and ok to add same 2 values to set since nothing will happen if values are already there
}


console.log(twoSum([1, 1, 2, 45, 46, 46], target = 47))
*/
/*iteration |  el   | diff  |   set |   map
  0           1       46        {}      {1:0}    
  1           1       46        {}      {1:1}
  2           2       45        {}      {1:1, 2:2}
  3         45        2     found diff in map so set set    {45, 2} then add current el to map {1:1, 2:2, 45:3}
  4         46        1         {45,2,46,1} {1:1,2:2,45:3, 46:4}
  5         46q       1         add again to set but it's ok because nothing will happen since it's in set already


*/






//================================================================================================
//================================================================================================
//================================================================================================


//there's only 1 pair that adds up to target

/*
function twoSum (arr, target){
  let set = new Set();
  //or can use a map and just rewrite the key values if duplicate, the index isn't used to it doesn't matter anyways
  let diff;
  for (i = 0; i < arr.length; i++) {
    diff = target - arr[i];
    if (set.has(diff)) return [diff, arr[i]]
    set.add(arr[i])
  }
  return []
}

console.log(twoSum([0,0,0], target = 0))

*/



//================================================================================================
//================================================================================================
//================================================================================================


//return UNIQUE triplets who's sum is 0 

// Given array nums = [-1, 0, 1, 2, -1, -4],

// A solution set is:
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]



function threeSum (arr){
  //check to see if arr is null or if it's < 3 el since we're looking to return triplets so anything less won't matter
  let result = []
  if(arr.length < 3) return result
  //we want 3 pointers for each item in the triplet
  //there's no choice but to sort it so that you know how to move the arrows left or right depending on the sum
  // *****************************
  // ******************************
  let sorted = arr.sort((a,b) => {return a-b})
    // *****************************  DON'T SKIP THIS SORTING STEP AND REMMEBER TO RETURN!!
  // ******************************
  //don't even think about creating a 2 sum function first, it's too complicated
  //just add all three at once using the most left pointer as the iterator
  //make mid pointer the next left and right pointer the end of the list

  for (let a = 0; a < sorted.length - 2; a ++ ){   //< not equal to the 2nd to last means that it'll be the 3rd to last
    //don't create another for loop, just create pointers and use a while loop to not have it be n2
    let b = a+1;
    let c = sorted.length-1;
    if (sorted[a] > 0 || sorted[a] < 0 && sorted[c] <= 0) return result;    //no point in adding positive numbers if you're looking for the sum to be 0
    // let sum = a + b + c // NO DONT DO THIS because you'll have to add them again later anyways since b and c changes in the while loops
    //if sum not equal to 0 then will not enter this if block and will skip to while loop
    //BRUTE FORCE HERE
    if (sorted[a] === 0 && sorted[c] ===0 ) {     //there would never be a case of 1,1,1 or anything bc sum won't equal 0
      result.push([0,0,0])
      return result;
    }
//***************************************************************
//***************************************************************
    while(b < c && sorted[a] !== sorted[a-1]) { //prevent duplicate by not letting the first number be the same as the previous first number
      //the reason why you have [-1,-1,2] is bc the first run, -1 != 4, so b and c and set after a is ok to go
      // the reson why you have [-1,0,1] THE -1, is from the SAME A as [-1,-1,2], it's just after the b and c changed locations!! the -1 is NOT from a DIFFERENT index
      //therefore BOTH the first number is from the SAME index a of the original sorted arr
//***************************************************************
//***************************************************************
      if (sorted[a] + sorted[b] + sorted[c] === 0) {
        result.push([sorted[a], sorted[b], sorted[c]]);
        //move both b and c inwards 
        b++;
        c--;
        //this block won't loop but the new b and c will be evaluated again in the while loop below
      }
      //if pos then will enter loop, if not then will enter the neg while loop
      if (sorted[a] + sorted[b] + sorted[c] > 0) {
        c--
      }

      if (sorted[a] + sorted[b] + sorted[c] < 0) {
        b++
      }

    }

  }
  return result

}

// console.log(threeSum([-1, 0, 1, 2, -1, -4]))
// console.log(threeSum([0, 0, 0, 0, 0]))


/*let input = [-1, 0, 1, 2, -1, -4]
let sortedInput = [-4, -1, -1, 0, 0, 1, 2]
                    a  b                c  (input[a] + input[b]) => (-5 + 2) => -3
                       a    b           c  -2 + 2 => 0
                       a    b        c     -2 + 1 => -1
                       a       b        c  -1 + 2 => 1
                       a       b     c     -1 + 1 => 0 

*/






//================================================================================================
//================================================================================================
//================================================================================================


//return the flatten matrix in spiral order clockwise

function spiralMatrix (matrix){
  let result = [];
  if (matrix.length === 0) return result;

  let topRow = 0;
  let bottomRow = matrix.length-1;
  let startColumn = 0;
  let endColumn = matrix[0].length - 1;

  //***************** 
  //****************** must be <= not just < and must be && not ||
  while (topRow <= bottomRow && startColumn <= endColumn) {
  //***************** 
  //****************** 

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

    if(topRow <= bottomRow) {
      for (let col = endColumn; col >= startColumn; col--) {
        result.push(matrix[bottomRow][col]);
      }
      //done with last row so update the row to the next level up towards center
      bottomRow--;
    }

    if(startColumn <= endColumn) {
      //now move up each row in the starting column (col stays same)
      for (let row = bottomRow; row >= topRow; row--) {  //BE CAREFUL OF THE CONDITIONALS! > vs <
        result.push(matrix[row][startColumn]);
      }
      //done with most left col now move into center
      startColumn++;

    }
  }
  return result
}

// console.log(spiralMatrix([
//   [ 1, 2, 3 ],
//   [ 4, 5, 6 ],
//   [ 7, 8, 9 ]
//  ]))





//================================================================================================
//================================================================================================
//================================================================================================
//matrix word search

/*board =
[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]

Given word = "ABCCED", return true.
Given word = "SEE", return true.
Given word = "ABCB", return false.
*/

var exist = function(board, word) {
  //create reflective boolean matrix all set to false
  let rows = board.length;
  let cols = board[0].length;
  let visited = Array(rows).fill(Array(cols).fill(false));

  //will always need a nested forloop because need to go through whole matrix worst case
  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++){
      //see if the current el matches the first letter of the word, if not then don't even do anything
      // if (board[i][j] === word.charAt(0)){
      //   return search(board, word, i, j, index, visited);
      // }
      //OR
      if (board[i][j] === word[0] && search(board, word, i, j, 0, visited)){
        return true;
      }
      
    }
  }
  return false;

}



function search (board, word, row, col, index, visited) {
  //if current index is the length of word then we already found out word
  if(index === word.length) return true;

  //check if is out of bounds, if already visited, if word char at index doesn't even equal to current char of board
  if (row < 0 || row >= board.length || col < 0 || col >= board[0].length || word[index] !== board[row][col] || visited[row][col]) return false;
  console.log(word[index])
  //set current location to true on boolean board since we're on it
  // console.log(visited[row][col], '1')
  visited[row][col] = true;
  // console.log(visited[row][col], '2')
  //check all sides
  if (search(board, word, row + 1, col, index + 1, visited) || 
      search(board, word, row - 1 , col, index + 1, visited) ||
      search(board, word, row, col + 1, index + 1, visited) ||
      search(board, word, row, col - 1, index + 1, visited) ) {
    return true;
  }
  //reset the current location to false for the next round since the condition above returned false for all
  visited[row][col] = false; 
  // console.log(visited[row][col], '3')
  return false;

}


/*node redos.js 
S
S
false */

// console.log(exist([
//   ['A','B','C','E'],
//   ['S','F','C','S'],
//   ['A','D','E','E']
// ], "SEE"))


//================================================================================================
//================================================================================================
//================================================================================================
//search 2d matrix for num
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

//note: num INC with row ++
      //num DEC with row --
      //num INC with col ++
      //num DEC with col -- 
      //start at corner but don't start at corner with all sides dec or all sides inc
      //don't start at 1 nor 30
      //start at 15 or 18

var searchMatrix = function(matrix, target) {
  if(!matrix || matrix.length === 0 || matrix[0].length === 0) return false;
  //don't even bother with forloops, just do while loops and increment
  let row = 0; //we're looking at 15 
  let col = matrix[0].length-1;
    //DON'T NEED TO CHECK ALL 4 SIDES BECAUSE YOU'RE ONLY EVER GOING TO HAVE IT GO LEFT OR GO DOWN. NEVER THE REVERSE BECAUSE EACH ROW IS SORTED 
    //you have hard set boarders so just make sure that your row and cols are valid first
    //don't put if matrix !== target because it will complicate things
  while (row < matrix.length && col >= 0) {
    if (matrix[row][col] === target) return true;
    if (matrix[row][col] > target) {
      //move left along row
      col--
    } else {
      row++
    }
  }
  return false
}

console.log(searchMatrix(null, 23))


//================================================================================================
//================================================================================================
//================================================================================================
//isSubTree