/*Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.

Note: For the purpose of this problem, we define empty string as valid palindrome.

Example 1:

Input: "A man, a plan, a canal: Panama"
Output: true
Example 2:

Input: "race a car"
Output: false

E: numbers and character, take out    ==> NO KEEP NUMBERS IN "ALPHANUMBERIC"
  empty string
  string with just spaces
  lower/uppercase

C: n/a
*/
//time complexity for replace = n

let isPalindrome = (s) => {
  //looking for evertything that's NOT a-z, ignoring case, and repeating til end, and replace with nothing"", this replaces spaces too
  //nor NOT you need the carrot ^
  //don't need brackets if using the othet way

  //BOTH THE FOLLOWING WORKS
  // let shortenString = s.replace(/[^0-9a-z]/gi, "").toLowerCase();
  let chars = new Set("abcdefghijklmnopqrstuvwxyz".split("")); //turn into a fully connected string of chars
  let str = "";
  for (let char of s.toLowerCase()) {
    str = chars.has(char) ? str + char : str;
  }
  // console.log(shortenStrin                //^what replacing the chars you're taking out with.
  //odd or even does not matter because if odd, won't be touching middle anyways bc will go from comparing front to end and working way in
  let length = str.length - 1; //this way it accounts for the -0 and you don't have to recalculate length each iteration
  for (let i = 0; i < Math.floor(str.length / 2); i++) {
    //comparing both ends up until the middle, ignoring if there's a singular middle char
    if (!(str[i] === str[length - i - 1])) {
      //bc if string.length - 0, it's undefined, need to do length - 0 - 1
      return false;
    }
  }
  return true;
};
console.log(isPalindrome("A man, a plan, anal: Panama"));

//let compactString = startingString.replace(/[^0-9a-z]/gi, '').toLowerCase();
//var newStr = str.replace(regexp|substr, newSubstr|function) aka (str taking out, str putting in)

/*
const regex = /dog/gi    where /   /gi is a reg expression
reg expression = inate js character that describes a string. IS NOT A DATA TYPE
The literal notation's parameters are enclosed between slashes and do not use quotation marks.
The constructor function's parameters are not enclosed between slashes, but do use quotation marks.
The following expressions create the same regular expression:

/ab+c/i
new RegExp(/ab+c/, 'i') // literal notation
new RegExp('ab+c', 'i') // constructor
The literal notation provides a compilation of the regular expression when the expression is evaluated. Use literal notation when the regular expression will remain constant. For example, if you use literal notation to construct a regular expression used in a loop, the regular expression won't be recompiled on each iteration.

The constructor of the regular expression object—for example, new RegExp('ab+c')—provides runtime compilation of the regular expression. Use the constructor function when you know the regular expression pattern will be changing, or you don't know the pattern and are getting it from another source, such as user input.

When using the constructor function, the normal string escape rules (preceding special characters with \ when included in a string) are necessary.

For example, the following are equivalent:

let re = /\w+/
let re = new RegExp('\\w+') (+= a repeating thing)

\d	
Matches any digit (Arabic numeral). Equivalent to [0-9]. For example, /\d/ or /[0-9]/ matches "2" in "B2 is the suite number".

\D	
Matches any character that is not a digit (Arabic numeral). Equivalent to [^0-9]. For example, /\D/ or /[^0-9]/ matches "B" in "B2 is the suite number".

\w	
Matches any alphanumeric character from the basic Latin alphabet, including the underscore. Equivalent to [A-Za-z0-9_]. For example, /\w/ matches "a" in "apple", "5" in "$5.28", and "3" in "3D".

\W	
Matches any character that is not a word character from the basic Latin alphabet. Equivalent to [^A-Za-z0-9_]. For example, /\W/ or /[^A-Za-z0-9_]/ matches "%" in "50%".

x*	    match ZERO or more times
Matches the preceding item "x" 0 or more times. For example, /bo*./ matches "boooo" in "A ghost booooed" and "b" in "A bird warbled", but nothing in "A goat grunted".

x+	match AT LEAST 1 or more times
Matches the preceding item "x" 1 or more times. Equivalent to {1,}. For example, /a+/ matches the "a" in "candy" and all the "a"'s in "caaaaaaandy".

x?	  both 'e' can be there or not BUT "l" must be there
Matches the preceding item "x" 0 or 1 times. For example, /e?le?/ matches the "el" in "angel" and the "le" in "angle." 
If used immediately after any of the quantifiers *, +, ?, or {}, makes the quantifier non-greedy (matching the minimum number of times), as opposed to the default, which is greedy (matching the maximum number of times).

x{n}	
Where "n" is a positive integer, matches exactly "n" occurrences of the preceding item "x". For example, /a{2}/ doesn't match the "a" in "candy", but it matches all of the "a"'s in "caandy", and the first two "a"'s in "caaandy".

x{n,}	
Where "n" is a positive integer, matches at least "n" occurrences of the preceding item "x". For example, /a{2,}/ doesn't match the "a" in "candy", but matches all of the a's in "caandy" and in "caaaaaaandy".

x{n,m}	
Where "n" is 0 or a positive integer, "m" is a positive integer, and m > n, matches at least "n" and at most "m" occurrences of the preceding item "x". For example, /a{1,3}/ matches nothing in "cndy", the "a" in "candy", the two "a"'s in "caandy", and the first three "a"'s in "caaaaaaandy". Notice that when matching "caaaaaaandy", the match is "aaa", even though the original string had more "a"s in it.

x*?
x+?
x??
x{n}?
x{n,}?
x{n,m}?

By default quantifiers like * and + are "greedy", meaning that they try to match as much of the string as possible. The ? character after the quantifier makes the quantifier "non-greedy": meaning that it will stop as soon as it finds a match. For example, given a string like "some <foo> <bar> new </bar> </foo> thing":

/<.*>/ will match "<foo> <bar> new </bar> </foo>"
/<.*?>/ will match "<foo>"


The g modifier is used to perform a global match (find all matches rather than stopping after the first match).

Tip: To perform a global, case-insensitive search, use this modifier together with the "i" modifier.
The i modifier is used to perform case-insensitive matching.
 */
