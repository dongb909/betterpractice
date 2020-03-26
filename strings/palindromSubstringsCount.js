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




//SECOND ATTEMPT

let countPalindrome = (s) => {
  let count = s.length;
  //skip the first index so we work backwards to ensure we stop at 0
  //if center is empty aka 2 letters
  let j;
  for (let i = 1; i<s.length; i++){
    // incrementing main index
    //check middle type
    if (s[i]===s[i-1]){
      count++;
      //
      j = 1;
      //check the ends if equal so to the Left of index aka -2 and to the right of index aka +1 becuase
      //must account for when past index 0 and when past length
      while (s[i-1-j]===s[i+j] && (i-1-j) >=0 && i+j<s.length) {
        count++;
        j++;
      }
    }

    //if center is 1 letter, 1 letter is already accounted for, now check the sides
    //don't have to worry about passing 0 because i starts at 1 and always just checking i-1, nothing less
    if (s[i-1]===s[i+1]){
      count++;
      j=2;  //bc now at 3 letters palindrome and centering around i
      while (s[i-j]===s[i+j] && (i-j) >=0 && (i+j) < s.length) {
        count++;
        j++;
      }
    }
  }
  return count;
}

console.log(countPalindrome('abcba'))