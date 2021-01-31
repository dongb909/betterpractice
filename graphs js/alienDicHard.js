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

 function isLexical (words){
   //use map and set for this instead of nested array!
   const adj = {}
   const indegree = new Array(26).fill(0)
   //add all letters to adj
   /****actually BUILD the adj list and indegree******/
   //add in pointers and indegree when comparing 2 words with index having different letters
   //word 1 letter will always point to word2 letter in this way since it's supposed to be already 'lexicographically' ordered. If already in a set then return ""
   //if words are same vs if first is longer than 2nd and 2nd is prefix of first

    /**** NOW do topological sort ******/
    
 }