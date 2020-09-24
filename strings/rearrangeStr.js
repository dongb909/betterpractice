/*hash = n
hash length = m 
sort = mlogm
most freq recurring char = r
n + mlogm +nlogm NO because what happens when you push?
have to go n times for length of string but pushing is not m but logm
so nlogm is final time complexity
ex: arr in place then space = const but if create copy then space = n
using inputstring for index lookup = constant  if split copy then n


space: 
hash = m, or n beyond a-z
pq = m
have both so 2m = m
res = free because is just an output tape

Heap push = logn
heap pop = log n

because for the queue, your not technically removing but shifting and then adding back to the end.
*/

/*Given a string S, check if the letters can be rearranged so that two characters that are adjacent to each other are not the same.

If possible, output any possible result.  If not possible, return the empty string.

Example 1:

Input: S = "aab"
Output: "aba"
Example 2:

Input: S = "aaab"
Output: ""
Note:

S will consist of lowercase letters and have length in range [1, 500].
  */

//************THIS IS US PRETENDING WE HAVE ACCESS TO A HEAP OBJ TO USE IN OUR CODE
var reorganizeString = function (S) {
  let chars = {};
  for (let char in S) {
    if (chars[char]) chars[char]++;
    else chars[char] = 1;
  }
  //the heap itself will sort the data based on what comparison function you provide before determining if it's a max or min heap
  //The comparison will be executed during each individual 'add' to the heap as well as re-executed upon deletion
  //heap always takes in a comparison function to know whether it should return a maxHeap or minHeap
  let maxHeap = new MaxHeap((a, b) => b[1] - a[1]); //'1' because we're putting [key, val] into the heap, thus we want to oferder it by value only!!
  for (let [char, count] in chars) {
    maxHeap.add([char, count]); //adding dividual arrays to heap (heap is a tree)
  } //peeking to see what's the max amt right now
  if (maxHeap.peek()[1] > S.length / 2) return ""; //return "" bc there's no way the rearrangement will work anyways
  let string = [];
  let next = null;
  while (maxHeap.size() > 0) {
    //slowly going to take 1 char at a time while decrementing the char in the heap and pushing it into the arr
    let max = next ? next : maxHeap.pop(); //FIRST take out the BIGGEST char/num first
    //^^^^SECOND ROUND: next largest char we need to work with that's not exactly the max is.. (set by line 63 and 64)
    next = null; //REMEMBER TO RESET THIS
    string.push(max[0]); //just pushing char NOT the original char
    --max[1]; //sub the amt for that char
    if (max[1] >= maxHeap.peek()[1]) {
      //if our curr char amt is still greater than or equal to the next max char
      next = maxHeap.pop(); //then leave max as is and take the next char out to work with
      maxHeap.add(max); //add current max char back into the heap
      //if current amt is < peek then next = null and next loop will set the next peek BUT this time max won't be added back in
      //^^this really won't happen unless value is 0 though.
    }
  }
  return string.join("");
};

// abacad ok
// abcda
/*either they have the same count or not after decrementing, 
if same count then:
 */
// a:1, b:2
// a:4, b:1, c:1, d:1
// cbacbdcbc

// {c:4, d:1, a:1, b:3}
// [[c, 4],[b,3],[d,1],[a,1]].sort((a,b) => b[1]-a[1])
// concating.
// it's not available in the standard library

//THIS IS US IMPLEMENTING A 'HEAP' WITH JS
var reorganizeString = function (S) {
  let chars = {};
  //get char count
  for (let char of S) {
    //OFFFFF!!! not INNNNN for strings or else will get index
    if (chars[char]) chars[char]++;
    else chars[char] = 1; //getting each char count in str
  }

  //add all to heap array because we're doing it the js way
  let maxHeap = []; //making our own heap
  for (let [char, count] of Object.entries(chars)) {
    //NO SUCH THING AS (LET [KEY, VAL] IN {}) but yes (let [key, val] of {})but only after object.entries thus is an arry
    maxHeap.push([char, count]); //or use map in the first place so you can use 'of'
  }
  let comparator = (a, b) => {
    if (a[1] > b[1]) return -1; //setting max at index 0
  };
  //because doing it js version
  maxHeap.sort(comparator);
  if (maxHeap[0][1] > Math.ceil(S.length / 2)) return "";
  let string = [];
  let next = null;
  while (maxHeap.length > 0) {
    let max = next ? next : maxHeap.shift(); //like pop
    next = null;
    string.push(max[0]);
    max[1]--;
    if (max[1] >= 0 && maxHeap.length === 0) return string.join("");
    if (max[1] >= maxHeap[0][1]) {
      next = maxHeap.shift();
      maxHeap.push(max);
      maxHeap.sort(comparator);
    } else if (max[1] !== 0) {
      maxHeap.push(max);
      maxHeap.sort(comparator);
    }
  }
  return string.join("");
};
console.log(reorganizeString("aaaabbb"));

// a:2, b:1

// max = a:2
// sting [a, ] heap = b:1

// max = a:1
//        next = b:1
//        heap = a:1

//        max = b:1
//        string [a,b]
// max = b:0
// a:0     [a,b,a]

/*
input 
output
edge cases: null, 0, 1, 2, shapes, case, how are you going to cover something if it comes up but ask if it's possible first before asssuming that it's something you have to cover.
constraints:
questions
examples

*/
