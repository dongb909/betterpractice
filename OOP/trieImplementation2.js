/*
Implement a trie with insert, search, and startsWith methods.   https://leetcode.com/problems/implement-trie-prefix-tree/
root = {}			child of root => {a:{b:{c:{isWord:true}}, 

Example:

Trie trie = new Trie();

trie.insert("apple");
trie.search("apple");   // returns true
trie.search("app");     // returns false
trie.startsWith("app"); // returns true
trie.insert("app");   
trie.search("app");     // returns true

reason why trie outperforms hash table, is that as hash table increases in size, there are lots of hash collisions and the search time complexity could deteriorate to O(n)O(n), where nn is the number of keys inserted. Trie could use less space compared to Hash Table when storing many keys with the same prefix. In this case using trie has only O(m)O(m) time complexity, where mm is the key length. Searching for a key in a balanced tree costs O(m \log n)O(mlogn) time complexity.
*/

var Trie = function () {
  this.root = {};
};

Trie.prototype.insert = function (word) {
  let curr = this.root;
  for (let i = 0; i < word.length; i++) {
    let char = word[i];
    /*
      if(char in curr){ //char = letter
          curr = curr[char] //value returned by char key, NOT just the char. Each Char key's value is an obj
      } else { //set it to empty obj and then jum to that obj
          curr[char] = {} 
          curr = curr[char]
      }
      */
    if (!curr[char]) curr[char] = {}; //go from left to right setting NEXT property of curr OBJECT not to CURR which is an empty obj for curr char that's not already found
    curr = curr[char];
    if (i === word.length - 1) curr["isWord"] = true; //REMEMBER QUOTES!
    // console.log(curr.isWord)
  }
};
// INSERTIONS:
// time: O(s.length)
// space: you ARE inserting, the curr pointer keeps getting updated for the next char which is dfs but you're NOT using the callstack bc you're not calling anything so is O(1)
// ROOT = {}			{a:{b:{c:{}}}}
// In the worst case newly inserted key doesn't share a prefix with the the keys already inserted in the trie. We have to add mm new nodes, which takes us O(m)O(m) space.

Trie.prototype.search = function (word) {
  let curr = this.root;
  for (const idx in word) {
    let char = word[idx];
    if (!(char in curr)) return false;
    curr = curr[char];
    // console.log(typeof(idx), word.length-1)
    if (Number(idx) === word.length - 1) {
      //*** WAS NOT WORKING BECAUSE COMPARING STRING WTIH NUMBER!!!! NOT NUMBER WITH NUMBER BC OF THE for..in/of returns a string
      return curr.isWord === true;
    }
  }
  return false;
};
// SEARCH:
//Space complexity : O(1)O(1)
// -O(s.length)
//you're not creating anything BUT you're still using the callstack so space complexity is(O)s NOT O(1)

Trie.prototype.startsWith = function (prefix) {
  let curr = this.root;
  for (let idx in prefix) {
    let char = prefix[idx];
    // if(!curr[char]) return false    //NOT THIS
    if (!(char in curr)) return false;
    curr = curr[char];
    if (Number(idx) === prefix.length - 1) return true; //if at index just return
  }
  return false;
};
// STARTWITH
// -(O)s.length bc can be prefix
// Space complexity : O(1)O(1)