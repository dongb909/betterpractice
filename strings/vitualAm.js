/** Implement LRU Cache
* integer get(integer key); returns value
* void put(integer key, integer value); returns nothing
* 
* For Example:
* cacheSize = 2;
* 
* put(1,1);  cache= {(1,1)} key = num, val = num
* put(2,2);  cache= {(1,1), (2,2)}
* get(1);
* put(3,3);  cache= {(3,3), (1,1)}
**/
//eviction criteria

class Node{
    constructor(key, val){
        this.key = key;
        this.val = val;
        this.prev=this.next=null;
    }
}

class List {
    constructor(){
        this.head = null
        this.tail = null
    }
    
    add(node){
        
    }
    remove(node){
        //if there's no list
        //if node = head
        //if head = tail
        //if node middle then 
        //if node tail
    }
    
}

class Cache{
    constructor(capacity){
        this.list = new List()
        this.cache = new Map()
        this.capacity= capacity
    }
    
    get(key){
        if(this.cache.size() === 0 || !this.cache.has(key)) return -1;
        let node = this.cache.get(key);
        remove(node);
        add(node);
        return [node.key, node.val];
    }
    
    put(key,value){  //cache 3, key in cache, now add same key
        let node = new Node(key,value);
        if(this.cache.get(key)){
            this.list.delete(this.cache.get(key));
            this.cache.delete(key);
        } else if(this.cache.size() >= this.capacity) {
            let leastUsed = this.list.head
            this.cache.delete(leastUsed);
            this.list.remove(leastUsed);
        }
        this.cache.set(key, node);
        this.list.add(node);
    }
    
}