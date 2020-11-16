/*Given a singly linked list L: L0→L1→…→Ln-1→Ln,
reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→…
You may not modify the values in the list's nodes, only nodes itself may be changed.

Example 1:
Given 1->2->3->4, reorder it to 1->4->2->3.
Example 2:
Given 1->2->3->4->5, reorder it to 1->5->2->4->3.
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
//     //reverse 2nd half
//     slow = reverse(slow)
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


var reorderList = function(head) { //only use this if you're allowed to use more space which is the array
  if (!head || !head.next) return;
  let cur = head,
      arr = [];
  while (cur) {
    arr.push(cur);
    cur = cur.next;
  } //now have arr of NODES (NOT JUST THE VALUES) in original order
  let left = 0
  let right = arr.length - 1;
  while (left < right) {        //not even modifying the values of the nodes but the nodes themselves are being linked different. OR can just switch out the vals and leave nodes there
    arr[left].next = arr[right];
    left++;     //incrementing the INDEX that holds the NODE REFERENCES
    arr[right].next = arr[left];//THIS IS THE NEXT LEFT NODE, not the SAME LEFT node you just added right to
    right--;
  }
  arr[left].next = null;
}; 

//OR have a fast and slow pointer, split the list, reverse 2nd half and then merge but this is a lot of steps. this is fine if you don't have more space