/*Given a paragraph and a list of banned words, return the most frequent word that is not in the list of banned words.  It is guaranteed there is at least one word that isn't banned, and that the answer is unique.

Words in the list of banned words are given in lowercase, and free of punctuation.  Words in the paragraph are not case sensitive.  The answer is in lowercase.

 

Example:

Input: 
paragraph = "Bob hit a ball, the hit BALL flew far after it was hit."
banned = ["hit"]
Output: "ball"
Explanation: 
"hit" occurs 3 times, but it is a banned word.
"ball" occurs twice (and no other word does), so it is the most frequent non-banned word in the paragraph. 
Note that words in the paragraph are not case sensitive,
that punctuation is ignored (even if adjacent to words, such as "ball,"), 
and that "hit" isn't the answer even though it occurs more because it is banned.
 

Note:

1 <= paragraph.length <= 1000.
0 <= banned.length <= 100.
1 <= banned[i].length <= 10.
The answer is unique, and written in lowercase (even if its occurrences in paragraph may have uppercase symbols, and even if it is a proper noun.)
paragraph only consists of letters, spaces, or the punctuation symbols !?',;.
There are no hyphens or hyphenated words.
Words only consist of letters, never apostrophes or other punctuation symbols. */

var mostCommonWord = function(paragraph, banned) {
  if(paragraph.length === 0) return ""
  let bannedSet = new Set(banned)     //takes in the NAME of the arr, and it spreads itself. DO NOT place an array literal, it won't work
  //if banned is empty the it'll just return an empty set

  //return a string of just words and then turn it to an arr
  // NO ("[^a-zA-Z]", " ")
  //NOT [^a-zA-Z] NOR QUOTES
  //*******  MUST BE A CAPITAL W bc the capital means NOT, lower case removes all letters and keeps symbols
  // don't need to do replace.let words = paragraph.replace(/\W+/gi, " ") //g=global, i = case insensitive, ^=finall all characters that are NOT in a-z
  //can just split directly with regex, need the + outside of the []
  //???? 
  let words = paragraph.toLowerCase().split(/[^a-z]+/)
  // let words = paragraph.replace(/[^a-zA-Z]+/gi, ' ').split(' '); This works but extra step

  let count = new Map()
  let maxCount=0
  let result
  
  for (i in words) {  //i = index
    if (!bannedSet.has(words[i])) {
      if (count.has(words[i])) {
        count.set(words[i], count.get(words[i]) +1)
      } else {
        count.set(words[i],1)
      }
//NOOOO you're using MAP so you can't do this.
    // count[words[i]] = count[words[i]] ? count[words[i]]+1 : 1 //must be +1 if doing it this way instead of ++

    }
  }
  console.log(count)
  for (let [k,v] of count){ //OF NOT IN //i = actual key //ALL THIS WONT WORK so just use regular map!!
    if(v > maxCount) {
      maxCount = v
      result = k
    }
  }

  return result
};



/*
var mostCommonWord = function(paragraph, banned) {
  const counts = {};
  let maxCount=0;
  let mostCommonWord = null;
    // [^a-z]+/gi matches one or more ([]+) non(^) alphanumerical (a-z) case insensitive (i) in the whole string (g)
    const test = paragraph.replace(/[^a-z]+/gi, ' ').toLowerCase().split(' ').forEach(word => {
      if (banned.indexOf(word) === -1) {
        const count = counts[word] + 1 || 1;
        counts[word] = count;
         if(count>maxCount) {
             maxCount=count;
             mostCommonWord=word;
         }
      }
    })
    return mostCommonWord;
};

*/
console.log(mostCommonWord("Bob hit9 82 a ball, the hit BALL flew ball ball ball far after it was hit.", ['hit']))

/*
var mostCommonWord = function(paragraph, banned) {
    let words = paragraph.toLowerCase().replace(/[!.';?,]/g,' ').split(" ").filter(val=> val);
    
    let map = {}
    words.forEach(word =>{
        if(map[word]) {
            map[word] = map[word] + 1
        }else{
            map[word] = 1
        }
    })
    let maxCount = 0;
    let maxCountWord = ""
    Object.keys(map).forEach(key=>{
        if(!banned.includes(key) && map[key] > maxCount){
            maxCountWord = key
            maxCount = map[key]
        }
    })
    
    return maxCountWord
}; */



/*def mostCommonWord(self, paragraph, banned):
    """
    :type paragraph: str
    :type banned: List[str]
    :rtype: str
    """
    for c in "!?',;.": paragraph = paragraph.replace(c, " ") //lots 
    d, res, count = {},"",0
    for word in paragraph.lower().split():
        if word in banned:
            continue;
        elif word in d:
            d[word] += 1
        else:
            d[word] = 1
        if d[word] > count:
            count = d[word]
            res = word
    return res */