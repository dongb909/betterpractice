function generateParens(n){
  if (n === 0) return [""]
  let result = []
  backtrack(result, "", 0, 0, n)
  return result
}

function backtrack(result, currStr, openCount, closeCount, maxPairs){
  //base case
  if(currStr.length === (maxPairs*2)){
    result.push(currStr)
    return
  }
  if(openCount < maxPairs) backtrack(result, currStr + "(", openCount+1, closeCount, maxPairs)
  if(closeCount < openCount) backtrack(result, currStr + ")", openCount, closeCount+1, maxPairs)
}


console.log(generateParens(2))