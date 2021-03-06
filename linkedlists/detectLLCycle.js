/*Given a linked list, determine if it has a cycle in it.
To represent a cycle in the given linked list, we use an integer pos which represents 
the position (0-indexed) in the linked list where tail connects to. If pos is -1, then
 there is no cycle in the linked list.

Example 1:

Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where tail connects to the second node.


Example 2:

Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where tail connects to the first node.


Example 3:

Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.
Follow up:
Can you solve it using O(1) (i.e. constant) memory? 

 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }

 //mine
// var hasCycle = function(head) {
//     if(!head ||!head.next) return false;

//     let slow = head;
//     let fast = head.next;
//     while (slow !== fast) {
//       if (fast === null || fast.next ===null) {
//         return false; //don't have to check slow because fast is further down the list anyways
//       }
//       slow = slow.next;
//       fast = fast.next.next;
//     }
//     return true;
// };
*/
/*var hasCycle = function(head) {
    var slow=head;
    var fast=head;
    
    while(fast!=null && fast.next!=null){
        slow=slow.next;
        fast=fast.next.next;
        if(slow===fast){return true;}
    }
    
    return false;
}; */

// var hasCycle = function(head) {
//   if (!head || !head.next) return false;  //bc there's no list or there's just 1 node thus no cycle possible
//   let slow = head,
//       fast = head.next;
//   while (fast && fast.next) {
//     if (slow === fast) return true;
//     slow = slow.next;
//     fast = fast.next.next;
//   }
//   return false;
// };

const hasCycle2 = function (head) {
  if (!head || !head.next) return false; //bc there's no list or there's just 1 node thus no cycle possible
  let slow = head,
    fast = head;
  while (fast && fast.next) {
    //if there's a cycle, slow.next AND fast.next will NEVER = null so if with 1 run, they don't equal, they eventually will
    slow = slow.next; //move slow by 1
    fast = fast.next.next; //move fast by 2
    if (slow === fast) return true;
  }
  return false; //reached null before finding a cycle
};
