// /*
// I: str
// O: str
// E: emptry string?
//   casing?
//   sympbols/spaces */

// let longestPalin = (s) => {
//   let cs = s.replace(/^0-9a-z/gi, "");
//   if (cs === "") {
//     return ""
// }
//   let longestSubstring = cs[0];
//   let j
//   //make index the center
//   //factor in if center is empty or is a letter
//   for (let i = 1; i < cs.length; i++) {
//     // console.log(i)
//     if (cs[i]===cs[i-1]){
//       if(longestSubstring.length<2) {
//         longestSubstring = cs.slice(i-1, i+1)
//       }
//       j = 1;
//       while ((i-1-j) >=0 && i+j<cs.length && cs[i-1-j]=== cs[i+j]) {
//         if (longestSubstring.length < cs.slice(i-1-j, i+j+1).length) {
//           longestSubstring = cs.slice(i-1-j, i+j+1)
//         }
//         j++
//       }
//     }
//     if (cs[i-1]===cs[i+1]){
//       // console.log(i)
//       if(longestSubstring.length<3) {
//         longestSubstring = cs.slice(i-1, i+2)
//       }
//       j=2;

//       while (cs[i-j]===cs[i+j] && (i-j) >=0 && (i+j) < cs.length) {
//         if (longestSubstring.length < cs.slice(i-j, i+j+2).length){
//           longestSubstring = cs.slice(i-j, i+j+1)
//         }
//         j++;

//       }
//     }
//   }
//   return longestSubstring;
// }

// console.log(longestPalin('cabaca'))

// const longestPalindrome = s => {
//   let start = 0;
//   let end = 0;

//   for (let i = 0; i < s.length; i++) {
//     let len1 = expandFromMiddle(s, i, i);
//     let len2 = expandFromMiddle(s, i, i + 1);
//     let len = Math.max(len1, len2);

//     if (len > end - start) {
//       start = i - ((len - 1) / 2);
//       end = i + (len / 2);
//     }
//   }

//   return s.substring(Math.ceil(start), end + 1);
// };

// const expandFromMiddle = (s, left, right) => {
//   while (left >= 0 && right < s.length && s.charAt(left) === s.charAt(right)) {
//     left--;
//     right++;
//   }

//   return right - left - 1;
// }

// const longestPalindrome = (s) => {
//   if (!s || s.length < 1) return '';

//   let start = 0, end = 0, length = s.length;

//   for (let i = 0; i < length; i++) {
//     let len1 = expandAroundCorner(s, i, i);
//     let len2 = expandAroundCorner(s, i, i+1);
//     let len = Math.max(len1, len2);
//     if (len > end - start) {
//       start = i - ( len - 1) / 2;
//       end = i + len / 2
//     }
//   }

//   return s.substring(Math.ceil(start), end + 1);
// }

// expandAroundCorner = (s, left, right) => {
//     let len = s.length;
//     while (left >= 0 && right < len && s.charAt(left) === s.charAt(right)) {
//       left--;
//       right++;
//     }

//     return right - left - 1;

// xdcabace   index = 4  and length = 5
// start = Math.floor(5/2) = 4-2 = 2
// end = 4 +2 = 6+1 = 7

// length: 7-2=5  => cabac
// xdcabbace
// i= 5 (there's also 0)
// start = 5-3 = 2    SO USE Math.floor
// end = 5+3= 8

// aabbaa = max 6
// i = 3
// start 3=3 = 0   end 3+3=end but for slicing need +1

// // }

//USING POINTERS
const longestPalindrome = (str) => {
  if (!str) return "";
  if (str.length === 1) return str; //bc no point in putting it through the helper fnc
  let maxIndex = 0;
  let maxLength = 0;
  // let start = 0;
  // let end = 0; //in case there's no palindromes at all
  for (let i = 1; i < str.length; i++) {
    //MAKE SURE i STARTS WITH 1 since already taken care of 0 in line 125
    //also can't compare odd NOR even strings without neighbors
    let odd = expandStr(str, i, i); //odd palindrome
    let even = expandStr(str, i - 1, i); //even palindrome but that's why starting with i=1
    let max = Math.max(odd, even); //get the bigger length returned without an if statement
    //odd and even because both will have the same i, THIS IS JUST COMPARING THE TWO, NOT THE OVERALL MAX
    //update the max size starting/ending to slice and return substring later instead of at each iteration and slicing each time to compare which isn't efficient
    if (max > maxLength) {
      //from the current index as middle or empty
      maxLength = max;
      maxIndex = i;
    }
  } //6/2= 3    i = 5  start 5-3 = 2 OK   end 5+3 = 8
  let start = maxIndex - Math.floor(maxLength / 2); //bc index is the middle REGARDLESS if even or odd
  let end = //will DEPEND of if even or odd
    maxLength % 2 === 0
      ? maxIndex + Math.floor(maxLength / 2) //abba , 4/2 = 2, max index = 2 (2nd b), start 2-2=0, end 2+2 = 4 OK THAT IT'S OUT OF BOUNDS BECAUSE SLICING DOESN'T INCLUDE INDEX 4
      : maxIndex + Math.floor(maxLength / 2) + 1; //abcba, 5/2 = 2 floored, max index = 2 (c), start 2-2=0, end 2+2+1 = 5
  return str.slice(start, end);
};

const expandStr = (s, left, right) => {
  while (left >= 0 && right < s.length && s.charAt(left) === s.charAt(right)) {
    //aka while valid indices, both chars are equal irregardless of if odd or even, this function doesn't care
    left--;
    right++;
  }
  //there's an extra left-- and right++
  // console.log(s, left, right);
  console.log(right - left - 1); //length of this string    abba right = 4, left = 0-1 NOO!!
  //for even then starting left =1, right = 2,    then left = 0, right =3,
  // then since loop does an extra -- and ++ the left = -1, right =4
  // 4- -1 = 5 -1 =4
};

console.log(longestPalindrome("abba"));
