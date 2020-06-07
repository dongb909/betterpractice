/*You have an array of logs.  Each log is a space delimited string of words.

For each log, the first word in each log is an alphanumeric identifier.  Then, either:

Each word after the identifier will consist only of lowercase letters, or;
Each word after the identifier will consist only of digits.
We will call these two varieties of logs letter-logs and digit-logs.  It is guaranteed that each log has at least one word after its identifier.

Reorder the logs so that all of the letter-logs come before any digit-log.  The letter-logs are ordered lexicographically ignoring identifier, with the identifier used in case of ties.  The digit-logs should be put in their original order.

Return the final order of the logs.

 

Example 1:

Input: logs = ["dig1 8 1 5 1","let1 art can","dig2 3 6","let2 own kit dig","let3 art zero"]
Output: ["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]
 

Constraints:

0 <= logs.length <= 100
3 <= logs[i].length <= 100
logs[i] is guaranteed to have an identifier, and a word after the identifier. */

/**
 * @param {string[]} logs
 * @return {string[]}
 */

//can have empty log, no neg numbers
//arr of strings

//cannot rely on index bc what if you had dig11 instead of dig1
var reorderLogFiles = function(logs) {
  let nums = []
  let alpha = []
  logs.forEach((log, index) => {
      let [id, words] = split(log)
      if(parseInt(words[0]) || parseInt(words[0]) === 0){ //BE CAREFULE!! PARSEINT '0' = 0 IS A FALSEY VALUE
         nums.push(log)
         } else {
             alpha.push([id, words, index])
         }
  })
  console.log(nums)
  alpha.sort((a,b) => {
      if (a[1]<b[1]) return -1
      if (a[1]>b[1]) return 1
      if (a[1] === b[1]) {
          if(a[0]<b[0]) return -1
          if(a[0]>b[0]) return 1
          if(a[0]===b[0]) return 0
      } 
  })
  //_ is to signify i don't care about this
  return alpha.map(([_id,_word,index]) => logs[index]).concat(nums)
};


// art can
// own kit dig
// art zero
               
let split = function (str) {
  let start = 0
  while (str[start] !== " ") {
      start++
  }
  let id = str.slice(0, start)
  let words = str.slice(start + 1)
  return [id, words]
}
