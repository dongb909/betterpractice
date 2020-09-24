/*
Given a string, find the first non-repeating character in it and return it's index. If it doesn't exist, return -1.

Examples:

s = "leetcode"
return 0.

s = "loveleetcode",
return 2.
Note: You may assume the string contain only lowercase letters.*/

/*is it just a-z
are there spaces? how do you want to handle spaces
what types of characters and are there any to omit?
have to handle empty string? how to handle?
if alpha, casing?
return single char string
input is a string, valid string -clarify
first char that occurs only once means WHAT
    only 1 count for that char in entire string
    ******** am i guaranteed that there's a character that occurs only once?
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
// var firstUniqChar = function(s) {
//     let chars = {}
//     for(let char in s) {
//         console.log(char)
//         if (chars[char]) chars[char]++
//         else chars[char] = 1
//     }
//     for (let i = 0; i<s.length; i++) {
//         if (chars[s[i]] === 1) return i
//     }
//     return -1
// };

// optimal O(n) space O(n)
var firstUniqChar = function (s) {
  let chars = "abcdefghijklmnopqrstuvwxyz";
  let firstIdx = new Map();
  for (let i = 0; i < chars.length; i++) {
    //map is O(1) time iteration bc is the same size regardless of input size
    firstIdx.set(chars[i], -1); // set all to index of -1
  }
  for (let i = 0; i < s.length; i++) {
    //O(n) get index of first occurance. it there's repeat then it'll be -2, -1 means there's no such char in str
    let char = s[i];
    if (firstIdx.get(char) === -1) firstIdx.set(char, i);
    // if first char then set real idx
    else firstIdx.set(char, -2); //if duplicate then set idx to -2
  }
  let min = Number.MAX_VALUE; //get smallest index
  for (const [char, idx] of firstIdx) {
    //O(1)
    // console.log(char, idx)
    if (idx > -1 && idx < min) min = idx; //set min
    console.log(min);
  }
  // return (min === Number.MAX_VALUE) ? -1 : min
};

// console.log(firstUniqChar("bab"))

function firstUniqChar2(str) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const firstIdx = new Map();
  for (const char of alphabet) {
    firstIdx.set(char, -1);
  }

  for (const idx in str) {
    //IDEX COMES BACK AS A STRING!!!! BE CAREFUL!!!
    let char = str[idx]; //this still works even tho it's a string! WTF
    if (firstIdx.get(char) === -1) firstIdx.set(char, parseInt(idx));
    else firstIdx.set(char, -2);
  }
  let minIdx = Number.MAX_VALUE;
  for (const [char, i] of firstIdx) {
    // minIdx = i < minIdx ? i : minIdx //NO!!! because of -1 and -2
    if (i > -1 && i < minIdx) {
      // console.log(typeof(i), minIdx, i < minIdx)
      minIdx = i;
    }
  }
  return minIdx;
}

console.log(firstUniqChar2("loveleetcode"));
