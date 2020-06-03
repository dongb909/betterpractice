/*Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.

Example:

Input: 1->2->4, 1->3->4
Output: 1->1->2->3->4->4

 * Definition for singly-linked list.
 * }
 */

import { program } from "@babel/types";

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
// let l1=new ListNode();
let l2= new ListNode(1);
l2.next=  new ListNode(3)
l2.next.next= new ListNode(4)

// // console.log(l1, l2)
// var mergeTwoLists = function(l1, l2) {
//   // let l3; NOT CREATING A NEW LIST BUT MERGING THEM
//   let head=null;
//   let currentNode;
//   if(!l1 && !l2){
//     return head;
//   } else if (!l1) {
//    return l2;
//   } else if(!l2) {
//     return l1;      //RETURN!!!! don't set l3= because it will continue to the rest of the fnc which wastes time AND goes to the last if and adds in the empty list aka undefine into next node
//   } else {
//     if(l1.val<=l2.val){
//       head=l1
//       currentNode=l1
//       l1=l1.next
//     } else {
//       head=l2;
//       currentNode=l2;
//       l2=l2.next;
//     }
//   }
//   while(l1!==null && l2!==null){   
//       //NOT !l1 &&!l2 !! don't work
//       console.log('l1', l1)
//       console.log('l2', l2)
//       if(l1.val<=l2.val){
//         currentNode.next=l1  //4
//         l1=l1.next  //null
//         //l2=4
        
//       } else {
//         currentNode.next=l2;
//         l2=l2.next;
        
//       }
//       currentNode=currentNode.next //4
//       // console.log(currentNode.next)
//       // console.log('head', head)
//       console.log('current', currentNode)
//     }
//     // console.log(currentNode)
//   if(!l1) {
//     currentNode.next=l2;
//     console.log('l2222', l2)
//   }
//   if (!l2) {
//     currentNode.next=l1;
//   }
  
//   return head
// }


// var mergeTwoLists = function(l1, l2) {
//   let head, currentNode;
//   if(!l1 && !l2) return null;
//   if (!l1) return l2;
//   if (!l2) return l1;
//   //setting first node
//   currentNode = head = l1.val <=l2.val? l1:l2;

//   while(l1 && l2) {

//   }

// }




/*var mergeTwoLists = function(l1, l2) {
    if (!l1) return l2;
    if (!l2) return l1;
    let root = new ListNode();
    let result = root;
    while (l1 || l2) {
        if (!l2 || !l1) {
            root.next = l1 ? l1 : l2;
            l1 ?  (l1 = l1.next) : (l2 = l2.next);
            root = root.next;
            continue;
        }
        if (l1.val >= l2.val) {
            root.next = l2;
            l2 = l2.next;
            root = root.next;
            continue;
        }
        else {
            root.next = l1;
            l1 = l1.next;
            root = root.next;
            continue;
        }
    }
    
    return result.next;
}; */





/*var mergeTwoLists = function(l1, l2) {
    let ListNode = { val: null, next: null };
    let current = ListNode;

    while (l1 != null || l2 != null) {
        if (l1 === null) {
            current.next = l2;
            l2 = l2.null;
            continue;
        }
        if (l2 === null) {
            current.next = l1;
            l1 = l1.null;
            continue;
        }

        if (l1.val <= l2.val) {
            current.next = l1;
            l1 = l1.next;
        } else {
            current.next = l2;
            l2 = l2.next;
        }

        current = current.next;
    }

    return ListNode.next;
}; */




/*
var mergeTwoLists = function(l1, l2) {
  if (!l1 || !l2) return l1 || l2;
  
  const prehead = new ListNode(-1);
  let prev = prehead;
  
  while (l1 && l2) {
      if (l1.val <= l2.val) {
          prev.next = l1;
          l1 = l1.next;
      } else {
          prev.next = l2;
          l2 = l2.next;
      }
      prev = prev.next;
  }
  
  prev.next = l1 || l2;
  
  return prehead.next;
};
*/


/*var mergeTwoLists = function(l1, l2) {
  let result = { val: null, next: null};
  let head = result;
  let current;
  while (l1 || l2) {
    if (!l1) {
      current = l2;
      l2 = l2.next
    } else if (!l2) {
      current = l1;
      l1 = l1.next;
    } else if (l1.val <= l2.val) {
      current = l1;
      l1 = l1.next;
    } else {
      current = l2;
      l2 = l2.next
    }
    result.next = { val: current.val, next: null }
    result = result.next;
  }
  return head.next;    
}; */


// let mergeTwoLists= (l1, l2)=> {
//   if (!l1||!l2) return l1 || l2; //if neither then nothing returns
//   let head, current;
//   l1.val <=l2.val ? (head=current=l1, l1=l1.next) : (head=current=l2, l2=l2.next);
  
//   while(l1 && l2) {
//     if (l1.val <=l2.val) {
//       current.next = l1;
//       current = current.next;
//        l1 = l1.next;
//     } else {
//         current.next = l2;
//         current= current.next;
//         l2 = l2.next;
//     }
//   }

//   !l1 ? current.next = l2 : current.next=l1;

//   return head

// }
// 94%

//RECURSIVELY
let mergeTwoLists= (l1, l2)=> {
  //this will catch all eventually empty list
  //will return either this function or return for the last function to be the last node.next
  if (!l1||!l2) return l1 || l2;
  let node;
  //so now they both should exist so no need for conditional for that
  if(l1.val <= l2.val) {
    node = l1;
    node.next = mergeTwoLists(l1.next, l2); //NOT .next for both. only the one set
  } else {
    node = l2;
    node.next = mergeTwoLists(l1, l2.next);
  }
  return node;
  
}



//IN PLACE ITERATIVELY
let mergeTwoLists= (l1, l2)=> {
  if (!l1||!l2) return l1 || l2;
  // let pointer1 = l1; //NOOOO
  // let pointer2 = l2;
  let head, tail;

  while(l1 && l2) {
    if(l1 >= l2) {
      if (!head) head = l1 = tail
      else {
        tail.next = l1
        tail = tail.next
      }
      l1 = l1.next
    } else {
      if (!head) head = l2 = tail
      else {
        tail.next = l2
        tail = tail.next
      }
      l2 = l2.next
    }
  }
  if(!l1) tail.next = l2  //don't care to update tail bc we're done anyways
  if(!l2) tail.next - l1
  return head
}



// let i = 5
// let j = null
// let mergeTwoLists= (hi,bye)=> {if(!i||!j) return j || i}



console.log(mergeTwoLists(l1, l2))


4088857850 coumadin clinic anticoag clinic. from kristi pham called me yesterday to enroll mom into the program.