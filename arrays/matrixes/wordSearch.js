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
var exist = function (board, word) {
  //from when first letter is found and return true with each next letter found, don't do by substrings or else time complexity is longer
  if (board.length === 0) return false;
  let visited = Array(board.length)
    .fill()
    .map(() => Array(board[0].length).fill(false)); //DON'T want to make any changes to the original board because you might HAVE TO back track etc, not like counting islands problem where you could just change 1s to 0s so you don't backtrack
  //.fill() will just create an empty space aka a bunch of undefines
  // console.log(visited)
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      //first find first letter of word
      if (
        word.charAt(0) === board[i][j] &&
        checkSurrounding(board, word, i, j, 0, visited)
      ) {
        //index for the current index of the word , WANT TO START CHECKING SURROUNDING AT INDEX 0 NOT 1 BECAUSE YOUR FIRST CHECK AT INDEX 0 IS JUST FOR THAT CHAR, BUT THERE'S NO WAY FOR YOU TO EXPAND OUT FROM THAT ZERO AND JUST JUMP TO INDEX 1 SINCE YOU DON'T KNOW IN WHICHI DIRECTION INDEX 1 MATCHES. i j here just looks for the FIRST letter of the word. it doesn't help with expanding unless you use the helper function.
        //then search its surrounding vertically and horizontally for the next letter
        return true;
      }
    }
    // if(i===board.length) return false;
  }

  return false;
};

// if next letter is found then recurse with the next letter

let checkSurrounding = (board, word, row, col, index, visited) => {
  //if found the whole word then stop, index will be byond the last letter, you just won't be even checking the letter at this index because it will be undefined since str already ended so just return, don't want to do it at last iteration because you have to complete the letter comparison, this is just the base case
  if (index === word.length) return true;
  console.log(visited);
  if (
    row < 0 ||
    col < 0 ||
    row >= board.length ||
    col >= board[0].length ||
    board[row][col] !== word.charAt(index) ||
    visited[row][col]
  )
    return false; //CHECK BOUNDARIES
  // } else {   NOOO
  //   checkSurrounding(board, word, row+1, col, index+1);
  //   checkSurrounding(board, word, row-1, col, index+1);
  //   checkSurrounding(board, word, row, col+1, index+1);
  //   checkSurrounding(board, word, row, col-1, index+1);
  //if any of these are true
  visited[row][col] = true;
  if (
    checkSurrounding(board, word, row + 1, col, index + 1, visited) || //it will COMPLETE THIS ALL THE WAY FIRST
    checkSurrounding(board, word, row - 1, col, index + 1, visited) || //THEN GO TO THIS, BUT BEFORE going here, it will reset the boolean values of visited before coming back to this stack frame since working on the SAME reference
    checkSurrounding(board, word, row, col + 1, index + 1, visited) ||
    checkSurrounding(board, word, row, col - 1, index + 1, visited)
  ) {
    return true;
  }
  visited[row][col] = false;
  //Can't use the same letter index twice so turn that word to something else

  return false;
};

console.log(
  exist(
    [
      ["A", "B", "C", "E"],
      ["S", "F", "C", "S"],
      ["A", "D", "E", "E"],
    ],
    "ABFDEE"
  )
);
