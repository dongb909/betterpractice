/*Given a linked list, remove the n-th node from the end of list and return its head.
Example:
Given linked list: 1->2->3->4->5, and n = 2.

After removing the second node from the end, the linked list becomes 1->2->3->5.
Note:
Given n will always be valid.
Follow up:
Could you do this in one pass? */

// function ListNode(val) {
//       this.val = val;
//       this.next = null;
//   }
// var removeNthFromEnd = function(head, n) {
  // if(!head) return null;
  // if (n===0) return head;
  // //create dummy node
  // let dummy = new ListNode(0)
  // //link dummy node
  // dummy.next=head;
  // // let nodeBeforeDelete=dummy
  // //set head as endNode
  // let nodeBeforeDelete=head
  // let nodeAfterDelete= head
  // //get length btwn node to delete and end
  // for(let i = 1; i<n; i++){
  //   if (nodeAfterDelete===null) {
  //     return null //n is greater than list length
  //   }
  //   nodeAfterDelete=nodeAfterDelete.next;
  // }
  // //move pointers together
  // while(nodeAfterDelete !==null){
  //   nodeAfterDelete=nodeAfterDelete.next;
  //   nodeBeforeDelete=nodeBeforeDelete.next;
  // }
  // //delete node
  // // nodeBeforeDelete.next=nodeAfterDelete; NOOO
  // nodeBeforeDelete.next=nodeBeforeDelete.next.next
  // return dummy.next
    
// };
    // 1 2 3 4 5
    // length = 5
    // get last = 1
    // 5-1=4 

    //1 2   n=2
    
var removeNthFromEnd = function(head, n) {
  if(!head ||!n) return null;
  let dummyNode = new ListNode(0);
  dummyNode.next=head                //don't want to use just head because if need to delete first node, we don't have to set other conditions
  let prevToDel = dummyNode;
  //head will be the keeping track of the end of the list PRIOR TO node to be deleted NOT the node to delete and NOT the node AFTER delete
  //signifies the END of the list from n+1 //set distance between node before the delete to the end
  for (let i = 0; i<n; i++){ //if null then n is greater than list length
    if(!head) return null;
    head=head.next;
  }
  //move before and end together
  while (head !==null) {
    head=head.next;
    prevToDel=prevToDel.next;
  }
  //delete node
  prevToDel.next = prevToDel.next.next
  return dummyNode.next
}

/*
var removeNthFromEnd = function(head, n) {
  let tmp = new ListNode(0)  
  tmp.next = head
  
  let [slow, fast] = [tmp, tmp]
  for (let i = 0; i <= n; i++){
    fast = fast.next
  }
  while (fast.next != null){
    fast = fast.next
    slow = slow.next
  }
  slow.next = slow.next.next
  return tmp.next
}; */