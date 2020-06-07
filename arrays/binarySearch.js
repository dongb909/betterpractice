let ex1 = [1,2,3,4,5] //find 3
                //  ^
let ex2 = [3,5,7,9] //find 10


//return index if there -1 if not

let biSearch = function (arr, target){
  let start = 0
  let end = arr.length - 1   //bc end is INDEX inbound
  while(start < end && start !== end ){
    let pivot = Math.floor((end+start)/2)   //COMPUTE PIVOT WITHIN THE WHILE LOOP AND YOU WERE SUBTRACTING THE PIVOT INSTEAD OF ADDING
    let curr = arr[pivot]                 //IT'S ALWAYS SHIFTING FROM THE START BOARDER DIVIDED BY 2 INDEXES NOT THE LENGTH ITSELF BUT THE INDEXES!!
    if(curr===target) return pivot
    if(curr > target) end = pivot - 1     //already CHECKED pivot. so hop to next or prev
    else start = pivot + 1            //REMEMBER THE OFFS BY 1S
  }
  if(arr[start]===target) return start
  return -1
}

console.log(biSearch(ex2, -2))
//have start and end
//divide half to get pivot index
//if pivot < target then start = pivot and recalc pivot with start and end
//if pivot > target then end = pivot and recalc pivot with start and end
// if pivot == target then return index
//if start === end and pivot !== target then return -1

