/*Write a function that takes in a number n and returns all possible outcomes of n games of heads or tails as an array of arrays
ex: headsOrTails(2)
=> [[heads, heads], [heads, tails],[taks, heads], [tails, tails]] */

const headsOrTailCombo:(n:number) => string[][] = function(n) {
  if (!n) return []
  let allPossibleResult:string[][] = [] //nested array of array with strings
  function recurse(currCombo:string[]):void{
    if(currCombo.length === n) {
      allPossibleResult.push(currCombo)
      return
    }
    recurse([...currCombo, "heads"])  //we know it's just heads of tails
    recurse([...currCombo, "tails"])
  }
  recurse([])
  console.log(allPossibleResult)
  return allPossibleResult
}

headsOrTailCombo(3)
//O(n^2)   ^2 bc we only have 2 options, heads or tails