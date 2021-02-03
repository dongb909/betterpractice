/*HARD
There is a new alien language which uses the latin alphabet. However, the order among letters are unknown to you. You receive a list of words from the dictionary, where words are sorted lexicographically by the rules of this new language. Derive the order of letters in this language.

For example,
Given the following words in dictionary,

[
  "wrt",
  "wrf",
  "er",
  "ett",
  "rftt"
]
The correct order is: "wertf".

Note:
You may assume all letters are in lowercase.
If the order is invalid, return an empty string.
There may be multiple valid order of letters, return any one of them is fine.

https://evanyang.gitbooks.io/leetcode/content/LeetCode/alien_dictionary.html
 */

const { identifier } = require("@babel/types");

function isLexical(words) {
  //use map and set for this instead of nested array!
  const adj = {};
  const indegree = new Array(26).fill(0);
  //fill adj with JUST what chars there are
  for (let word of words) {
    for (let char of word) {
      if (!adj[char]) adj[char] = new Set();
    }
  }

  /****actually BUILD the adj list and indegree******/
  //add in pointers and indegree when comparing 2 words with index having different letters
  //word 1 letter will always point to word2 letter in this way since it's supposed to be already 'lexicographically' ordered. If already in a set then break then return ""
  //if words are same vs if first is longer than 2nd and 2nd is prefix of first then return ""
  for (let word = 1; word < words.length; word++) {
    let w1 = words[word - 1];
    let w2 = words[word];
    let min = Math.min(w1.length, w2.length);
    console.log(w1, w2);
    //iterate through each char position of both words
    for (let charIdx = 0; charIdx < min; charIdx++) {
      //if chars are not the same, THEN do something
      let outChar = w1[charIdx];
      let inChar = w2[charIdx];
      console.log(outChar, inChar);
      if (outChar !== inChar) {
        //add to adj BUT the value will be updated each time since there really shouldn't be more than 1 pointer to another letter., shouldn't be pointing to multiple
        if (!adj[outChar].has(inChar)) {
          //if inChar not in out
          adj[outChar].add(inChar);
          //add indegree here bc only want unique pointers
          indegree[inChar.charCodeAt(0) - 97]++;
          break;
        }
      } else if (charIdx === min - 1 && w1.length > w2.length) return ""; //do it here not before the forloop
    }
  }
  console.log(adj, indegree);

  /**** NOW do topological sort ******/ //starting with indegree 0s BASED off of the chars in the adj list NOT off the indegree full array
  
}
console.log(isLexical(["wrt", "wrf", "er", "ett", "rftt"]));
