

// OPTIMAAAAAAAALLLLLLLLLLL;
//******BEST VIDEO. WATCH THIS https://www.youtube.com/watch?v=giiaIofn31A
//USEING ARRAYYYS tho Node is still an obj so Trie is also obj as root 
// don't eveneed to keep a this.val since technically the index location the next node is in already tells you what char it is.
//CHARACTER is really based on the INDEX it's in NOT the actual letter in the node, the val in node is just for debugging purposes!!!!
// class Trie {
//   constructor() {
//     this.root = {};
//   }

//   insert(word) {
//     let node = this.root;
//     for (let c of word) {
//       if (node[c] == null) node[c] = {};
//       node = node[c];
//     }
//     node.isWord = true;
//   }

//   traverse(word) {
//     let node = this.root;
//     for (let c of word) {
//       node = node[c];
//       if (node == null) return null;
//     }
//     return node;
//   }

//   search(word) {
//     const node = this.traverse(word);
//     return node != null && node.isWord === true;
//   }

//   startsWith(prefix) {
//     return this.traverse(prefix) != null;
//   }
// }

//******BEST VIDEO. WATCH THIS https://www.youtube.com/watch?v=giiaIofn31A

/*
// OR  https://www.youtube.com/watch?v=7XmS8McW_1U&list=PLjOkk6IoTYIFmFvW7k8r0MpyQEKVoCYL4&index=4
function Node1() {
  this.keys = new Map();
  this.end = false;
  this.setEnd = function () {
    this.end = true;
  };
  this.isEnd = function () {
    return this.end;
  };
}
function Node2() {
  return {
    keys: new Map(),
    end: false,
    setEnd() {
      this.end = true;
    },
    isEnd() {
      return this.end;
    },
  };
}

let Trie = function () {
  this.root = new Node2(); //so root would be obj with {keys:{}} then when add word then {keys:{newNode{keys:{}}, newNode{keys:{}}}}

  this.add = function (input, node = this.root) {
    if (input.length === 0) {
      node.setEnd();
      return;
    } else if (!node.keys.has(input[0])) {
      node.keys.set(input[0], new Node());
      return this.add(input.substr(1).node.keys.get(input[0]));
    } else {
      return this.add(input.substr(1).node.keys.get(input[0]));
    }
  };

  this.isWord = function (word) {
    let node = this.root;
    while (word.length > 1) {
      if (!node.keys.has(word[0])) {
        return false;
      } else {
        node = node.keys.get(word[0]);
        word = word.substr(1);
      }
    }
  };
  this.print = function () {
    let words = new Array();
    let search = function (node = this.root, string) {
      if (node.keys.size !== 0) {
        for (let letter of node.keys.keys()) {
          search(node.keys.get(letter), string.concat(letter));
        }
        if (node.isEnd()) {
          words.push(string);
        } else {
          string.length > 0 ? words.push(string) : undefined;
          return;
        }
      }
      search(this.root, new String());
      return words.length > 0 ? words : null;
    };
  };
};
*/


//Tries with set arrays instead of objs
//DON'T DO THIS.... IT'S TOO WEIRD. AND MORE COMPLICATED
function Node(char){
  this.char = char // though not really needed bc char should already equate to array idx location
  this.isWord = false
  this.children = new Array(26)
}

class Trie{
  constructor(){
    this.root = new Node('*')
  }

  insert(word){
    word = word.toLowerCase()
    let curr = this.root
    let char
    for(let idx in word){
      // console.log(word.charCodeAt(idx) - 'a'.charCodeAt(0)) aka 97
      char = word.charCodeAt(idx) - 97 //really the child idx
      if (!curr.children[char]) curr.children[char] = new Node(word[idx])
      curr = curr.children[char]//eitherway, iterate down
      if (Number(idx) === word.length - 1) curr.isWord = true //DOESN'T WORK IF YOU JUST DO IDX ALONE BC IS A STRING!!
      // console.log(curr)
    }
  }

  search(word){
    word = word.toLowerCase()
    let curr = this.root
    let char
    for(let idx in word){
      char = word.charCodeAt(idx) - 97
      if (!curr.children[char]) return false
      // console.log(curr.children[char])
      curr = curr.children[char]
      // console.log(curr.isWord) 
      console.log(Number(idx) === word.length - 1 )
      if (Number(idx) === word.length - 1 && curr.isWord) return true
    }

  }
}
let trie = new Trie()
trie.insert('apple')
trie.search('apple')
// console.log(trie)

