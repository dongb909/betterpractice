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
const longestPalindrome = (s) => {
  const str = s.replace(/^0-9a-z/gi, "");
  if (str === "" || !s) {
    return "";
  }
  if (str.length === 1) {
    return str
  }
  let maxIndex=0;
  let maxLength=0;
  let start = 0;
  let end = 0; //in case there's no palindromes at all

  for (let i = 1; i <str.length;i++ ) {
    //odd palindrome
    let odd = expandStr(str, i, i);
    //even palindrome
    let even = expandStr(str, i-1, i);
    // console.log(odd, 'odd')
    // console.log('even', even)
    
    //get the bigger length without an if statement
    let max = Math.max(odd, even);
    
    //update the max size starting/ending to slice and return substring later instead of at each iteration and slicing each time to compare which isn't efficient
    if (max > maxLength) {
      //from the current index as middle or empty
      maxLength = max;
      // console.log(i, 'i')
      maxIndex= i;
    }
  }//6/2= 3    i = 5  start 5-3 = 2 OK   end 5+3 = 8 
  start = maxIndex - Math.floor(maxLength/2);
  end = (maxLength%2===0) ? (maxIndex + Math.floor(maxLength/2)) : (maxIndex + Math.floor(maxLength/2) + 1);

  return str.slice(start, end);
}

const expandStr = (s, left, right) => {
  
  while (left>=0 && right <s.length && s.charAt(left)===s.charAt(right)) {
    left--;
    right++;
  }
  //there's an extra left-- and right++
  return right-left-1 //length of this string
}


console.log(longestPalindrome(""))