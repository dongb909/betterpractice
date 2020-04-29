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


var orangesRotting = function(grid) {
  // if (!grid || grid.length === 0 || grid[0].length === 0) return -1
  let fresh = new Set();
  let rotten = null; //REALLY BETTER WITH JUST 1 ROTTEN OR ELSE HOW DO WE KNOW HOW TO INFECT FOR BOTH STARTING ROTTEN ORANGES 
  //better if null NOT [] because it's either you have it or not and CONVEYS WHAT YOU MEAN BETTER, 
  //YOU'RE THINKING ABOUT IF YOU HAVE AN ORANGE OR NOT, NOTTTT IF YOU HAVE A COORDINATE


  grid.forEach((row, i) => { //value is the array of this row
    //you're getting the actual cell back now NOT just the col
      row.forEach((cell, j) => {  //the value of the cell itself, so the actual el in cell
        if (cell === 1) {
          fresh.add("" + i + j);
        } 
        if (cell === 2) {
          // const key = i + 'x' + j   //DO THIS FOR IF LENGTH > 9 
          // rotten.add(key)
          // rotten.add("" + i + j);
          rotten = [i, j, 0];

        }
      })
  })

  if (!rotten) return -1;

  //take rotten location, ==> imperative, you're saying HOW you're going to do it === pseudocode
  //just give the high lever declarative TITLE like description
  //take rotten orange and set adjacent oranges NO
  //take rotten orange and infect all adj oranges keeping track of time. 

  let time = 0;
  if (fresh.size===0 && rotten.size === 1 || fresh.size === 0 && rotten.size===0) return time;
  //create array NOT set for queue
  let infectedQu = [rotten];
  let dirs = [[0, -1], [-1, 0], [0, 1], [1, 0]]
  //BFS is best done iteratively
  while (infectedQu.length > 0) {
    let [i,j, currTime] = infectedQu.shift();
    time = Math.max(currTime, time)
    for(let [iChange, jChange] of dirs) { //DON'T DO IN, AND YES CNA DO OF FOR ARRAYS NOT JUST OBJS WHEN DESCTRUCTURING, ONLY WHEN DESTRUCTORING.
      //generate neighbor and check it 
      let nexti = i + iChange;
      let nextj = j + jChange;
      let neighbor = "" + nexti + nextj;
      if (fresh.has(neighbor)) {
        fresh.delete(neighbor);
        grid[nexti][nextj] = 2;
        infectedQu.push([nexti, nextj, currTime+1]);

      } //adj neighbors are the same distance and time away
      
    }
  }

  if (fresh.size > 0) return -1
  return time;


};
let ex1= [[2,1,1],
          [1,1,0],
          [0,1,1]] //4

console.log(orangesRotting(ex1))