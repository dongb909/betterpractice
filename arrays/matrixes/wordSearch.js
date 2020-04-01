/*Given a 2D board and a word, find if the word exists in the grid.

The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.

Example:

board =
[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]

Given word = "ABCCED", return true.
Given word = "SEE", return true.
Given word = "ABCB", return false.
 

Constraints:

board and word consists only of lowercase and uppercase English letters.
1 <= board.length <= 200
1 <= board[i].length <= 200
1 <= word.length <= 10^3 */

//SET GLOBAL BOOLEAN
var exist = function(board, word) {
  //count from 1 when first letter is found and increment with each next letter found
  if (board.length===0) return false;

  let visited=[];

  for(let i=0; i<board.length; i++){
    for(let j=0; j<board[0].length; j++){
      //first find first letter of word
      if (word.charAt(0)===board[i][j] && checkSurrounding(board, word, i, j, 0)){
        //then search its surrounding vertically and horizontally for the next letter
        return true;
        
      }
    }
    // if(i===board.length) return false;
  }
  
  return false;
};

  // if next letter is found then recurse with the next letter

let checkSurrounding=(board, word, row, col, index) =>{
  //if found the whole word then stop
  if (index===word.length){
    return true;
  }
  if (row<0 || col <0 || row >= board.length || col >= board[0].length || board[row][col]!==word.charAt(index) || visited[row][col]){
    return false;
  }
  // } else {   NOOO
  //   checkSurrounding(board, word, row+1, col, index+1);
  //   checkSurrounding(board, word, row-1, col, index+1);
  //   checkSurrounding(board, word, row, col+1, index+1);
  //   checkSurrounding(board, word, row, col-1, index+1);
  //if any of these are true


  if(checkSurrounding(board, word, row+1, col, index+1)||
    checkSurrounding(board, word, row-1, col, index+1)||
    checkSurrounding(board, word, row, col+1, index+1)||
    checkSurrounding(board, word, row, col-1, index+1)){
      return true;
  } 
    
  //Can't use the same letter index twice so turn that word to something else
  
  return false;

}

console.log(exist([
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
], "ABCB"))