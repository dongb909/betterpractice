/*
Implement a trie with insert, search, and startsWith methods.

Example:

Trie trie = new Trie();

trie.insert("apple");
trie.search("apple");   // returns true
trie.search("app");     // returns false
trie.startsWith("app"); // returns true
trie.insert("app");   
trie.search("app");     // returns true
*/

/**
 * Initialize your data structure here.
 */
var Trie = function() {
  this.root = {}
};

/**
* Inserts a word into the trie. 
* @param {string} word
* @return {void}
*/
Trie.prototype.insert = function(word) {
  let curr = this.root
  //check if letter is there first before adding a child by checking root
  //cannt forEach a word unless you split it first or iterate if iterate then isn't that less space?
  //return null ? not false?
  for (let i = 0; i < word.length; i++){
      let char = word[i]
      // console.log(i)
      if (curr[char]) {
          curr = curr[char] //skip to next char
       
      } else {//go from left to right setting NEXT property of curr OBJECT not to CURR which is an empty obj for curr char that's not already found
          //insert char
          curr[char] = {}
          //update curr ^ for next round
          curr = curr[char] //aka the last obj
          
      }
      //add another property for when word is complete
      if (i === word.length-1){
          // console.log('a')
          curr['isWord'] = true //QUUUUUOOOOTES
      } 
  }
  //DON'T HAVE TO RETURN ANYTHING???

};
//for insert in js when you return nothing it's null

/**
* Returns if the word is in the trie. 
* @param {string} word
* @return {boolean}
*/
Trie.prototype.search = function(word) {
let curr = this.root
for (let i = 0; i < word.length; i++){
  let char = word[i]
  if (!curr) return false //when within empty {}
  if (curr[char]) {
      curr = curr[char] //skip to next char
      // console.log(i)
      if (i === word.length-1) {
          if(!curr.isWord) return false
          console.log(curr.isWord)
          return curr.isWord
      } 
  }
  
}
    // console.log('hi')
  return false
};

/**
* Returns if there is any word in the trie that starts with the given prefix. 
* @param {string} prefix
* @return {boolean}
*/
Trie.prototype.startsWith = function(prefix) {
  let curr = this.root
  for (let i = 0; i < prefix.length; i++){
      let char = prefix[i]
      if (!curr) return false
      if (curr[char]) {
          curr = curr[char] //skip to next char
      } else {
          return false
      }
      if (i === prefix.length-1) return true
  }
  return false
};

/** 
* Your Trie object will be instantiated and called as such:
* var obj = new Trie()
* obj.insert(word)
* var param_2 = obj.search(word)
* var param_3 = obj.startsWith(prefix)
*/



OPTIMAAAAAAAALLLLLLLLLLL

function Trie() {
	const root = {};
	return { insert, search, startsWith };

	function insert(word) {
		let curr = root;
		word.split('').forEach(ch => curr = curr[ch] = curr[ch] || {});
		curr.isWord = true;
	}

	function traverse(word) {
		let curr = root;
		for (var i = 0; i < word.length; i++) {
			if (!curr) return null;
			curr = curr[word[i]];
		}
		return curr;
	}

	function search(word) {
		let node = traverse(word);
		return !!node && !!node.isWord;
	}

	function startsWith(word) {
		return !!traverse(word);
	}
}