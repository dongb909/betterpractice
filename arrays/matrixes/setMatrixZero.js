/*Given a m x n matrix, if an element is 0, set its entire row and column to 0. Do it in-place.

Example 1:

Input: 
[
  [1,1,1],
  [1,0,1],
  [1,1,1]
]
Output: 
[
  [1,0,1],
  [0,0,0],
  [1,0,1]
]
Example 2:

Input: 
[
  [0,1,2,0],
  [3,4,5,2],
  [1,3,1,5]
]
Output: 
[
  [0,0,0,0],
  [0,4,5,0],
  [0,3,1,0]
]
Follow up:

A straight forward solution using O(mn) space is probably a bad idea.
A simple improvement uses O(m + n) space, but still not the best solution.
Could you devise a constant space solution? */
//FIRST ATTEMPT
// var setZeroes = function(matrix) {

//   //iterate through each element
//   for(let i = 0; i<matrix.length; i++) {
//     for (let j=0; j<matrix[0].length; j++){
//       //if el equals zero then set the rest of it's row and col elements that's not zero to true
//       if (matrix[i][j]===0){
//         //turn entire row to true that's not 0, need to start from 0 
//         for(let k = 0; k<matrix[0].length; k++){
//           if (matrix[i][k]!==0){
//             matrix[i][k] =true;
//           }
//         }
//         //turn col to true
//         for (let l = 0; l<matrix.length;l++){
//           if (matrix[l][j]!==0){
//             matrix[l][j]=true;
//           }
//         }
//       } 
//       //go through each element again and change all that's a boolean to a 0
//     }
//   }
//   for(let i = 0; i< matrix.length; i++){
//     for(let j = 0; j<matrix[0].length; j++){
//       if (matrix[i][j]===true){
//         matrix[i][j]=0
//       }
//     }
//   }
//   return matrix
//   //no need to return because working directly on the matrix itself
// };

// let hi = 1
// // console.log(!hi)






/*var setZeroes = function(matrix) {
    // find
    
    let colSet = new Set();
    let rowSet = new Set();
    
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] === 0) {
                colSet.add(col);
                rowSet.add(row)
            }
        }
    }
    
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (colSet.has(col) || rowSet.has(row)) {
                matrix[row][col] = 0;
            }
        }
    }
}; */




/*var setZeroes = function(matrix) {
    if (!matrix || !matrix.length || !matrix[0] || !matrix[0].length) {
        return;
    }
    
    let col0 = 1;
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][0] === 0) col0 = 0;
        for (let j = 1; j < matrix[i].length; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    
    for (let i = matrix.length-1; i >= 0; i--) {
        for (let j = 1; j < matrix[i].length; j++) {
            if (!matrix[i][0] || !matrix[0][j]) {
                matrix[i][j] = 0;
            }
        }
        if (col0 === 0) matrix[i][0] = 0;
    }
};*/


/*var setZeroes = function(matrix) {
   const H = matrix.length; 
   const W = matrix[0].length; 
    
   const colsToPaint = new Set();
   const rowsToPaint = new Set();
    
   for (let y = 0; y < H; y++) {
       for (let x = 0; x < W; x++) {
           if (matrix[y][x] === 0) {
              rowsToPaint.add(y);
              colsToPaint.add(x);
           } 
       }
   } 
    
   for (let row of rowsToPaint) {
       for (let x = 0; x < W; x++) {
           matrix[row][x] = 0;
       }
   } 
    
    for (let col of colsToPaint) {
       for (let y = 0; y < H; y++) {
           matrix[y][col] = 0;
       }
   } 
    
    return matrix;
}; */


function setZeroes(arr){
  let rows= new Set();
  let cols= new Set();

  for(let i = 0; i< arr.length;i++) {
    for (let j = 0; j< arr[0].length; j++){
      if(arr[i][j] === 0){
        rows.add(i)
        cols.add(j)
        // console.log(rows,cols)
      }
    }
  }
  for(let row of rows){                 ///IS FOR (LET .... OF .... ) NOT (NAME ... IN .....) WHEN IT COMES TO SETS
    for(let i=0; i<arr[0].length;i++){
      arr[row][i] = 0
    }
  }
  for(let col of cols){
    for(let i=0; i<arr.length;i++){
      arr[i][col]=0
    }
  }
  return arr
}


console.log(setZeroes([
  [0,1,2,0],
  [3,4,5,2],
  [1,3,1,5]
]))