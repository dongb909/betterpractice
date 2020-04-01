/*Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.

Example:

Input: 1->2->4, 1->3->4
Output: 1->1->2->3->4->4

 * Definition for singly-linked list.
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}
let l1= new ListNode(1);
l1.next=  new ListNode(2)
l1.next.next= new ListNode(4)
let l2= new ListNode(1);
l2.next=  new ListNode(3)
l2.next.next= new ListNode(4)

// console.log(l1, l2)
var mergeTwoLists = function(l1, l2) {
  // let l3; NOT CREATING A NEW LIST BUT MERGING THEM
  let l3=null;
  let p3;
  if(!l1 && !l2){
    return l3;
  } else if (!l1) {
    l3=l2;
  } else if(!l2) {
    l3=l1;
  } else {
    if(l1.val<=l2.val){
      l3=l1
      p3=l1
      l1=l1.next
    } else {
      l3=l2;
      p3=l2;
      l2=l2.next;
    }
  }
  while(l1!==null&& l2!==null){   
      //NOT !l1 &&!l2 !! don't work
    if(l1.val<=l2.val){
      p3.next=l1
      l1=l1.next
      
    } else {
      p3.next=l2;
      l2=l2.next;
      console.log('hiii',p3)
      }
    }
  // if(!l1) {
  //   p3.next=l2;
  // }
  // if (!l2) {
  //   p3.next=l1;
  // }
  
  return l3
}

console.log(mergeTwoLists(l1,l2))