/*Given a string, find the length of the longest substring without repeating characters.

Example 1:

Input: "abcabcbb"
Output: 3 
Explanation: The answer is "abc", with the length of 3. 
Example 2:

Input: "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3. 
             Note that the answer must be a substring, "pwke" is a subsequence and not a substring. */


//I: casing? only letters?
//O: int
//
//time = 2N   space = N what instances would it not be N, alphabet so it's constant so O (1) bc i'm using a fixed number character set, your set is not fixed but if you mention that 
//you know that input will ONLY be alphabet then set would be O(1) and not O(n) or you can say O(m) depending on how you describe it. 

function longestNonrepeat (str) {
  if (str === "") return 0;
  let count = 0;
  let start = 0;
  let end = 0;
  let map = {};
  let finalstart=0;
  let finalend=0

    
  while (end < str.length) {
    //add all     DON'T USE SETS HEREEEEEEEEEEEE bc it's just very verbose 
    //WINDOW PROBLSM USUALLY HAVE 2 WHILES, OR 1 FORLOOP AND A WHILE
    if(!map[str[end]]){
      map[str[end]] = 1;
    } else {
      map[str[end]]++;
    }
    //make sure window is always valid
    while (map[str[end]] > 1) {
      map[str[start]]--;
      if(map[str[start]] === 0) {
        delete map[str[start]];
      }
      start++
    }
    //increment and count
    end++;
    // count = Math.max(count, end-start)    THIS IF JUST WANT NUMBERS
    if (end-start > count) {
      count = end - start;
      finalstart = start;
      finalend = end;
    }
  }
  // return count
  return str.slice(start, end)

}

console.log(longestNonrepeat ("eeedddde"))  //{ p:1, w:2, y:1, u:1,  }
                                //  ^
                                    //  ^

// function findLongestSubstring(str){
//   // add whatever parameters you deem necessary - good luck!
//   if(str.length === 0) return 0
//   let start = 0
//   let seen = {}
//   let maxLength = 0
  
//   for (let end = 0; end < str.length; end++){
//       let char = str[end]
//       if (char in seen){
//           while(start <= seen[char]) {
//               delete seen[str[start]]
//               start++
//           } //now start = char after repeat
//           //readd char
//       } 
//       seen[char] = end
//       maxLength = Math.max(maxLength, end - start + 1)
//       //+1 to be inclusive of where end is pointing to
//   }
//   return maxLength
    
// }
  
  
function findLongestSubstring(str){
  // add whatever parameters you deem necessary - good luck!
  if(str.length === 0) return 0
  let start = 0
  let seen = new Set() //don't need to track index, just increment start while deleting in set until start char matches curr repeated char
  let maxLength = 0
  
  for (let end = 0; end < str.length; end++){
      let char = str[end]
      if (seen.has(char)){
          while(str[start] !== char) {
              seen.delete(str[start])
              start++
          } //now start = first char appearance so want the char AFTER the first appearance to be the starting index
          start++
      } 
      //can just add again regardless bc is a set anyways
      seen.add(char)
      maxLength = Math.max(maxLength, end - start + 1)
      //+1 to be inclusive of where end is pointing to
   }
   return maxLength
    
}

