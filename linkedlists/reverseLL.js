/*Reverse a singly linked head.

Example:

Input: 1->2->3->4->5->NULL
Output: 5->4->3->2->1->NULL
Follow up:

A linked list can be reversed either iteratively or recursively. Could you implement both?*/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let prev = null; //is pretty much the head of the reversed list
    while (head){
      //keep track of next node before unlinking the current node
      let next = head.next;
      //link current node to the reversed list
      head.next = prev;
      //make the new node the new head of the reversed list
      prev = head;
      //set current node to the next node to work on  aka head
      head = next;
    }
    return head;
};


/*var reverseList = function(head) {
    let prevNode = null
    while (head != null) {
        let nextNode = head.next
        head.next = prevNode
        prevNode = head
        head = nextNode
    }
    return prevNode
}; */

/*var reverseList = function(head) {
    
    let prev = null
    let current = head
    
    while (current !== null) {
        let nextNode = current.next
        current.next = prev
        prev = current
        current = nextNode
    }
    
    return prev
    
}; */