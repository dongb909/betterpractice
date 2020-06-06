//Create a linked list

class Node {
  constructor(data, next=null){
    this.data = data;
    this.next = next;
  }
}
// let createList = (arr) =>{    NOT A FUNCTION

class LinkedList {
  constructor() {
    this.head=null;
    this.size=0;
  }

  insertToFront(data){
    this.head=(new Node(data), this.head);
    this.size ++
  } 

  insertLastNode (data){
    let node = new Node(data);
    let current;

    if(!this.head){
      this.head=node;
    } else {
      while(current.next){
        current=current.next
      }
      current.next = node;
    }
    this.size++;
  }

  insertAtIndex(data, index){
    //account for negative numbers which shouldn't be allowed
    if (this.size < index) return
    if(index===0) {
      this.insertToFront(data);
      return;
    }
    let current=this.head;
    let count=0    
    let previous;
    let node = new Node(data);
    while(count<index){
      previous=current
      current=current.next;
      count++
    }
    node.next=current;
    previous.next=node;
    this.size++
    return;
  }

  getAtIndex(index){
    if (this.size < index && index>0) return;
    if (index===0) return this.head;
  
    let current=this.head;
    let count=0;
    // while(count<index && current){
    //   current=current.next
    //   count ++
    // }
    // return current.data      no because what if while loop doesn't get to index, no node.data would equal null, only node.next does

    while(current){
      if(index===count) return current.data;
      current=current.next;
      count++
    }
    return null;
  }

  removeAtIndex(index){
    if(index>this.size && index>0) return
    let current=this.head;
    let previous;
    let count=0;
    //bc we don't set prev here
    if(index===0) this.head=current.next 
    else {
      while(count<index){
        count++
        previous=current;
        current=current.next;
  
      }
      previous.next=current.next
    }
    this.size--
  }

  clearList(){
    this.head=null;
    this.size=0;
  }

  printListData(){
    let current=this.head;
    while(current){
      console.log(current.data)
      current=current.next
    }
  }
}

let ll= new LinkedList();

