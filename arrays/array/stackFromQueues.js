/*
Implement the following operations of a stack using queues.

push(x) -- Push element x onto stack.
pop() -- Removes the element on top of the stack.
top() -- Get the top element.
empty() -- Return whether the stack is empty.
Example:

MyStack stack = new MyStack();

stack.push(1);
stack.push(2);  
stack.top();   // returns 2
stack.pop();   // returns 2
stack.empty(); // returns false
Notes:

You must use only standard operations of a queue -- which means only push to back, peek/pop from front, size, and is empty operations are valid.
Depending on your language, queue may not be supported natively. You may simulate a queue by using a list or deque (double-ended queue), as long as you use only standard operations of a queue.
You may assume that all operations are valid (for example, no pop or top operations will be called on an empty stack).
 */
/**
 * Initialize your data structure here.
 */
var MyStack = function() {
    this.q1 = new Queue();
    this.q2 = new Queue();
};

/**
 * Push element x onto stack. 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
   // already called new MyStack at this point 
   this.q1.enqueue(x);
};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function() {
    if (this.q1.size === 0) throw new Error("Empty queue, cannot pop")
    if (this.q1.size === 1) return this.q1.dequeue();
    while (this.q1.size > 1) {
        this.q2.enqueue(this.q1.dequeue())
    }
    const last = this.q1.dequeue()
    let temp = this.q2
    this.q2 = this.q1
    this.q1 = temp
    console.log("QQQ111", this.q1)
    console.log("QQQ2", this.q2)
    console.log("last", last)
    return last
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function() {
    if (this.q1.size === 0) return "empty"
    // console.log(this.q1.head.val) NOT just THIS.q1.val!!!
    if (this.q1.size === 1) return this.q1.head.val;
    while (this.q1.size > 1) {
        this.q2.enqueue(this.q1.dequeue())
    }
    const last = this.q1.dequeue()
    this.q2.enqueue(last)
    let temp = this.q2
    this.q2 = this.q1
    this.q1 = temp
    return last
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
  return this.q1.isEmpty();
};

/** 
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */

class Node {
    constructor(val=null) {
        this.val = val;
        this.next = null;
    }
}

class Queue {
    constructor() { 
        // this.storage = {}  //DO NO USE [] HERE BECAUSE WE'RE CREATING QUEUE CLASS AND WE ALSO CAN'T USE STACKS 
        //  linked lists are so much better!
        this.head = null //your queue is the head!
        this.tail = null
        this.size = 0
    }
    enqueue (val) { 
       if (!this.head) {
           this.head = new Node(val);
           this.tail = this.head;
           this.size = 1;
       } else {
           this.tail.next = new Node(val);
           this.tail = this.tail.next;
           this.size++;
       }
        
    }
    dequeue() {
      if (!this.head) throw new Error("Queue is empty"); //so it screams at coder instead of a regular printed string
      const head = this.head.val;
      this.head = this.head.next;
      this.size--;
      if(this.size === 0) this.tail = null; //going from size 1 to 0 ********************
      //MUST ALSO THINK OF IF ONYL 1 ITEM AND NOW QUEUE IS EMPTY, CANNOT LET TAIL STILL POINT TO THAT ORIGINAL 1 NODE THAT YOU JUST DEQUEUED FROM HEAD
      // BOTH POINTERS SHOULD POINT TO NULL.
      //when initialize the queue, head and tail both points to null so if we remove that single item then the state of null should be the same
      //so empty q should have reference to nothing.
      return head;
    }

   
    isEmpty() {
        return this.size === 0;
    }
}

/*test case
empty queue exception
non empty queue size
dequeue
enqueue
 */
let cases = [                   //context = this    context is the previous cb
    ["empty Queue.deQueue",  () => {
        const queue = new Queue()
        try {
            queue.dequeue()
        }
        catch(error) {
            if (error.message === "Queue is empty") return true;
            return false; //if other error messages then there's something wrong with the code there.
        }
    }], 
    ["nonempty Queue.deQueue", () => {
        let queue = new Queue();
        queue.enqueue(1);
        queue.enqueue(2);
        return queue.dequeue() === 1;
        //no try and catch bc we don't EXPECT there to be an exception
    } ] //want to make sure there's an error
]

cases.forEach(([scenario,assertion]) => {
    if (!assertion()) console.log(`${scenario} failed `)
})
//use try and catch so you can catch the error but not stop the entire program when the error happens vs throw which will stop the program
//we want to test multiple so catch the error and handle it by...
let stack = new MyStack();
// console.log(stack, '1')
stack.push(1);

// stack.push(2);
// stack.push(3);
// console.log(stack, '2')

// console.log(stack, '3')  
// console.log(stack.empty())
// stack.pop()// returns 1
console.log(stack.top(), 'toppppppp')   // returns 2
// console.log(stack.pop())
// console.log(stack.pop())
// console.log(stack.pop())
// stack.pop(); 
// console.log(stack, '4')
// stack.empty();