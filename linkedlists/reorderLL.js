/*Given a singly linked list L: L0→L1→…→Ln-1→Ln,
reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→…

You may not modify the values in the list's nodes, only nodes itself may be changed.

Example 1:

Given 1->2->3->4, reorder it to 1->4->2->3.
Example 2:

Given 1->2->3->4->5, reorder it to 1->5->2->4->3.
Accepted
205,711
Submissions
590,035
Seen this question in a real interview before?*/
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */

// function ListNode(val) {
//   this.val = val;
//   this.next = null;
// }
// let l1 = new ListNode(1);
// l1.next =  new ListNode(2)
// // l1.next.next = new ListNode(3)
// // l1.next.next.next = new ListNode(4)
// let l2 = new ListNode(4);
// l2.next =  new ListNode(3)


// var reorderList = function(head) {
//   if (head === null || head.next === null) return;
//     let slow=head;
//     let fast=head;
//     let firstTail=null;
//     //just iterate through entire list to find the head and tail of segment
//     while(fast !== null && fast.next!== null){
//       firstTail=slow;
//       slow=slow.next;
//       fast=fast.next.next;
//     }
//     //separate list
//     firstTail.next=null;
//     // console.log('norm', head)
//     // console.log('new', slow)
//     //reverse 2nd half
//     slow = reverse(slow)
//     // console.log('reverse', slow)
//     //merge lists
//     return merge(head, slow);
// };

// let reverse = (head)=>{
//   let prev = null;
//   while(head) {
//     //keep track of original list
//     let next = head.next;
//     //let new head.next to previous new list
//     head.next = prev
//     //update prev head
//     prev = head
//     //update head to next node
//     head = next
//   }
//   return prev
// }

// let merge=(l1, l2) => {
//   if (!l1 || !l2) return l1||l2;
//   let head = l1
//   let current=head
//   l1=l1.next
//   // console.log('l222222222', l2)
//   // console.log('currrrrrrrrrrrrrrr1', current)
//   while (l1 && l2) {
//     // console.log('curr2', current)
//     current.next=l2;
    
//     l2=l2.next;     //must do this first or else current is forever linked to l2 which current.next.next would not make snse
//     // console.log('l11111111', l1)
//     // console.log('l22222',l2)
//     current.next.next=l1;
//     l1=l1.next;
//     current=current.next.next;
//   }
//   // console.log('l1', l1)
//   !l1 ? current.next=l2: current.next=l1;
//   // console.log('hi',head)

//   return head
// }

// console.log(merge(l1,l2))



/*var reorderList = function(head) {
  if (!head || !head.next) return;
  let cur = head,
      arr = [];
  while (cur) {
    arr.push(cur);
    cur = cur.next;
  }
  let left = 0,
      right = arr.length - 1;
  while (left < right) {
    arr[left].next = arr[right];
    left++;
    arr[right].next = arr[left];
    right--;
  }
  arr[left].next = null;
}; */

/*var reorderList = function(head) {
    if(!head || !head.next) return null;
    let pre = new ListNode();
    pre.next = head;
    let slow = head, fast = head;
    while(fast && fast.next){
        pre = pre.next;
        slow = slow.next;
        fast = fast.next.next;
    }
    pre.next = null;
    let second = reverse(slow);
    merge(head, second);
    return head;
};

function merge(l1, l2){
    while(l1){
        let next1 = l1.next;
        let next2 = l2.next;
        l1.next = l2;
        if (next1 == null) break;
        l2.next = next1;
        l1 = next1;
        l2 = next2;
    }
}

function reverse(head){
    let pre = null;
    while(head){
        let next = head.next;
        head.next = pre;
        pre = head;
        head = next;
    }
    return pre;
} */


/*
var reorderList = function(head) {
    if (!head || !head.next || !head.next.next) {
        return head;
    };
    let n = 1;
    let tail = head;
    const nodeList = [];
    while (tail !== null) {
        nodeList.push(tail);
        tail = tail.next;
        n++;
    }
    
    while (nodeList.length > 2) {
        const tempHead = nodeList.shift();
        const tempTail = nodeList.pop();
        const temp = tempHead.next;
        tempHead.next = tempTail;
        tempTail.next = temp;
    }
    nodeList.pop().next = null;
    return head;
}; */