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