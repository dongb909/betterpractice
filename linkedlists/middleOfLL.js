/*Given a non-empty, singly linked list with head node head, return a middle node of linked list.

If there are two middle nodes, return the second middle node.

 

Example 1:

Input: [1,2,3,4,5]
Output: Node 3 from this list (Serialization: [3,4,5])
The returned node has value 3.  (The judge's serialization of this node is [3,4,5]).
Note that we returned a ListNode object ans, such that:
ans.val = 3, ans.next.val = 4, ans.next.next.val = 5, and ans.next.next.next = NULL.
Example 2:

Input: [1,2,3,4,5,6]
Output: Node 4 from this list (Serialization: [4,5,6])
Since the list has two middle nodes with values 3 and 4, we return the second one. */


var middleNode = function(head) {
  if(!head) return null;
  let fast=head;
  let slow = head;
  while(fast && fast.next) {
      slow = slow.next
      fast=fast.next.next
  }
  return slow
  
};

/**var middleNode = function(head) {
    let total = 0;
    let newHead = head;
    while(newHead) {
        total += 1;
        newHead = newHead.next;
    }
    const middle = Math.floor(total / 2);
    let count = 0;
    let result = head;
    while (count++ < middle) {
        result = result.next;
    }
    return result;
}; */



/*var middleNode = function(head) {
    let slow = head;
    let fast = head;
  
    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next && fast.next.next;
    }
  
    return slow;
}; */

/*var middleNode = function(head) {
    let count = 1;
    let iter = head
    while(iter.next){
        iter=iter.next
        count++
    }
    console.log(count)
    if(count%2===0) count = count/2
    else{count = Math.ceil(count/2)-1}
    console.log(count)
    while(count){
        head=head.next;
        count--;
    }
    return head
}; */