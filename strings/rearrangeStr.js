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
 var reorganizeString = function(S) {
    let chars = {}
    for (let char in S) {
      if(chars[char]) chars[char]++
      else chars[char]=1
    }
    let maxHeap = new MaxHeap((a,b) => b[1] - a[1])
    for(let [char, count] in chars){
      maxHeap.add([char, count])
    }
    if (maxHeap.peek()[1] > S.length/2) return ""
    let string = []
    let next = null
    while(maxHeap.size() > 0){
      let max = next ? next : maxHeap.pop()
      next = null
      string.push(max[0])
      --max[1]          
      if (max[1] >= maxHeap.peek()[1]){
        next = maxHeap.pop()
        maxHeap.add(max)
      } 
    }
    return string.join('')
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

var reorganizeString = function(S) {
  let chars = {}
  for (let char of S) {               //OFFFFF!!! not INNNNN for strings or else will get index
    if(chars[char]) chars[char]++
    else chars[char]=1
  }
  let maxHeap = []
  for(let [char, count] of Object.entries(chars)){        //NO SUCH THING AS (LET [KEY, VAL] IN {}) but yes (let [key, val] of {})
    maxHeap.push([char, count])
  }
  let comparator = (a,b)=> {if (a[1]>b[1]) return -1}
  maxHeap.sort(comparator)
  if (maxHeap[0][1] > Math.ceil(S.length/2)) return ""
  let string = []
  let next = null
  while(maxHeap.length > 0 ){
    let max = next ? next : maxHeap.shift()
    next = null
    string.push(max[0])
    max[1]--
    if (max[1] >= 0 && maxHeap.length === 0) return string.join('')
    if (max[1] >= maxHeap[0][1]){
      next = maxHeap.shift()
      maxHeap.push(max)
      maxHeap.sort(comparator)
    } else if(max[1]!== 0){
        maxHeap.push(max)
        maxHeap.sort(comparator)
    }
  }
  return string.join('')
};
console.log(reorganizeString("aaaabbb"))


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

