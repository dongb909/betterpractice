/*Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Note that an empty string is also considered valid.

Example 1:

Input: "()"
Output: true
Example 2:

Input: "()[]{}"
Output: true
Example 3:

Input: "(]"
Output: false
Example 4:

Input: "([)]"
Output: false
Example 5:

Input: "{[]}"
Output: true */

// let isMatch = (lastOpenChar, currentChar) => {
//   if (lastOpenChar === "{" && currentChar==="}") {
//     return true;

//   } else if (lastOpenChar === "[" && currentChar==="]") {
//     return true;

//   } else if (lastOpenChar === "(" && currentChar===")") {
//     return true;

//   } else {
//     return false;
//   }
// }

// let isValidParenthese = (str) => {
//   if (str==="") {
//     return true;
//   }
//   if (str.length % 2 === 1) {
//     return false;
//   }
//   let openChars = [];
//   let match = true;
//   let i = 0
//   while (match && i < str.length) {
//     console.log(i)
//     if (str[i]==="{" || str[i]==="(" || str[i]=== "[") {
//       openChars.push(str[i]);
//     } else {
//       match = isMatch(openChars.pop(), str[i]);
//     }
//     i++;
//   }
//   return openChars.length===0 && match;
// }

// console.log(isValidParenthese("(("))

//BigO=n

/*const isValid = (s) => {

    let stack = [];

    let open = {
        "(":")",
        "[":"]",
        "{":"}",
    };

    let close = {
        ")":"(",
        "]":"[",
        "}":"{",
    };

    for(let i=0; i<s.length; i++){
        if(open[s[i]]){
            stack.push(s[i]);
        }else if(close[s[i]] && stack[stack.length-1] === close[s[i]]){
            stack.pop();
        }else{
            return false;
        }
    }

    if(stack.length === 0) {
        return true;
    }else{
        return false;
    }

};
*/

// var isValid = function(s) {
//     if(s.length % 2 > 0)  return false;

//     let map = new Map();
//     map.set("(",")");
//     map.set("[","]");
//     map.set("{","}");

//     let arr = [];

//     for(let char of s ){
//         if(map.has(char)){
//             arr.push(char);
//         }else{
//             if (arr.length === 0) return false;

//             if(map.get(arr[arr.length - 1]) === char){
//                 arr.pop();
//             }
//         }
//     }

//     return arr.length === 0
// };

let isValid = (s) => {
  if (s.length % 2 === 1) return false; //check if even even
  let parens = new Map();
  parens.set("(", ")");
  parens.set("[", "]");
  parens.set("{", "}");
  let open = []; //if item = key, add to arr
  for (let i = 0; i < s.length; i++) {
    //when using Map, CANNOT use [] to retrieve. need to use set, get, has
    if (parens.has(s[i])) {
      open.push(s[i]);
    } else {
      //if is closing bracket
      if (open.length === 0) return false; //but there's no opening brackets for it
      if (parens.get(open[open.length - 1]) === s[i]) open.pop();
    }
  }
  return open.length === 0;
};

console.log(isValid("()"));
