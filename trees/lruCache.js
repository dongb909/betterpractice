
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

class Node{
    constructor(key,val){
        this.key = key
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

class List {
    constructor(){
        this.head = null;
        this.tail = null;
    }

    isEmpty(){
        return !this.head && !this.tail;
        // !true
        // !false
    }

    append(node){
        //always adding to end but be aware of the prev and next props
        if (this.isEmpty()) this.list.head = this.list.tail = node;
    }

    detach(node){
    //deleting the node completely while linking the neighbors

    }
}

class LRUcache {
    constructor(capacity){
        this.keys = new Map();
        this.list = new List();
        this.capacity = capacity;
    }
    
    access(key){
        if (!this.keys.get(key)) return null;
        return this.keys.get(key);
    }
    isEmpty(){
        return this.keys.size() === 0;
    }

    add(key, zip){ //add shouldn't even know that there's a linkedlist at all.
        //empty list to create list and map
        let node = new Node(key, zip);

        //check if key valkey then take out and add to end with new zip
        if (this.keys.get(key)) {
            let toDeta = this.keys.get(key);
            if(nodeToDel === this.list.head && nodeToDel === this.list.tail){ //only 1 node
                nodeToDel.val = node.val;
            } else if(nodeToDel === this.list.head) { // delete node from wherever is same process
                this.list.head = this.list.head.next; // add node is always to end no matter where it was previously
                nodeToDel.next = null;
                this.list.head.prev = null;
            } else if (nodeToDel === this.list.tail) {
                nodeToDel.val = node.val;
            } else {
                nodeToDel.prev.next = nodeToDel.next;
                nodeToDel.next.prev = nodeToDel.prev;
                //need to remember if there's only 1 node or think about deleting on both ends and mkeydle
                //write down what your variables are at each point in time when running through
            }
            this.keys.delete(key);
            this.keys.set(key, node);
            this.list.tail.next(node);
            node.prev = this.list.tail;
            this.list.tail = this.list.tail.next;
            return;
        }
        //if key not valkey then check map size if > capacit the dequeue enqueue
        else {
            if (this.keys.size() < this.capacity) {
                this.keys.set(key, node);
                this.list.tail.next(node);
                node.prev = this.list.tail;
                this.list.tail = this.list.tail.next;
                return;
            } else {
                let nodeToDel = this.list.head;
                nodeToDel.next.prev = null;
                this.list.head = this.list.head.next;
                this.keys.delete(need to have key in node for this case);
                this.keys.set(key, node);
                this.list.tail.next(node);
                node.prev = this.list.tail;
                this.list.tail = this.list.tail.next;
                return;
            }
        }
    }
    addToHead(node){

    }
    addToTail(node){

    }
    moveToTail(node){

    }
    deleteNode(node){

    }
}


// make it dry,
// need to find the mistakes when going through examples on your own
// should really think about edge cases prior
// you dkeyn't see the zip on line 38
// and then seeing the edgecases
// you were explaining your ASSUMPTION of what's happening not what actually happened!
// you were testing your own logic with assumptions.

