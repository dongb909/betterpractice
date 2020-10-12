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
// let countSubstrings = (s) => {
//   let count = s.length;
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
  let count = s.length; //every letter is a palindrome themselves
  //skip the first index so we work backwards to ensure we stop at 0
  //if center is empty aka 2 letters
  let j;
  for (let i = 1; i < s.length; i++) {
    //starting at index 1 NOT at 0, already accounted for zero anywayz since count has the count of all letters in the string, also, index 0 cannot be more than its own palindrome!
    // incrementing main index
    //check middle type
    //EVEN MIDDLE TYPE
    if (s[i] === s[i - 1]) {
      //aka char at 1 and at 0  abba ==> comparing the bs as i=2
      count++;
      //
      j = 1; //middle technically is nothing so you're expanding out 1 char at a time from middle
      //check the ends if equal so to the Left of index aka -2 and to the right of index aka +1 becuase
      //must account for when past index 0 and when past length
      while (s[i - 1 - j] === s[i + j] && i - 1 - j >= 0 && i + j < s.length) {
        //doign i-1-j because already accounted for the i-1
        //abba, i=2, j=1 starting s[2-1-1] === s[2+1] ==> s[0]===s[3] to comapre a and a bc b b already compared above
        //=> if out of bounds where undefined == s[i+j] and index !=0 and if length not longer than string
        count++; //meaning you keep iteration there at i but now use while loop to expand out from center and while indices are within bounds then add to count if palindrome
        j++; //the iterator to expand out in while loop since your i is going to stay the same the whole time until next iteration of i outside of this while loop
      } //NOT adding j to anything. it's jsut an inner loop marker
    }
    //if center is 1 letter, 1 letter is already accounted for, now check the sides
    //don't have to worry about passing 0 because i starts at 1 and always just checking i-1, nothing less
    //ODD MIDDLE TYPE where add is the i, now just checking i's surrounding
    if (s[i - 1] === s[i + 1]) {
      //if s[0] = s[2] and then expand out from there with while loop
      count++;
      j = 2; //bc now at 3 letters palindrome and centering around i, already accouted for 1 out so now account for 2 out from middle
      //j is resetted here from the other if statement
      while (s[i - j] === s[i + j] && i - j >= 0 && i + j < s.length) {
        count++;
        j++;
      }
    }
  }
  //any index can be both an even or odd palindrome thus have to put it through EACH IF statements
  return count;
};

// console.log(countPalindrome("aabcbccccccccc")); //center expansion, pointer that anchors here and other pointers to expand outwards to find all possible palindromes and increment
// ^

//time: worst case is anchored in center n/2 which is basically O(n) so it's n^2 at end of day
//space:O(1)

//PRACTICE
let countPalindrome2 = (s) => {
  if (!s) return 0;
  let count = s.length; //every letter is, thus accounting for first
  let j;
  for (let i = 1; i < s.length; i++) {
    //still want to go to last letter bc of first condition
    //when not have middle
    if (s[i] === s[i - 1]) {
      //right = left
      count++;
      j = 1;

      while (s[i + j] === s[i - 1 - j] && i + j < s.length && i - 1 - j > -1) {
        //right = left MUST ACCOUNT FOR BOUNDARIES, you forgot those
        count++;
        j++;
      }
    }

    //when have middle
    if (s[i - 1] === s[i + 1]) {
      //left = right
      count++;
      j = 2;
      while (s[i - j] === s[i + j] && i + j < s.length && i - j > -1) {
        //left = right
        count++;
        j++;
      }
    }
  }
  return count;
};

console.log(countPalindrome2("acbca")); //7
