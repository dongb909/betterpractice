/*Implement the following operations of a queue using stacks.

push(x) -- Push element x to the back of queue.
pop() -- Removes the element from in front of queue.
peek() -- Get the front element.
empty() -- Return whether the queue is empty.
Example:

MyQueue queue = new MyQueue();

queue.push(1);
queue.push(2);  
queue.peek();  // returns 1
queue.pop();   // returns 1
queue.empty(); // returns false
Notes:

You must use only standard operations of a stack -- which means only push to top, peek/pop from top, size, and is empty operations are valid.
Depending on your language, stack may not be supported natively. You may simulate a stack by using a list or deque (double-ended queue), as long as you use only standard operations of a stack.
You may assume that all operations are valid (for example, no pop or peek operations will be called on an empty queue). */

/**
 * Initialize your data structure here.
 */
var MyQueue = function() {
    this.s1 = []
    this.s2 = []
};
//don't need to implement a stach bc js array is already stack like
/**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {    //really supposed to be enqueue
    this.s1.push(x)
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() { //really supposed to be dequeue
    //stack is LILO
    if (this.s1.length === 0 && this.s2.length === 0) throw new Error("Empty queue")
    if (this.s2.length > 0) return this.s2.pop()
    while(this.s1.length > 1) {
      this.s2.push(this.s1.pop())
    }
    return this.s1.pop()
  
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
  // if (this.empty) return "Empty"
  if (this.s1.length === 0 && this.s2.length === 0) return "Empty"
  if (this.s2.length > 0) return this.s2[this.s2.length-1]
  return this.s1[0]
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
  return this.s1.length === 0 && this.s2.length === 0 ? true : false; 
};

/** 
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */



let queue = new MyQueue()
queue.push(1)
queue.push(2)
queue.push(3)
console.log(queue)
// queue.pop()
// console.log(queue.pop())
// queue.pop()
// console.log(queue.empty())
console.log(queue.peek())
