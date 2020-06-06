/*
you can do the same with a set or hashmap where access to finding the word is constant time which is MUCH faster BUT you're trading improved TIME for SPACE

so use trie and sacrifice time for space for when you're limited on space, even though it will take longer
space complexity(longest string * number of strings you have)


INSERTIONS:
time: O(s.length)
space: you ARE inserting, the curr pointer keeps getting updated for the next char which is dfs but you're NOT using the callstack bc you're not calling anything so is O(1)

ROOT = {}			{a:{b:{c:{}}}}
word = abc
split = [a,b,c]
curr = {}
//read from right to left
-if curr obj has a but it DOES NOT so it’s falsey and falsey returns {} as child
-assigning curr{} the char ‘a’ ===> {a:{}}

-curr = accessing key’a’ ===> {} <—‘a’s OBJECT NOT just an empty obj, and curr is a global variable so that’s how it’s updated.


root = {}			child of root => {a:{b:{c:{isWord:true}}, }

-don’t think of constructor of trie like tree how this.val and this.left/right etc
-node class{
	this.char=‘’
	this.children = {}
    this.isWord=false
}

TRAVERSE:
-return obj with {isWord:true}
-if !curr when the char doesn’t exist !! then return null

SEARCH:
-!!isWord because is only added at the end of a word
-O(s.length)
//you're not creating anything BUT you're still using the callstack so space complexity is(O)s NOT O(1)

STARTWITH
-(O)s.length bc can be prefix
//you're not creating anything BUT you're still using the callstack so space complexity is(O)s 
*/
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