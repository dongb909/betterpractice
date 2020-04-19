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
  // let visited = Array(rows).fill(Array(cols).fill(false));

  //will always need a nested forloop because need to go through whole matrix worst case
  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++){
      //see if the current el matches the first letter of the word, if not then don't even do anything
      // if (board[i][j] === word.charAt(0)){
      //   return search(board, word, i, j, index, visited);
      // }
      //OR
      if (board[i][j] === word[0] && search(board, word, i, j, 0)){
        return true;
      }
    }
  }
  return false;
}

function search (board, word, row, col, index) {
  //if current index is the length of word then we already found out word
  console.log(word[index])
  if(index === word.length) return true;
  //better to check chars right away and stop instead of going to the length next

  //check if is out of bounds, if already visited, if word char at index doesn't even equal to current char of board
  if (row < 0 || row >= board.length || col < 0 || col >= board[0].length ) return false;
  // if (board[row][col] === ) return false;
  if (word[index] !== board[row][col]) return false;
  // console.log(word[index])
  //set current location to true on boolean board since we're on it
  // console.log(visited, '1')
  board[row][col] = true;
  // console.log(visited, '2')
  //check all sides
  if (search(board, word, row + 1, col, index + 1) || 
      search(board, word, row - 1 , col, index + 1) ||
      search(board, word, row, col + 1, index + 1) ||
      search(board, word, row, col - 1, index + 1) ) {
    return true;
  }
  //reset the current location to false for the next round since the condition above returned false for all
  board[row][col] = word[index]; 
  
  // console.log(visited, '3')
  return false;

}


/*node redos.js 
S
S
false */

console.log(exist([
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
], "ABCCED"),  'wordsearchhhhhhh')


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

// console.log(searchMatrix(null, 23))


//================================================================================================
//================================================================================================
//================================================================================================
//isSubTree, both trees ARE NOT BST, are just binary trees therefore are not ordered
//also there MIGHT BE DUPLICATES IN TREE!!

class Node {
  constructor(val) {
    this.val = val
    this.right = this.left = null
  }
}

let s = new Node(3)
s.right = new Node(5)
s.left = new Node(4)
s.left.left = new Node (1)
s.left.right = new Node (2)


let t = new Node(4) 
t.left = new Node(1)
t.right = new Node(2)



// let result = null;

const isSubtree = (s, t) => { // boolean (true or false)
  if (!s||!t) return false;
  
  // //traverse s tree until see a node that has t root
  // let sNodeMatched = findMatchedNode(s, t); //returns a NODE, NOT A BOOLEAN
  // return !sNodeMatched ? false : compareTrees(sNodeMatched, t) //if node returned then compare the trees, if null returned the final return will be false else return if subtrees are equal
  if (compareNodes(s,t)) return true;
  return isSubtree(s.left,t) || isSubtree(s.right, t)

}

//this function only runs if the t root was found in s
//purpose is to compare two nodes, if equal then return true, if not then return false
//even when both trees hit the end, null === null is TRUE! it's only false for NaN
// function compareTrees (sNode, tNode) {
//   if (!sNode || !Node) return null; //will be returned to the parent node and compared to the parent node's other child on the LAST line
//   //base case is if nodes don't equal then return false and stop everything
//   if (sNode !== tNode) return false;
//   //recusive case is if nodes equal then you want to check both their children, don't have to write the condition because it's already passed all conditions to get to this line
//   return compareTrees(sNode.left, tNode.left) && compareTrees(sNode.right, tNode.right)   
//     

//********** NOOOOOOO can't do this. need to set the nulls as base cases! there can be more than 1 base case!

// }


//expecting true or false for EVERY RETURN so never return null , make null a separate base case
function compareTrees (sNode, tNode) {
  //you can have SEVERAL base cases but each one shold be written separately so it's more clean and understandable, less prone to bugs
  //both nodes are null so they equal, check this first
  if (!sNode && !tNode) return true;
  //if one is null, it wouldn't be both because that's already checked by the condition above, then they're not equal
  if (!sNode || !tNode) return false; //will be returned to the parent node and compared to the parent node's other child on the LAST line
  //or if both exists but values don't equal
  if (sNode.val !== tNode.val) return false;
  //recusive case is if nodes equal then you want to check both their children, don't have to write the condition because it's already passed all conditions to get to this line
  //this line will return true if both sides are equal, and false if even one of them return false
  return compareTrees(sNode.left, tNode.left) && compareTrees(sNode.right, tNode.right)   
 

}

// console.log(isSubtree(s,t))
//NOTE: THERE ARE NO WHILE LOOPS NOR FORLOOPS IN RECURSIONS!!




// ?????????????[1,1]
// [1] is false


//================================================================================================
//================================================================================================
//================================================================================================
//isBALANCED












//================================================================================================
//================================================================================================
//================================================================================================
//MAX DEPTH OF TREE