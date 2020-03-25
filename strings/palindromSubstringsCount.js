/*Given a string, your task is to count how many palindromic substrings in this string.

The substrings with different start indexes or end indexes are counted as different substrings even they consist of same characters.

Example 1:

Input: "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".
 

Example 2:

Input: "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa". */


//e: numbers? characters? spaces? empty strings?
//I: string
//O: number

//FIRST ATTEMPT
// let isPalindrome = (s) => {
//   let shortenString = s.replace(/[^0-9a-z]/gi, "").toLowerCase();
//   let length = shortenString.length - 1  
//   for (let i = 0; i < Math.floor(shortenString.length/2); i++) {
//     if (!(shortenString[i] === shortenString[length - i])) {
//       return false;
//     }
//   }
//   return true;
  
// }


// let countSubstrings = (s) => {
//   let count = s.length;
//   console.log(count)
//   if (!count){
//     return 0;
//   }
//   let substring=""
//   for (let i = 0; i < s.length-1; i++) {
//     // for (let j = i+1; j< s.length+1; j++) {
//       //slice does not count the last number so have to add another 1 so instead of j= i+1, it's j+2, and j<s.length+1
//     for (let j = i+2; j< s.length+1; j++) {
//       substring=s.slice(i, j);
//       console.log(substring)
//       if (isPalindrome(substring)) {
//         count ++
//       }
//     }
//   }
//   return count;
// }


// console.log(countSubstrings("abbca"))



/*
var countSubstrings = function(s) {
  var total = 0;
  for(var i = 0; i < s.length; i++) {
    total += palindromicStrCounter(s, i, i);
    total += palindromicStrCounter(s, i, i + 1);
  }
  return total
};

var palindromicStrCounter = function(s, l, r) {
  var counter = 0;
  while(l >= 0 && r < s.length && s[l] === s[r]) {
    l--;
    r++;
    counter++;
  }
  return counter;
}
*/

/*
var countSubstrings = function(s) {
    let result = s.length;
    
    let j;
    for (let i = 1; i < s.length; i++) {
        if (s[i] === s[i-1]) { // emtpy space is the center of palindrome
            result++; // palindrome with length 2
            j = 1;
            while ((i-1-j >= 0) && (i+j < s.length) && (s[i-j-1] === s[i+j++])) {
                result++;
            }
        }
        if (s[i-1] === s[i+1]) { // a letter is the center of palindrome
            result++; // palindrome with length 3
            j = 2;
            while ((i-j >= 0) && (i+j < s.length) && (s[i-j] === s[i+j++])) {
                result++;
            }
        }
    }
    
    return result;
}; */

let countPalindrom