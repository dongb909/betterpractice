/*Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, determine if s can be segmented into a space-separated sequence of one or more dictionary words.

Note:

The same word in the dictionary may be reused multiple times in the segmentation.
You may assume the dictionary does not contain duplicate words.
Example 1:

Input: s = "leetcode", wordDict = ["leet", "code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
Example 2:

Input: s = "applepenapple", wordDict = ["apple", "pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
             Note that you are allowed to reuse a dictionary word.
Example 3:

Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
Output: false */
//prefix
//remaining string or suffix
var wordBreak = function(s, wordDict) {
    if (s === "") return true;
    for (word of wordDict) {
        //if prefix matches
        if (s.startsWith(word)) {
            //and if remaining string is true
            if (wordBreak(s.slice(word.length), wordDict)){
                return true;
            } //"ab" word = a  length = 1 so slice at 1
        }
    }
    return false;
};
//each branch is a call to wordBreak, need to return true all the way up

// catsandog
//     andog    =>f


// [cats, og, sand, cat] => t
//time:  w^s.length in the example of ['aaaaa', ['a']]
//BUT startsWith is w.length bc have to compare character by character, bc taking i and going through each string at the same time
//w.length can't be worst case bc it will vary and with time complexity can't use varied variable 
//it's min(max(w.length), s.length) * w^s.length //CAREFUL, WE'RE MULTIPLYING NOT ADDING HERE SO IT'S THE WHOLE THING FOR THE TIME COMPLEXITY BC TAHT'S FOR 1 RECURSIVE STEP COST.
//space: WE'RE STILL USING THE CALL STACK AS SPACE
//string gets smaller but it's still taking up space the further in the callstack so technically adding them all you're increasing in space. O(s.length)
