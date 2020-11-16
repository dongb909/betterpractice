//[1,2,3,4,5,6,7], k = 3 => [5,6,7,1,2,3,4]

function rotateArr (arr,k){
  let n = arr.length
  let startEndIdx = n - k%n
  let currIdx = startEndIdx
  let result = []
  if (k === 0 || startEndIdx === 0) return arr
  while(currIdx < n){
    result.push(arr[currIdx])
    currIdx++
  }
  currIdx = 0
  while(currIdx < startEndIdx){
    result.push(arr[currIdx])
    currIdx++
  }
  return result
}
console.log(rotateArr([1,2,3,4,5,6,7],3))
console.assert(JSON.stringify(rotateArr([1,2,3,4,5,6,7],3))===JSON.stringify([5,6,7,1,2,3,4]), "Rotation not accurate")
//CANNOT COMPARE 2 ARRAYS OR OBJS! BC DIFF REFERENCE NUMBERS!!! NEED TO STRINGIFY THEM FIRSTh
// console.assert(rotateArr([1,2,3,4,5,6,7],3)==[5,6,7,1,2,3,4], "Rotation not accurate")