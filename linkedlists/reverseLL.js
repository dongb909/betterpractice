/*Reverse a singly linked head.

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
//iterative
// var reverseList = function(head) {
//     let prev = null; //is pretty much the head of the reversed list
//     while (head){
//       //keep track of next node before unlinking the current node
//       let next = head.next;
//       //link current node to the reversed list
//       head.next = prev;
//       //make the new node the new head of the reversed list
//       prev = head;
//       //set current node to the next node to work on  aka head
//       head = next;
//     }
//     return head;
// };

const reverseLL = (head) => {
  //need to put the actual HEAD, not just the ll.
  let prev = null;
  while (head && head.next) {
    //MUST DO HEAD.NEXT TOO OR ELSE WILL BE RETURNING HEAD = NULL
    let next = head.next;
    head.next = prev;
    prev = head;
    head = next;
    // console.log('hiiiiiiiiiiiiiii',head);
  }
  head.next = prev; //MUST HAVE THIS HERE!!!
  // console.log(head)
  return head;
};
//recursive

