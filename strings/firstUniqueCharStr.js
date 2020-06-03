/*
Given a string, find the first non-repeating character in it and return it's index. If it doesn't exist, return -1.

Examples:

s = "leetcode"
return 0.

s = "loveleetcode",
return 2.
Note: You may assume the string contain only lowercase letters.*/


// Given a string of characters, find the first character that occurs only once.



// babacbcdddef
 
/*is it just a-z
are there spaces? how do you want to handle spaces
what types of characters and are there any to omit?
have to handle empty string? how to handle, like what to return? what's the expected output if we have an empty string
if alpha, casing?
return single char string
input is a string, valid string -clarify
first char that occurs only once means WHAT
    only 1 count for that char in entire string
    ********how handle if all are repeating chars . am i guaranteed that there's a character that occurs only once?
    *****what does first mean? going left to right or right to left?
Edge cases: empty string, no unique chars, 

are there time and space constraints
*/
//BRUTE FORCE
//{a:2, b:3} key = char, val = freq by 1 pass through string
//minumum = -1
//go through original string and match that with frequency map aka attempt to walk through original string and return the first character with the value of 1


                         
// map with charCodeAt-offset bc indices is 0 Staart
// single pass bc only going through 26 char, the pass is for frequency and then loop through keys
// it's been hard for me to come up with examples for this but here's a scenario that i've seen before and i saw them go throuhg a dispute, this is how some people respond and this is how i would respond.


//brute force O(2n)
var firstUniqChar = function(s) {
    let chars = {}
    for(char of s) {
        if (chars[char]) chars[char]++
        else chars[char] = 1
    }
    for (let i = 0; i<s.length; i++) {
        if (chars[s[i]] === 1) return i
    }
    return -1
};


//optimal O(n) space O(n)
var firstUniqChar = function(s) {
  let chars = "abcdefghijklmnopqrstuvwxyz"
  let firstIdx = new Map()
  for (let i = 0; i< chars.length; i++){    //map is O(1) time iteration bc is the same size regardless of input size
      firstIdx.set(chars[i], -1)
  }
  for(let i = 0; i < s.length; i++){        //get index of first occurance. it there's repeat then it'll be -2, -1 means there's no such char in str
      let char = s[i]
      if(firstIdx.get(char) === -1) firstIdx.set(char, i);
      else firstIdx.set(char, -2) 
    //   console.log(firstIdx)
  }
  let min = Number.MAX_VALUE
  for (const [char, idx] of firstIdx){
      console.log(idx)
      if (idx > -1 && idx < min) min = idx
  }
  return (min === Number.MAX_VALUE) ? -1 : min
}

console.log(firstUniqChar("bab"))
