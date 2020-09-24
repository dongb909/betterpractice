//Number.MAX_VALUE

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

for (let char in "string") { //*********CHAR COMES BACK AS A STRING!!!! BE CAREFUL!!!
  // console.log(char) //==> 012345
}

for (let char of ["a", "b", "c", "d"]) {
  // console.log(char) //==> ALPHABET CHARS
}

for (let char in ["a", "b", "c", "d"]) {
  // console.log(char) //==> 0123
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
// [
//   'bob',   'hit',  'a',
//   'ball',  'the',  'hit',
//   'ball',  'flew', 'ball',
//   'ball',  'ball', 'far',
//   'after', 'it',   'was',
//   'hit',   ''
// ]

//g=global, i = case insensitive, ^=finall all characters that are NOT in a-z, + = more than 1 occurance
//MUST HAVE THE FORWARD SLASHES OR ELSE IT WILLNOT WORK
// NO ("[^a-zA-Z]", " ")
//NOT [^a-zA-Z]

// let betterRegex3 = paragraph.replace(/\w+/gi, " ") //==> LOWERCASE \w/gi means to keep all symples and get rid of all letters
// console.log(betterRegex3)

//********************************************************/
//**************        SORTING        *****************/
//********************************************************/
//ALL SORTED IN PLACE
const arrBigNum = [1,21,40,9,590,100000]
const arrOneDigits = [9,2,4,6,0,1,3]  //==> YES 0-9
const arrAlpha = 'absckdoig'.sort() //==> YES a->z
const months = ["Dec", "Feb", "Jan", "March"]
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
  return b - a   ==> [5, 4, 3, 2, 1]
}
  
*/


console.log()
console.log()
console.log()
console.log()
console.log()
console.log()

//but can also put in a compare function

//********************************************************/
//**************        HEAPS        *****************/
//********************************************************/

