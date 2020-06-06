/*Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

Example 1:

Input: ["flower","flow","flight"]
Output: "fl"
Example 2:

Input: ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
Note:

All given inputs are in lowercase letters a-z. */


//commonality MUST be from ALL str in strs NOT just some str
// var longestCommonPrefix = function(strs) {
//     if(strs.length === 0 || !strs) return "";
//     //iterate through string index of 1st str
//     //then compare with the other strings at same index
//     //if other indices are out of bounds then it won't count anyways bc will not be slicing unless there's a non-equal
//     //not even checking equality but at the first sign of inequality!!
//     for(let i = 0; i < strs[0].length; i ++){   //char index
//         for(let j = 1; j < strs.length; j++) {  //strs remaining
//             if (strs[j][i] !== strs[0][i]) return strs[0].slice(0, i) //SLICE IS O(N)
//         }
//     }
//     return strs[0]  //else the entire first string is matched with the rest of the words
// };


//should be fine. Any index that is out of bounds for a string will result in undefined, not an error. 
//So, if ["following", "follow"] are used, index 6 of "follow" will equal undefined which is not equal to "i" which is totally fine.
// slice will copy any range of characters up to a certain index. It shouldn't ever attempt to copy out of bounds characters here because of the above if, 
//but if it did, it would just copy to the end of the string anyways without issue. eg. "hello".slice(0, 1000); would work just fine.

//still not the best method bc can have strings of same length but only the first characters match or something!


//THIS IS ONLY 5% SPEEEEEEDDDDD
var longestCommonPrefix = function(strs) {
  if(strs.length === 0 ||!strs) return ''
  //find shortest string
  let prefix = ''
  let maxLength = Math.min(...strs.map(str => str.length));
  for(let i = 0; i < maxLength; i++){
      let letter = strs[0][i]
      if (strs.every(str => str[i] === letter)){
          prefix += letter
      } else {
          return prefix //return early before going on 
      }
      // for(let str = 1; str < strs.length; str++) {
      //     if (strs[0][i] === strs[str][i]){
      //         longestPref+=strs[0][i]
      //     } else {
      //         return longestPref
      //     }
      // }
  }
  return prefix //returns '' if ['']
  
}

//Questions: time complexity of slice?
//if slice is O(1) and hits undefined, returns right? so why slower?




/*OR GO FROM END OF FIRST STRING AND DELETE LAST CHAR EACH TIME
var longestCommonPrefix = function(strs) {
  if(strs.length === 0 ||!strs) return ''
  let prefix = strs[0]
  for(let i = 1; i < strsl.length; i++) {
    while(strs[i].indexOf(prefix) !== 0){
      prefix = prefix.substring(0, prefix.length-1) //UP TO last letter, NOT INCLUDING
    }
  }
  return prefix
}

*/

//THIS IS 97% SPEEEEDDD USE THISSSSSSS ******************************
var longestCommonPrefix = function(strs) {
  if(strs.length === 0 ||!strs) return ''
  let prefix = []
  for(let i = 0; i < strs[0].length; i++){
      let letter = strs[0][i]
      if (strs.every(str => str[i] === letter)){ 
          prefix.push(letter)
      } else {
          return prefix.join('')
      }
  }
  return prefix.join('')
  
}

//cost of appending to an existing string is more than joining an array because you'll be copying the old string as well which is (O)(str.length)