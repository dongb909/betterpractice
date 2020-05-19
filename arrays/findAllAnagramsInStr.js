/*
Given a string s and a non-empty string p, find all the start indices of p's anagrams in s.

Strings consists of lowercase English letters only and the length of both strings s and p will not be larger than 20,100.

The order of output does not matter.

Example 1:

Input:
s: "cbaebabacd" p: "abc"

Output:
[0, 6]

Explanation:
The substring with start index = 0 is "cba", which is an anagram of "abc".
The substring with start index = 6 is "bac", which is an anagram of "abc".
Example 2:

Input:
s: "abab" p: "ab"

Output:
[0, 1, 2]

Explanation:
The substring with start index = 0 is "ab", which is an anagram of "ab".
The substring with start index = 1 is "ba", which is an anagram of "ab".
The substring with start index = 2 is "ab", which is an anagram of "ab".
*/
//
/* var findAnagrams = function(s, p) {      NOTTTTTT THE ANSWERRR, THIS IS YOUR FIRST TRY THAT DIDN'T WORK
  if s<p
  if s = aaaaaaa p = a     map = {a:2}     result = []
           ^^                     
  if s = aaaaa  p = z
  if s = abcebc p = ab         a:1, b:1, c:1    jump start to end + 1 if end was not in map
      ababab    p = ab      //inc start ++ if complete match
  brute force = s X p
  our time complexity = O(s) space = map = p , result is not a part your actual algorithm so it doesn't count
               
               Typically, we consider space complexity in terms of Turing machines with:  one read-only input tape  one write-only output tape    however many read-write working tapes you want. 
               aka YOU GET YOUR WRITE TAPE FOR FREE, IF YOU NEVER READ THIS TAP THEN IT'S NOT A PART OF THE RUNTIME 
               
               THIS IS THE SLIDING WINDOW PROBLEM
  const result = [];
  if(s < p) return result;
  let pMap = {}
  let pLen = p.length;
  //make a map of all char in p first and a counter for the length of p for easier access
  for (let pIdx = 0; pIdx < p.length; pIdx++) {
      let char = p[pIdx];
      if (pMap[char]) {
          pMap[char]++;
      } else {
          pMap[char] = 1;
      }
  }

  
  now iterate through s with start pointer until find a match and then initialize end pointer until no match or count = 0
  for (let sIdxStart = 0; sIdxStart < s.length - p.length;) { //not until the end of s but until the last size of p
      let char1 = s[sIdxStart]
      if (pMap[char1]){
          pLen -= 1
          //if start index is within p then decrement count with the ends
          for (let sEnd = sIdxStart + 1; sEnd < s.length;) {
              let char2 = s[sEnd]
              while (pMap[char2] && pLen > 0) {
                  sEnd++
                  pLen--
              } //runs until pLen === 0 or char not in map
              if (pLen === 0) {
                result.push(sIdxStart) 
                sIdxStart++
              } else {
                sIdxStart = sEnd + 1
              }
          }
      }
  }
  return result
};
  
  keep track when all zero'd out
  instead of iterating through map again for each char count, have a separate one for the entire length
*/

/*
var findAnagrams = function(s, p) {
    const pChars = {}
    for (let i = 0; i < p.length; i++) { // pattern characters
        const char = p[i];
        if (!pChars[char]) pChars[char] = 0; // ensure char exists in map
        pChars[char] += 1; // always add 1
    }
    // letters we still need "to find" in the string, s
    let toFind = Object.keys(pChars).length; 
    
    let result = []; // indices at which an anagram occurs
    
    let start = 0, end = 0; // initialize start and end at same place
    while (end < s.length) {
        const endChar = s[end];
        // keep removing chars (at end position) from our pattern map
        if (pChars.hasOwnProperty(endChar)) { // remove only if it exists
            pChars[endChar]--;
            // toFind keeps track of chars we still need to find
            // we check if the pattern count is zero before decrementing
            if (pChars[endChar] === 0) { 
                toFind--;
            }
        }
        end++;
        
        while (toFind === 0) { // we've found all necessary letters (toFind is zero)
            // add start index to our output/results
            if (end-start === p.length) result.push(start);
            // let's find other anagrams by bringing our characters 
            // that we still need to find above zero
            // we need to update our pattern map and toFind counters
            // as we move our start pointer away from its current location
            const startChar = s[start];
            if (pChars.hasOwnProperty(startChar)) { 
                pChars[startChar]++;
                if (pChars[startChar] > 0) toFind++;
            }
            start++;
        }
    }
    return result; */


    
    // class Solution:
    // def findAnagrams(self, s: str, p: str) -> List[int]:
    //     from collections import Counter
    //     p_chars = Counter(p)
    //     distinct_chars = len(p_chars) # distinct chars we need to find
    //     start, end = 0, 0
    //     locations = []
    //     while end < len(s):
    //         end_char = s[end]
    //         if end_char in p_chars:
    //             p_chars[end_char] -= 1
    //             if p_chars[end_char] == 0:
    //                 distinct_chars -= 1
    //         end += 1
    //         while distinct_chars == 0:
    //             if end-start == len(p):
    //                 locations.append(start)
    //             start_char = s[start]
    //             if start_char in p_chars:
    //                 p_chars[start_char] += 1
    //                 if p_chars[start_char] > 0:
    //                     distinct_chars += 1
    //             start += 1 # moving forward removes non-p chars
    //     return locations 







var findAnagrams = function(s, p) {
  const locations = [];
  if(s < p) return locations;
  let pMap = {};
  let pLen = p.length;
  for (let pIdx = 0; pIdx < p.length; pIdx++) {
      let char = p[pIdx];
      if (pMap[char]) {
          pMap[char]++;
      } else {
          pMap[char] = 1;
      }
  }

  //START POINTER ASSIGNMENT
  //set START pointer and END pointer at SAME LOCATION, LEAVE START POINTER FOR ADDING TO RESULT BUT WORK OFF THE END POINTER ONLY! EVEN WHEN EVALUATING AT THE STARTING POSITION AKA END POINTER START
  //instead of keeping another counter to check length match of p, check by if there's still any char left in map
  //instead of ending p at p.length, just have the window keep going until all map is empty 
  let mapLen = Object.keys(pMap).length
  let start = 0, end = 0
  while (end < s.length) { //USING END POINTER AS ITERATOR, NOT EVEN START POINTER FOR ANY ITERATION
      let endChar = s[end]
      if (pMap[endChar]) {
          pMap[endChar]-- //THIS MAY GO INTO THE NEG BUT WILL FIX LATER
          if(pMap[endChar] === 0){ //check right away if it was the last char
              mapLen--
              // delete pMap[endChar] DON'T DELETE IT!
          }
      }
      // console.log(mapLen)
      end++ //increment end here, though it won't actually increment until next loop, but just so you don't forget
      //now check if pMap is empty to know that we have all char, but we only care our current string is same length as p
      //if same length as p and pMap is empty then push the start, and inc start by 1
      //if not then add char at start back to map and update mapLen and keep incrementing start while doing that until start is at where end is (in the case where s = bbbb, p = b, so don't subtract p length from s length as end of s, won't work)
      while (mapLen === 0) {//our current str has all the char we need
          if (p.length === end-start) {
              locations.push(start)
        //   } else { //ONLY ADD CHARS BACK IF IN P// } else { //NOT ELSE! YOU HAVE TO TAKE INTO ACCOUNT THE START CHAR TO BE PUT BACK REGUARDLESS FOR WHEN YOU INCREMENT START
              if(pMap[s[start]]) {
                  pMap[s[start]]++
                  if(pMap[s[start]] > 0){
                      mapLen++
                  }
              }//MAY HAVE DUPLICATE SAME LETTERS THAT MAKES YOUR PMAP CHAR COUNT NEG SO ADJUST FOR IT HERE!!
               //will get you out of this while loop
              //otherwise, any other char will just increment your start still
          }
          start++
      }
      
      //normally increment end here but you already did that above
  }
  return locations
};
  
