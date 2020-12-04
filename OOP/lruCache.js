// unique id for each item
// launch in uS
// order = id and postal code of where ordered
// store id of bottle with zipcode for delivery
// at any point of time , want know last 100 ids and their corresponding zipcode
//input: blank and then [id, zipcode] as input one at a time read sensitive
//id = string, all over the place, not in order
//zip = string
//output = last 100 to be stored in a data store for quick access
//access by id

// import { isModuleSpecifier } from "@babel/types";

// class Node {
//   constructor(key, val) {
//     this.key = key;
//     this.val = val;
//     this.prev = null;
//     this.next = null;
//   }
// }

// class List {
//   constructor() {
//     this.head = null;
//     this.tail = null;
//   }

//   isEmpty() {
//     return !this.head && !this.tail;
//     // !true
//     // !false
//   }

//   append(node) {
//     //always adding to end but be aware of the prev and next props
//     //end could be head bc empty list else just literally append to end
//     //if list is empty
//     if (this.isEmpty()) this.head = this.tail = node;
//     else {
//       this.tail.next = node;
//       node.prev = this.tail;
//       this.tail = node;
//     }
//   }

//   detach(node) {
//     //deleting the node completely while linking the neighbors
//     //detaching list with only single node
//     if (this.head === this.tail) this.head = this.tail = null;
//     //dequeing with remaining list
//     else if (this.head === node) {
//       let nextHead = this.head.next;
//       nextHead.prev = null;
//       this.head.next = null;
//       this.head = nextHead; //tail is taken care of by append
//     }
//     //detaching from end //DETACH IT REGARDLESS.
//     else if (this.tail === node) {
//       let prev = this.tail.prev;
//       this.tail.prev.next = null;
//       this.tail.prev = null;
//       this.tail = prev;
//     }
//     //detaching from middle
//     else {
//       node.prev.next = node.next;
//       node.next.prev = node.prev;
//       node.prev = node.next = null;
//     }
//   }
// }

// class LRUcache {
//   constructor(capacity) {
//     this.keys = new Map();
//     this.list = new List();
//     this.capacity = capacity;
//   }

//   access(key) {
//     let node = this.keys.get(key);
//     if (!node) return -1;
//     this.list.detach(node);
//     this.list.append(node);
//     return node;
//     //no need to update map bc just accessing the SAME node, not deleting anything
//   }
//   isEmpty() {
//     return this.keys.size() === 0;
//   }

//   add(key, zip) {
//     //add shouldn't even know that there's a linkedlist at all.
//     //empty list to create list and map
//     let node = new Node(key, zip);

//     //check if key valkey then take out and add to end with new zip
//     if (this.keys.get(key)) {
//       //delete old value
//       this.list.detach(this.keys.get(key));
//       //add new value to LL
//       this.list.append(node);
//       //reassign map key/value
//       this.keys.set(key, node);
//       //need to remember if there's only 1 node or think about deleting on both ends and mkeydle
//       //write down what your variables are at each point in time when running through
//     } else if (this.keys.size < this.capacity) {
//       //if key not valkey then check map size if > capacit the dequeue enqueue
//       this.keys.set(key, node);
//       this.list.append(node);
//     } else {
//       this.keys.delete(this.list.head.key);
//       // console.log( "hi", this.list.head)
//       this.list.detach(this.list.head);
//       this.keys.set(key, node);
//       this.list.append(node);
//     }
//   }
// }

// let cache = new LRUcache(2 /* capacity */);
// cache.add(1, 1);
// cache.add(2, 2);
// // console.log(cache)
// // console.log(cache.list.head)
// // console.log(cache.access(1))
// cache.add(3, 3); // evicts key 2
// // console.log(cache.access(2))       // returns -1 (not found)
// // console.log(cache)
// cache.add(4, 4); // evicts key 1
// console.log(cache.access(1)); // returns -1 (not found)
// cache.access(3); // returns 3
// cache.access(4);
// console.log(cache); // returns 1

// make it dry,
// need to find the mistakes when going through examples on your own
// should really think about edge cases prior
// you dkeyn't see the zip on line 38
// and then seeing the edgecases
// you were explaining your ASSUMPTION of what's happening not what actually happened!
// you were testing your own logic with assumptions.

class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.prev = this.next = null;
  }
}

//Map.set(key, val), .get(key), .delete(key)

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.head = new Node(); // makes it easier to make each head and tail as its own empty node to not have to worry about conditions where it's the first node being added or last node being removed
    this.tail = new Node()
    this.cache = new Map();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key) {
    //if key present then leave as is in map but relink the node in LL to be most recent
    let node = this.cache.get(key);
    if (node) {
      this.removeNode(node);
      this.addNode(node);
      return node.val;
    }
    //if not present then retun none.
    return -1;
  }

  put(key, value) {
    //if the key is already there, leave map as is but update node value and relink Node
    let node = this.cache.get(key);
    if (node) {
      node.val = value; //update node value
      this.removeNode(node); //remove node from LL
      this.addNode(node); //now added node back to front
    } else {
      //if key not there then
      //check capacity and remove oldest node if at capacity from map AND LL
      if (this.cache.size === this.capacity) {
        this.cache.delete(this.tail.prev.key); //remove from map
        // console.log("tail removed", this.tail.prev);
        this.removeNode(this.tail.prev); //remove from LL
      }
      //create node and add it to LL and map
      let newNode = new Node(key, value);
      this.cache.set(key, newNode);
      this.addNode(newNode);
      // return newNode;
    }
    // return node;
  }

  //this cache will be removing oldest item from tail
  //no need to worry about it being the last node
  removeNode(node) {
    //focused only on the LL aspect
    node.prev.next = node.next; //get node's prev and next nodes and just link them, then set current node next and prev to null
    node.next.prev = node.prev;
    node.prev = null;
    node.next = null;
    // return node;
  }

  //this cache will be adding most recently used item to head
  //no need to worry about if it's the first node and the need to start a LL bc the head and tails are their own dummy nodes
  addNode(node) {
    //focused only on the LL aspect
    let nextNode = this.head.next; //save current head.next
    this.head.next = node; //add new node to head
    node.prev = this.head; //set new node's prev and next
    node.next = nextNode;
    nextNode.prev = node; //set nextNode's prev
  }
}

let map = new LRUCache(2);
map.put("a", 1);
map.put("b", 2);
map.put("c", 3);
map.put("d", 4);
// console.log(map.cache);

console.log(map.get("c"))
console.log(map.cache);
