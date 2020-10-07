//[[[]]]
//[1,2,[3,4],[5,[6,[7], 8]]]

//RECURSIVE
// let flatten = (arr) => {
//   let result = [];
//   for(let el of arr) {
//     if (Array.isArray(el)) {
//       result = result.concat(flatten(el));
//     } else {
//       result.push(el)
//     }
//   }
//   return result;
// }

function flatten(arr) {
  let result = [];
  for (const el of arr) {
    // if(Array.isArray(el)) result.push(flatten(el)) //NOOOOO DO NOT PUSH BECAUSE YOU'RE RETURNING ANOTHER ARRAY AT EACH RECURSION!!
    // else result.push(el)
    if (Array.isArray(el)) {
      result = result.concat(flatten(el)); //MUST RESET RESULT ASSIGNMENT BECAUSE 'CONCAT' ALWAYS RETURNS A NEW ARRAY OR STRING
    } else result.push(el); //can push here bc this el is not an arr
  }
  return result;
}
console.log(flatten([1, 2, [3, 4], [5, [6, [7], 8]]]));

let i = [1, 2];
let j = [3, 4];
// console.log(i.concat(j))
