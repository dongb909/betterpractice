/*
Share
Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.

Example:

Input:
[
  1->4->5,
  1->3->4,
  2->6
]
Output: 1->1->2->3->4->4->5->6
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  //min heap of k size, the smallest head and the list it belongs to.
  let head = new Node("dummy");
  let tail = head
  let minHeap = new minHeap((a,b) => a.val - b.val)
  for (let i = 0; i<lists.length; i++){ //i = name of list            O(k)
      let node = list[i]
      if (minHeap.size() < lists.length) {
          minHeap.add(node)
      }
  }
  
  while(minHeap.size() > 0){                         //  O(logk) even though popping from heap, not reducing heap size every time
     let listHead = minHeap.pop()                     //max time add heap 
     tail.next = listHead
     tail = tail.next
     listHead = listHead.next
     if(listHead) minHeap.add(listHead) 
  }
  return head.next
};

/*
go through each listhead and add node to minHeap 
that's just going through first heads
reached k heap size
k = lists.length
heapify = logk
if dump everything in then it's maxLL*k*log(k*maxLL)
pop min out of heap and add to result but detach from its list, thus, move head of that list over
but that gives you the head of the next node to add so you don't have to iterate throuhg list again!!!!!!!!!!!
if head = null, then just pop next min and do same until no more nodes in minHeap
return
time: maxLL*k*logk
space: O(1) + O(k) = O(k)
*/