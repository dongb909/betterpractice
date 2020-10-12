//Number.MAX_VALUE
// console.log(!"") ==> true
// console.log(![]) ==> false

// str.split('') === [...str]

const array = ["a", "b", "c", "d"];
const obj = { a: "b", c: "d", e: "f" };
const map = new Map();
map.set("a", "b");
map.set("c", "d");
map.set("e", "f");
// console.log(map)

//********************************************************/
//**************        IN VS OF         *****************/
//********************************************************/
for (let char of "string") {
  // console.log(char) //==> ALPHABET CHARS
}

for (let char in "string") {
  //*********CHAR COMES BACK AS A STRING!!!! BE CAREFUL!!!
  // console.log(char) //==> 012345
}

for (let char of ["a", "b", "c", "d"]) {
  // console.log(char) //==> ALPHABET CHARS
  //if numbers then will return as NUMBERS
}

for (let char in ["a", "b", "c", "d"]) {
  // console.log(char) //==> 0123
  //BE CAREFUL!!!! THE CHAR HERE ALTHOUGH REPRESENT INDICES, THEY RETURN AS STRINGSS!! NOT NUMBERED INDICES BUT NUMBERED STRINGS!!
  //THESE WILL WORK FINE IF PLACED IN A MATH EQUATION BUT NOT BY THEMSELVES
}

for (const key in obj) {
  //NOT [key, val] key will work ==> a,c,e but val will be undefined
  //ONLY 'OF' WILL WORK AND ONLY WITH KEYS, 'IN' DOES NOT WORK AND WON'T WORK FOR VAL
  //because obj is NOT iterable
  // console.log(key) //==> ALPHABET CHARS
}

// for (const [key, val] of obj) {
// console.log(key) //==> a undefined c undefined e undefined
// }

for (const key in obj) {
  // console.log(key) //==> ERROR, obj not iterable
}

// console.log(Object.entries(obj))
for (let [key, val] of Object.entries(obj)) {
  // console.log(key,val) //THIS WORKS!! BC OBJ.ENTRIES ==> [ [ 'a', 'b' ], [ 'c', 'd' ], [ 'e', 'f' ] ] which is iterable
}

for (const [key, val] in map) {
  // console.log(key, val)  //==> DOES NOTHING AT ALL. NOTHING PRINTS
}

for (const [key, val] of map) {
  //can do const bc the key and val are just placeholders for the actual key and val
  // console.log(key, val) //==> a b c d e f
}

if (key in map) return true;

//******************************************************* */
//********       Creating sets           ********** */
//********************************************************/

const setArr = new Set([1, 2, 3, 4]); //==> {1,2,3,4}
// console.log(setArr);

// const setSpread = new Set(...[1, 2, 3, 4]); //==> WILL NOT WORK bc spreading them means it's NOT an iterable anymore to add to set
// console.log(setSpread);

// const setNumbs = new Set(1, 2, 3, 4); //==> NOT WORK BC IS NOT AN ITERABLE TO ADD TO SET ONE BY ONE
// console.log(setNums);

const emptySet = new Set([]); //==> {}
// console.log(emptySet);

//******************************************************* */
//********      REGEX.REPLACE       ********** */
//******************************************************* */

const paragraph =
  "Bob hit9 82 a ball, the hit BALL flew ball ball ball far after it was hit.";
const symbols = "!?,;."; //==> don't split by symbols bc will have to iterate through each symbol for each char and updat paragraph after each symbole at a time
// for c in "!?',;.": paragraph = paragraph.replace(c, " ") //lots of space and time

let regex1 = paragraph
  .toLowerCase()
  .replace(/[!?,;.]/g, " ")
  .split(" ");
// console.log(regex1)
// [
//   'bob',  'hit9', '82',
//   'a',    'ball', '',
//   'the',  'hit',  'ball',
//   'flew', 'ball', 'ball',
//   'ball', 'far',  'after',
//   'it',   'was',  'hit',
//   ''
// ]    MUST DO .filter(val=> val) to get rid of extra spacing du to commas and periods
//BUT also have the issue with the numbers too

let betterRegex = paragraph.replace(/[^a-z]+/gi, " ").split(" "); //==> Bob hit a ball the hit BALL flew ball ball ball far after it was hit
// console.log(betterRegex)
// or can first lowercase it and then not have to add the gi and split it on all characters BUT a-z so skipping the 'REPLACE" method
let betterRegex2 = paragraph.toLowerCase().split(/[^a-z]+/); //BEEEESTTTT ONE HERE**********************8 */
// console.log(betterRegex2)
//GET RID OF EXTRA SPACE AT END WITH .TRIM
// [
//   'bob',   'hit',  'a',
//   'ball',  'the',  'hit',
//   'ball',  'flew', 'ball',
//   'ball',  'ball', 'far',
//   'after', 'it',   'was',
//   'hit',   ''
// ]

//g=global aka repeating til end of str, i = case insensitive, ^=finall all characters that are NOT in a-z, + = more than 1 occurance
//MUST HAVE THE FORWARD SLASHES OR ELSE IT WILLNOT WORK
// NO ("[^a-zA-Z]", " ")
//NOT [^a-zA-Z]

// let betterRegex3 = paragraph.replace(/\w+/gi, " ") //==> LOWERCASE \w/gi means to keep all symples and get rid of all letters
// console.log(betterRegex3)
//ANOTHER WAY TO DO IT WITHOUT REGEX
function getAlphaCharsOnly(s) {
  // let shortenString = s.replace(/[^0-9a-z]/gi, "").toLowerCase(); if want to keep in numbers
  let chars = new Set("abcdefghijklmnopqrstuvwxyz".split(""));
  let str = "";
  for (let char of s.toLowerCase()) {
    str = chars.has(char) ? str + char : str;
  }
  // ...
}
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

//********************************************************/
//**************        SORTING        *****************/
//********************************************************/
//ALL SORTED IN PLACE
const arrBigNum = [1, 21, 40, 9, 590, 100000];
const arrOneDigits = [9, 2, 4, 6, 0, 1, 3]; //==> YES 0-9
const arrAlpha = "absckdoig".sort(); //==> YES a->z
const months = ["Dec", "Feb", "Jan", "March"];
//-normally called with:    but The time and space complexity of the sort cannot be guaranteed as it depends on the implementation.
// console.log(arrNum.sort())   // DOES NOT RETURN 1-9 as a guararantee
// console.log(arrAlpha.sort()) //DOES NOT RETURN  a-z as a guarantee

//SHOULD PROVIDE A COMPARISON FUNCTION THOUGH OR ELSE THE FOLLOWING WILL BE SORTED BY 'UNICODE'
//expected output: Array [1, 100000, 21, 30, 4] ==> sorts by the digit numbers NOT WHOLE number
// because numbers are converted to strings, "80" comes before "9" in the Unicode order
//// expected output: Array ["Dec", "Feb", "Jan", "March"]  ==> sorts by UNICODE, NOT actual alphabet

/* FOR COMPARING STRINGS
function compare(a, b) {    ==> will sort in order, if want descending order then reverse all '>' '<'
  if (a < b) {  by some ordering criterion
    return -1;    ==> a,b  aka a should be at an index less than b
  }
  if (a > b) {
    return 1;     ==> b,a
  }
  // a === b    ==> stays in place, usually a, b
  return 0;
} */

//FOR COMPARING NUMBERS, simply subtract b from a
/*
function compareNumbers(a, b) {
  return a - b;  ==> [1, 2, 3, 4, 5]
  return a > b   ==> [1, 2, 3, 4, 5]
  return b - a   ==> [5, 4, 3, 2, 1]
  return a < b   ==> [5, 4, 3, 2, 1]
}
  
*/

console.log();
console.log();
console.log();
console.log();
console.log();
console.log();

//but can also put in a compare function

//********************************************************/
//**************        HEAPS        *****************/
//********************************************************/

//********************************************************/
//**************        LINKED LISTS        *****************/
//********************************************************/
//SAME PATTERN FOR BOTH
// let fast = head, slow = head;
// while (fast && fast.next) {
//   slow = slow.next;
//   fast = fast.next.next;
// }

var middleNode = function (head) {
  if (!head) return null; //not checking head.next because could be the only node which would make it the middle node
  let fast = head;
  let slow = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
};

//DETECT CYCLE
const hasCycle2 = function (head) {
  if (!head || !head.next) return false; //bc there's no list or there's just 1 node thus no cycle possible
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    //if there's a cycle, slow.next AND fast.next will NEVER = null so if with 1 run, they don't equal, they eventually will
    slow = slow.next; //move slow by 1
    fast = fast.next.next; //move fast by 2
    if (slow === fast) return true;
  }
  return false; //reached null before finding a cycle
};

//REVERSE
const reverseLL = (head) => {
  //need to put the actual HEAD, not just the ll.
  let prev = null;
  while (head && head.next) {
    //MUST DO HEAD.NEXT TOO OR ELSE WILL BE RETURNING HEAD = NULL
    let next = head.next;
    head.next = prev;
    prev = head;
    head = next;
    // console.log('hiiiiiiiiiiiiiii',head);
  }
  head.next = prev; //MUST HAVE THIS HERE!!!
  // console.log(head)
  return head;
};
// reverseLL(ll.head);
// console.log(reverseLL(ll.head))

//********************************************************/
//**************        FLATTENING        *****************/
//********************************************************/
function flatten(arr) {
  let result = [];
  for (const el of arr) {
    // if(Array.isArray(el)) result.push(flatten(el)) //NOOOOO DO NOT PUSH BECAUSE YOU'RE RETURNING ANOTHER ARRAY AT EACH RECURSION!!
    // else result.push(el)
    if (Array.isArray(el)) {
      result = result.concat(flatten(el)); //MUST RESET RESULT ASSIGNMENT BECAUSE 'CONCAT' ALWAYS RETURNS A NEW ARRAY OR STRING
    } else result.push(el); //can push here bc this el is not an arr
  }
  return result;
}
console.log(flatten([1, 2, [3, 4], [5, [6, [7], 8]]]));

//why do you have to sort? bc there's possibility of duplicates and sorting will provide you where the duplicates are. HAVE TO SORT FOR ANY PROBLEMS NOT LEETING YOU HAVE DUPS to be efficient
//if can't sort then optimize by using set and no full scan of list again brute force which is less efficient

//********************************************************/
//**************        MORE REGEX         *****************/
//********************************************************/
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
