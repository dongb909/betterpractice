//[[[]]]
//[1,2,[3,4],[5,[6,[7], 8]]]

let flatten = (arr) => {
  let result = [];
  for(let el of arr) {
    if (Array.isArray(el)) {
      result = result.concat(flatten(el));
    } else {
      result.push(el)
    }
  }
  return result;
}


console.log(flatten([1,2,[3,4],[5,[6,[7], 8]]]))

let i = [1,2]
let j = [3,4]
// console.log(i.concat(...j))