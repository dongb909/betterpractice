//unique pairs, return arr of arrs, can be negative nums ?
function twoSum (arr, target){
  let unique = new Set(); //save the difference
  let saveEl = new Map(); //save the element as key, index as value
  let result = []
  let diff;

  for (let i = 0; i < arr.length; i++){
    diff = target - arr[i]; //doesn't matter if it's neg or pos since would be looking for the diff of that same value
    console.log(unique)
    if (!unique.has(diff) && saveEl.has(diff)) {
      //if set already has the difference that means we already found the matching pair in the orig arr
      //we only add to set if the diff hasn't been found in the orig arr
      // result = result.concat(diff, arr[i]) //this will merge arrays to 1
      // result = result.concat([diff, arr[i]]) //this will create merged arrays too same as above
      result.push([diff, arr[i]]) //CAN TOTALLY push an array instead of concatenating
      unique.add(diff).add(arr[i])

    }
    //add each el to obj, overwrite if duplicate to make it easier instead of conditions
    saveEl.set(arr[i],i)    //BE CAREFULE, IF USE MAP MUST USE .SET and .HAS METHODS not saveEl[arr[i]]
    //don't add diff to set yet because we only want to add when we find the diff in the map
  }
  return result
  //return [...unique]// NO BECAUSE WANT NESTED ARRAY FOR THE PAIRS
  //thus ok to reset same el value to a different index in map
  //and ok to add same 2 values to set since nothing will happen if values are already there
}


console.log(twoSum([1, 1, 2, 45, 46, 46], target = 47))
/*iteration |  el   | diff  |   set |   map
  0           1       46        {}      {1:0}    
  1           1       46        {}      {1:1}
  2           2       45        {}      {1:1, 2:2}
  3         45        2     found diff in map so set set    {45, 2} then add current el to map {1:1, 2:2, 45:3}
  4         46        1         {45,2,46,1} {1:1,2:2,45:3, 46:4}
  5         46q       1         add again to set but it's ok because nothing will happen since it's in set already


*/
//singular pair

// function twoSum (arr, target){

// }