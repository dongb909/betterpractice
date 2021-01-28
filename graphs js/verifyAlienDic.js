/*EASY
https://leetcode.com/problems/verifying-an-alien-dictionary/
In an alien language, surprisingly they also use english lowercase letters, but possibly in a different order. The order of the alphabet is some permutation of lowercase letters.

Given a sequence of words written in the alien language, and the order of the alphabet, return true if and only if the given words are sorted lexicographicaly in this alien language.

 

Example 1:

Input: words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
Output: true
Explanation: As 'h' comes before 'l' in this language, then the sequence is sorted.
Example 2:

Input: words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"
Output: false
Explanation: As 'd' comes after 'l' in this language, then words[0] > words[1], hence the sequence is unsorted.
Example 3:

Input: words = ["apple","app"], order = "abcdefghijklmnopqrstuvwxyz"
Output: false
Explanation: The first three characters "app" match, and the second string is shorter (in size.) According to lexicographical rules "apple" > "app", because 'l' > '∅', where '∅' is defined as the blank character which is less than any other character (More info).
 

Constraints:

1 <= words.length <= 100
1 <= words[i].length <= 20
order.length == 26
All characters in words[i] and order are English lowercase letters.
 */

var isAlienSorted = function (words, order) {
  if (words.length < 2) return true;
  //create alphbet
  const dic = new Array(26); //index is our vocab's position num but content is their vocab position
  for (let i = 0; i < order.length; i++) {
    //lowercase 'a' has value of 97
    dic[i] = order.charCodeAt(i) - 97;
  }
  //check order of each word to its prev
  for (let wordIdx = 1; wordIdx < words.length; wordIdx++) {
    const word1 = words[wordIdx - 1];
    const word2 = words[wordIdx];
    //only check up to min length
    const min = Math.min(word1.length, word2.length);
    for (let charIdx = 0; charIdx < min; charIdx++) {
      //do something if char not the same char1 is further in the dic then return false
      const char1 = word1.charCodeAt(charIdx) - 97;
      const char2 = word2.charCodeAt(charIdx) - 97;
      // console.log(word1, word2, char1, char2);
      if (dic[char1] > dic[char2]) return false;
      else if (dic[char1] < dic[char2]) return true;
      //break out of everything to return true
      //if char same and haven't break out yet then check if first word is longer and return false
      else if (charIdx === min - 1 && word1.length > word2.length) return false;
    }
  }
  return true;
};

// console.log(isAlienSorted(["hello", "leetcode"], "hlabcdefgijkmnopqrstuvwxyz"));
console.assert(
  isAlienSorted(["hello", "leetcode"], "hlabcdefgijkmnopqrstuvwxyz") === true,
  "Should return true"
);
console.assert(
  isAlienSorted(["word", "world", "row"], "worldabcefghijkmnpqstuvxyz") ===
    false,
  "Should return false for world"
);
console.assert(
  isAlienSorted(["apple", "app"], "abcdefghijklmnopqrstuvwxyz") === false,
  "Should return false bc first word is longer with same prefix"
);
console.assert(
  isAlienSorted([], "hlabcdefgijkmnopqrstuvwxyz") === true,
  "Should return true"
);
console.assert(
  isAlienSorted(["hi"], "hlabcdefgijkmnopqrstuvwxyz") === true,
  "Should return true"
);
