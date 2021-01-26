/*class Solution {
    public int snakesAndLadders(int[][] board) {
        int N = 0;
        if ( (N = board.length) == 0 ) return 0;
        
        int[] nBoard = new int[N*N + 1];
        int t = 1;
        boolean left2right = true;
        for(int i = N - 1; i >= 0; i--) {
            if (left2right) {
                for(int j = 0; j < N; j++) nBoard[t++] = board[i][j];
            }else {
                for(int j = N - 1; j >= 0; j--) nBoard[t++] = board[i][j];
            }
            left2right = !left2right;
        }
        // System.out.println(Arrays.toString(nBoard));
        
        Queue<Integer> q = new LinkedList<>();
        q.add(1);
        int steps = 0;
        boolean[] visited = new boolean[N*N + 1];
        visited[1] = true;
        
        while(!q.isEmpty()){
            steps++;
            int curCnt = q.size();
            for(int i = 0; i < curCnt; i++) {
                int square = q.poll();
                for(int j = 1; j <= 6; j++) {
                    int next_square = square + j;
                    if (nBoard[next_square] != -1) next_square = nBoard[next_square];
                    if (visited[next_square]) continue;
                    
                    if (next_square == N*N) return steps;
                    visited[next_square] = true;
                    q.offer(next_square);
                }
            }
        }
        return -1;
    }
} */

const { formatResultsErrors } = require("jest-message-util");

var snakesAndLadders = function (board) {
  let flattenedBoard = convertBoardToArr(board);
  // console.log(flattenedBoard);
  return findMinHops(flattenedBoard);
};

function convertBoardToArr(board) {
  let n = board.length;
  // console.log(!n) //board is an n*n board so no need to do board[0].length
  // if (!n || board[0].length === 0) return null
  if (!n) return null;
  let flatBoard = new Array(n * n + 1); //add 1 because we're not using idx 0 so need to add another slot for the last item
  let left2Right = true;
  let flatIdx = 1; //filling out flat board starting at position 1
  for (let row = n - 1; row >= 0; row--) {
    //work backwards on the row
    if (left2Right) {
      for (let col = 0; col < n; col++) flatBoard[flatIdx++] = board[row][col];
    } else {
      for (let col = n - 1; col >= 0; col--)
        flatBoard[flatIdx++] = board[row][col];
    }
    left2Right = !left2Right;
    // console.log(left2Right)
  }
  return flatBoard;
}
function findMinHops(arr) {
  //now can just start at idx 1 bc array follows baord idx layout and values
  let visited = new Array(arr.length).fill(false);
  // console.log(arr, visited)
  let q = [1],
    currIdx,
    hop = 0; //bc it takes 0 hops to get to position 1. after position 1, you need another hop to get to 2 etc
  visited[1] = true;
  //starting at first idx of arr thus that index should already be considered visited, NOT passing the value here. but passing the idx number we're on to loop through or really the idx number we landed on after rolling our dice
  //iterate through full array, with each index, advance 6 times so loop 6 times through index to move forward
  //skip what already visited bc we care about the NUMBER of steps when we reach there NOT the value that we'd be advancing from
  while (q.length) {
    processingIdx = q.shift();
    //don't care about if already visted this idx, care about FROM THIS INDEX, HAVE WE VISITED ALL the way to sixed roll
    //rolling dice from this idx
    hop += 1; //we require 1 more hop to get to the next 6 positions
    for (let i = processingIdx + 1; i <= processingIdx + 6; i++) {
      //i is refering first to idx on boolean arr, then if haven't visited then refer to this idx in boardArr, based on that value check to see if at end, we're not replacing or editing ANYTHING except for the true or false arr
      //only if it's one we haven't visited, do we change the false to true
      //at end of loop, up hop count by 1 bc next loop through, only the ones that need to be processed are the ones that haven't been visited yet
      if (i === arr.length - 1) return hop; //if reached the ending idx, we're done
      if (visited[i]) continue; //if already visited then skip bc already can reach it with less hops
      //if not then mark it as visited since we're visiting now
      visited[i] = true;
      //check what value is there to see if we can jump ahead or not. don't care about jumping down bc those will be skipped since we can reach it with less steps still. ONLY care about snakes when checking to see if we can never reach the end of the game bc it's a loop (we'll know this if the q is empty since we only add things that we haven't visited to the q)
      if (arr[i] !== -1) {
        //we don't care about -1 bc we already marked it as true and processing now and move on
        //whether ladder or snake, doesn't matter, bc point is to add ALL idx we haven't visited to the q.
        //don't care to process the start idx of ladder bc you'll never actually land here. you'll always end up taking the ladder bc you have to anyways every time you land here.
        let jumpToIdx = arr[i]; //will give you the idx value to jump to from here so just jump there, add to q,
        // console.log(jumpToIdx, arr.length )
        //YOU MISSED THIS ENTIRELY. IF NEXT STEP GOES BEYOND THE BOARD THEN YOU DEFINITELY FINISHED THE GAME! REMEMBER, ARR VALUES INDICATE INDICE YOU'LL LAND ON NOTTTTTT HOW FAR YOU CAN JUMP NEXT aka not the number of jumps you can take from here. OR if jump to idx is the end, then return early
        if (jumpToIdx >= arr.length - 1) return hop;
        //should be arr.length -1 because of the extra spot at idx 0
        console.log(arr.length);
        q.push(jumpToIdx);
        // visited[jumpToIdx]   //DO NOT SET TO TRUE!!!! because we want that idx to be processed by the loop! that's it, let the q order take care of it, using it as a starting point
      }
    }
  }
  //if q is empty then we never reached the end without returning so there's a loop.
  return -1;
}

console.assert(
  //35 is not th end. end is 36
  snakesAndLadders([
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, 35, -1, -1, 13, -1],
    [-1, -1, -1, -1, -1, -1],
    [-1, 15, -1, -1, -1, -1],
  ]) === 4,
  "Should return 4"
);

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
// console.assert(
//     snakesAndLadders([
//         [[1,1,-1],[1,1,1],[-1,1,1]],
//     ]) === -1,
//     "Should return -1 bc there's a loop"
//   );
//   console.assert(
//     snakesAndLadders(
//       [[-1,1,2,-1],
//       [2,13,15,-1],
//       [-1,10,-1,-1],
//       [-1,6,2,8]],
//     ) === 2,
//     "Should return 2 "
//   );
// -tell me about yourself. walk through whole stroy as a pharmacist. take the experience in pharmacy to brnig it over the software
// -amt of years, where formatResultsErrors. //come off as confident. your character going through school.
//not the bootcamp and skills. but really about yourself. the pharmacist skills will be asked later. 3-4 sentence about yourself. Then expand depending on what they ask
//i'm from where i went to school. my last job and switched to hr and here ai am
//abc that were not working these are things i did to overcome it. by overcoming it ... technique, resources. not HOW would you handle it but WHAT did you do. ok to bring up old stuff. don't downplay. really just ask someone ask. so illustrate you are doing the right measure
//i went to this person and i understand i need to go through thiese things before i go up in the chain. so you couldn't set up your developments. what you did but didn't work,after not being able to , i got with this person. found issue, the result is now i can do this yadda.
//better to talk about nginx. more detail. who you asked. what issues you dealt with. different docs you went through. still coudln't find. stack overflow. so you're also knowledgable.
//set boundaries esp if someone's talking to me about their problem but I have a list of things to do, I feel bad about it but I learned that it's ok to say no or walk away when needed. as weakness. showing you are doing something like a rule and how your'e striving to walk away from ok.
//highlight the gap in btwn the cool things working on. don't say bootcamp.
//interested in teh CS side a continuous learner.
// structure and interprestion of cs
