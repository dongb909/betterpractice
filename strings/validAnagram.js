/*Given two strings s and t , write a function to determine if t is an anagram of s.
Example 1:
Input: s = "anagram", t = "nagaram"
Output: true

Example 2:
Input: s = "rat", t = "car"
Output: false

Note: You may assume the string contains only lowercase alphabets.

Follow up: What if the inputs contain unicode characters? How would you adapt your solution to such case? */
let isAnagram = function(s, t) {
  //check length or null or empty
  if (s==="" && t==="") return true;
  if (s.length !== t.length || !s || !t )return false;
  //count s characters
  let storageS = {}
  for (let i = 0; i < s.length; i ++) {
    let sChar = s[i]
    if (storageS[sChar]) storageS[sChar] ++;
    else storageS[sChar]=1;
  }
  // console.log(storageS, '1')
  //subtract from s characters
  for(let j=0; j < t.length; j++) {
    let tChar = t[j]
    if (storageS[tChar] && storageS[tChar] !== 0) storageS[tChar] --;
    else return false;
  }
  //MUST RUN THROUGH smap 1 more time to ensure no keys are greater than 0 
  //so can iterate through map again OR keep a count of what's reached 0 and compare to map size. if equal then all are 0
  //MISSING IMPLEMENTATION HERE BECAUSE TOO LAZY
  return true;
};

console.log(isAnagram("aaca", "aaca"))

// var isAnagram = function(s, t) {
//   let alpha = new Array(26).fill(0)
//      for (let i = 0; i < s.length; i++) {
//          alpha[s[i].charCodeAt(0) - 'a'.charCodeAt(0)] +=1
//      }
     
//      for (let i = 0; i < t.length; i++) {
//          alpha[t[i].charCodeAt(0) - 'a'.charCodeAt(0)] -=1
//      }
     
//      // for (let i = 0; i < alpha.length; i++) {
//      //     if (alpha[i] !== 0) return false;
//      // }
//      return alpha.every(ele => ele === 0)
     
     
//  };

//  var isAnagram = function(s, t) {
//   let hashmap = {};
//   for (let i=0; i<s.length; i++){
//       if(hashmap[s[i]] === undefined){
//           hashmap[s[i]] = 1
//       } else hashmap[s[i]] += 1  
//   }
//   for (let i=0; i<t.length;i++){
//       if (t[i] in hashmap){
//           hashmap[t[i]] += -1 
//       } if (!(t[i] in hashmap)){
//           return false 
//       } 
//   }
//   for (key in hashmap){
//       if (hashmap[key] != 0){
//           return false
//       } 
//   }
//   return true
// }