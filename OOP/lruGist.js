LRU CACHE

class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class List {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  isEmpty() {
    return !this.head && !this.tail;
    // !true
    // !false
  }

  append(node) {
    //always adding to end but be aware of the prev and next props
    //end could be head bc empty list else just literally append to end
    //if list is empty
    if (this.isEmpty()) this.head = this.tail = node;
    else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node; 
    }
  }

  detach(node) {
    //deleting the node completely while linking the neighbors
    //detaching list with only single node
    if (this.head === this.tail) this.head = this.tail = null;
    //dequeing with remaining list
    else if (this.head === node) {
      let nextHead = this.head.next
      nextHead.prev = null;
      this.head.next = null;
      this.head = nextHead; //tail is taken care of by append
    }
    //detaching from end //DETACH IT REGARDLESS.
    else if (this.tail === node) {
      let prev = this.tail.prev;
      this.tail.prev.next = null;
      this.tail.prev = null;
      this.tail = prev;
    }
    //detaching from middle
    else {
      node.prev.next = node.next;
      node.next.prev = node.prev;
      node.prev = node.next = null;
    }
  }
}

class LRUcache {
  constructor(capacity) {
    this.keys = new Map();
    this.list = new List();
    this.capacity = capacity;
  }

  access(key) {
    let node = this.keys.get(key);
    if (!this.keys.get(key)) return -1;
    this.list.detach(this.keys.get(key));
    this.list.append(this.keys.get(key));
    return node;
    //no need to update map bc just accessing the SAME node, not deleting anything
  }
  isEmpty() {
    return this.keys.size() === 0;
  }

  add(key, zip) {
    //add shouldn't even know that there's a linkedlist at all.
    //empty list to create list and map
    let node = new Node(key, zip);

    //check if key valkey then take out and add to end with new zip
    if (this.keys.get(key)) {
      this.list.detach(this.keys.get(key));
      this.list.append(node);
      this.keys.set(key, node);
      //need to remember if there's only 1 node or think about deleting on both ends and mkeydle
      //write down what your variables are at each point in time when running through
    } else if (this.keys.size < this.capacity) {
      //if key not valkey then check map size if > capacit the dequeue enqueue
      this.keys.set(key, node);
      this.list.append(node);
    } else {
      this.keys.delete(this.list.head.key);
      this.list.detach(this.list.head);
      this.keys.set(key, node);
      this.list.append(node);
    }
  }
}