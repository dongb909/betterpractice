/*
In a given grid, each cell can have one of three values:

the value 0 representing an empty cell;
the value 1 representing a fresh orange;
the value 2 representing a rotten orange.
Every minute, any fresh orange that is adjacent (4-directionally) to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange.  If this is impossible, return -1 instead.

Example 1:

Input: [[2,1,1],        fresh set = {loc1, loc2, loc3}
                        rotten set = {loc} ? => i = row and j = col
                        if rooten set size = 0 return -1
        [1,1,0],        
                        while still have fresh oranges , if no more fresh oranges return seconds it took 
        [0,1,1]]
        //go through matrix once to see # of fresh orange.
        //find fastest way to find adj oranevs from rotten , best is to use bfs
        //as i'm traversing and infecting other oranges, i'll keep track of how many secs have elasped
        //return -1 if still have fresh oranges, otherwise return time dlasped
        //DO NOT HAVE TO GO THROUGH IMPLEMENTATION!!!!!!
        //EXPLORE CORNER CASES BEFORE CODING: CRATE WITH NO ORANGES, NO ROTTEN ORANGES AT ALL?, ALL ROTTEN, HOW MANY ROTTEN ORRANGES IT STARTS WITH, DOES THE ROTTEN ORANGE ALWAYS START AT THE SAME LOCATION?

Output: 4
Example 2:

Input: [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation:  The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.
Example 3:

Input: [[0,2]]
Output: 0
Explanation:  Since there are already no fresh oranges at minute 0, the answer is just 0.
 

Note:

1 <= grid.length <= 10
1 <= grid[0].length <= 10
grid[i][j] is only 0, 1, or 2.
*/

//ask how many starting rottens
//ask if even matrix

var orangesRotting = function (grid) {
  // if (!grid || grid.length === 0 || grid[0].length === 0) return -1
  let fresh = new Set();
  let rotten = null; //REALLY BETTER WITH JUST 1 ROTTEN OR ELSE HOW DO WE KNOW HOW TO INFECT FOR BOTH STARTING ROTTEN ORANGES
  //better if null NOT [] because it's either you have it or not and CONVEYS WHAT YOU MEAN BETTER,
  //YOU'RE THINKING ABOUT IF YOU HAVE AN ORANGE OR NOT, NOTTTT IF YOU HAVE A COORDINATE

  grid.forEach((row, i) => {
    //value is the array of this row
    //you're getting the actual cell back now NOT just the col
    row.forEach((cell, j) => {
      //the value of the cell itself, so the actual el in cell
      if (cell === 1) {
        fresh.add("" + i + j);
      }
      if (cell === 2) {
        // const key = i + 'x' + j   //DO THIS FOR IF LENGTH > 9
        // rotten.add(key)
        // rotten.add("" + i + j);
        rotten = [i, j, 0];
      }
    });
  });

  if (!rotten) return -1;

  //take rotten location, ==> imperative, you're saying HOW you're going to do it === pseudocode
  //just give the high lever declarative TITLE like description
  //take rotten orange and set adjacent oranges NO
  //take rotten orange and infect all adj oranges keeping track of time.

  let time = 0;
  if (
    (fresh.size === 0 && rotten.size === 1) ||
    (fresh.size === 0 && rotten.size === 0)
  )
    return time;
  //create array NOT set for queue
  let infectedQu = [rotten];
  let dirs = [
    [0, -1],
    [-1, 0],
    [0, 1],
    [1, 0],
  ];
  //BFS is best done iteratively
  while (infectedQu.length > 0) {
    let [i, j, currTime] = infectedQu.shift();
    time = Math.max(currTime, time);
    for (let [iChange, jChange] of dirs) {
      //DON'T DO IN, AND YES CNA DO OF FOR ARRAYS NOT JUST OBJS WHEN DESCTRUCTURING, ONLY WHEN DESTRUCTORING.
      //generate neighbor and check it
      let nexti = i + iChange;
      let nextj = j + jChange;
      let neighbor = "" + nexti + nextj;
      if (fresh.has(neighbor)) {
        fresh.delete(neighbor);
        grid[nexti][nextj] = 2;
        infectedQu.push([nexti, nextj, currTime + 1]);
      } //adj neighbors are the same distance and time away
    }
  }

  if (fresh.size > 0) return -1;
  return time;
};
let ex1 = [
  [2, 1, 1],
  [1, 1, 0],
  [0, 1, 1],
]; //4

console.log(orangesRotting(ex1));

// ORRRRRRRRRRRRr
/**
 * @param {number[][]} grid
 * @return {number}
 */

//account for multiple rotten originally
//account for out of bounds
//output = minute if no more fresh oranges

var orangesRotting = function (grid) {
  //go through entire matrix and get locations of all rotten and fresh oranges
  let fresh = new Set(),
    rotten = new Set(); // or can use a queue/arr for rotten but then you'll have the shifting time complexity..
  //mn
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) fresh.add("" + i + j);
      if (grid[i][j] === 2) rotten.add("" + i + j); //WANT TO DO THIS BC CAN'T REALLY SEE IF AN ARR IS IN A SET, EASIER TO SEE IF A STRING IS IN A SET
    }
  }
  //if there's no fresh oranges in the first place - aka 0 minutes for the entire matrix to be rotten
  if (fresh.length === 0) return 0;
  //if there's no rotten oranges but fresh are present in the first place - aka no way for any of the fresh oranges to be rotten
  if (fresh.length > 0 && rotten.length === 0) return -1;
  //breadth first search through rotten, creating NEW INFECTED queue at each run
  let coords = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  // vs? {{0, 1}, {0, -1}, {1, 0}, {-1, 0}}  ??????????
  let secs = 0; //should really be minutes, according to the prompt
  // let infected = rotten;//NO NEED BECAUSE ONLY CARE ABOUT FRESH
  // while (infected.size > 0 && fresh.size > 0) {  NOOOO JUST CARE ABOUT FRESH!
  while (fresh.size > 0) {
    let infected = new Set(); //breadth first search through rotten, creating NEW INFECTED queue at each run
    //take the original rotten out of infected queue, it's only going to circle out ONCE before going to next rotten
    //you got confused with this part thinking it's recursively going to keep going with the first rotten but it won't! it'll only expand out ONCE since it's not recursive and the infected will be stored in a separate set

    // let currInfected = infected.shift();
    // let iRow = currInfected[0]
    // let iCol = currInfected[1]
    //not shifting anything, just looping
    for (rot of rotten) {
      //each rot is a string    let 2 strings minus each other OR parseInt    //worst case is all infected mn
      let row = parseInt(rot[0]);
      let col = parseInt(rot[1]);
      //we already know this one is rotten so now we expand out and check those
      for ([i, j] of coords) {
        //if there's a fresh orange, make it rotten and add to infected queue in 4 directions
        //account for out of bounds
        // if (row + i < 0 || row + i > grid.length || col + j < 0 || col + j > grid[0].length) continue; NOOOOOOO, don't need to do this bc already stored all possible values of fresh oranges, so now just have to see if our current coords is in the fesh set, if it is THEN DO SOMETHING
        // let currOrange = grid[row + i][col + j];
        let nextRow = row + i;
        let nextCol = col + j;
        let nextOrange = "" + nextRow + nextCol;
        if (fresh.has(nextOrange)) {
          // currOrange = 2; //NO DON'T HAVE TO ACTUALLY CHANGE THE MATRIX, WE JUST CARE ABOUT WHAT'S IN OUR SETS, NO LONGER WORKING WITH THE MATRIX!! JUST WORKING WITH THE SETS NOW SO O(1)
          infected.add(nextOrange);
          fresh.delete(nextOrange); //so we don't reinfect the same orange
          //don't need to delete from rotten since it'll just loop once and then we're replacing the old set anyways with the new rotten to expand out. no use of the old rottens since we already took care of it here.
        }
      }
    }
    //*****IMPORTANT you got confused here too, you can not just change rotten to infected to continue the loop! ALL THE ORIGINAL ROTTENS HAVE BEEN DEALT WITH. ALL THE FRESH ORANGES IT INFECTED IS NOW IN THE INFECTED SET AND TAKEN OUT OF THE ORIGINAL FRESH SET, THUS, THERE WON'T BE ANY DUPLICATE WORK. NO WORRIES.
    rotten = infected;
    secs++;
    //just finished adding the first outter ring to infected. if there were any infected then keep going (YOU'RE STILL INSIDE THE WHILE LOOP HERE) else, if there's no more infected but there are still fresh left then there's no way for you to infect ALL oranges, which is the prompt, thus break out and return -1 saying that its impossible
    if (infected.size === 0 && fresh.size > 0) return -1;
  }
  return secs;
};

// Time: O(mn) which is what it took to create the set, all the others remain the same regardless of input even though you're "looping" thus O(1)
// space:O(mn) bc all oranges should have been rotten or all fresh or both and thus every cell would end up in one of the sets adding up to the whole matrix

///with queue/arr...but then need to handle shifting time complexity
// var orangesRotting = function(grid) {
//   const queue = [];       //index of rotten oranges
//   const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
//   let freshCount = 0;
//   for (let i=0; i<grid.length; ++i) {
//       for(let j=0; j<grid[0].length; ++j) {
//           if (grid[i][j] === 1) {
//               freshCount++;
//           } else if (grid[i][j] === 2) {
//               queue.push([i, j]);
//           }
//       }
//   }
//   let minutes = 0;
//   while(queue.length && freshCount) {
//       let len = queue.length;
//       while(len) {
//           const rotten = queue.shift();
//           directions.forEach(dirc => {
//               if ((rotten[0]+dirc[0]) >= 0 && (rotten[0]+dirc[0]) < grid.length && (rotten[1]+dirc[1]) >= 0 && (rotten[1]+dirc[1]) < grid[0].length && grid[rotten[0]+dirc[0]][rotten[1]+dirc[1]] === 1) {
//                   grid[rotten[0]+dirc[0]][rotten[1]+dirc[1]] = 2;
//                   queue.push([rotten[0]+dirc[0], rotten[1]+dirc[1]]);
//                   freshCount--;
//               }
//           });
//           len--;
//       }
//       minutes++;
//   }
//   return freshCount ? -1 : minutes;
// };
