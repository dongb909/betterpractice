'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}



/*
 * Complete the 'directionReduction' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts STRING_ARRAY directions as parameter.
 */

function directionReduction(directions) {
    //check params
    const oppDirs = {"NORTH":"SOUTH", "SOUTH":"NORTH", "EAST":"WEST", "WEST":"EAST"}
    return sliceOpps(0, directions, oppDirs)
    
}  
function sliceOpps(idx, subSlice, oppDirs){
    if(subSlice.length <2) return subSlice
    if(subSlice.length===2 && subSlice[0]!==oppDirs[subSlice[1]])return subSlice
    if(idx === subSlice.length-1) return subSlice
    if(subSlice[idx]===oppDirs[subSlice[idx+1]]){
        return sliceOpps(idx-1, subSlice.slice(0,idx).concat(subSlice.slice(idx+2)), oppDirs)
    } else {
        return sliceOpps(idx+1, subSlice, oppDirs)
    }
    
}
//     let oppositeDir = {"NORTH":"SOUTH", "SOUTH":"NORTH", "EAST":"WEST", "WEST": "EAST"}
//     let result = [] 
//     let curr
//     for(let i = 0; i < directions.length;i++){ //1
//         curr = directions[i]   //EAST
//         if (oppositeDir[curr]=== directions[i+1]) {
//             i = i+2 // SOUTH
//             while (!directions[i]){ //IN BOUNDS
//                 if(directions[i] === oppositeDir[result.length-1]){
//                     result.pop()
//                     i=i+1
//                 } else{
//                     result.push(directions[i])
//                     break
//                 }    
//             }
//         }
//         else {
//             result.push(curr)
//         }
//     }
//     return result
// }

function main() {}