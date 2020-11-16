/*Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.
Example:
Input:
[
  1->4->5,
  1->3->4,
  2->6
]
Output: 1->1->2->3->4->4->5->6 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}

var mergeKLists = function (lists) {
  //min heap of k size, the smallest head and the list it belongs to.
  let head = new Node("dummy");
  let tail = head;
  let minHeap = new minHeap((a, b) => a.val - b.val);
  for (let i = 0; i < lists.length; i++) {
    //i = name of list            O(k)
    let node = list[i];
    if (minHeap.size() < lists.length) {
      minHeap.add(node);
    }
  }
  while (minHeap.size() > 0) {
    //  O(logk) even though popping from heap, not reducing heap size every time
    let listHead = minHeap.pop(); //max time add heap
    tail.next = listHead;
    tail = tail.next;
    listHead = listHead.next;
    if (listHead) minHeap.add(listHead);
  }
  return head.next;
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

//PRACTICE , using arrays as minheap
var mergeKLists2 = function (lists) {
  let resultHead = new ListNode("dummy");
  let tail = resultHead;
  const minHeap = [];
  //add all list heads to minHeap aka just the lists[i] themselves since they represent the heads
  for (let list of lists) minHeap.push(list);
  //now order the 'heap' by first node vals since the lists themselves are ordered
  minHeap.sort((a, b) => a.val - b.val);
  // console.log(minHeap);
  //while list of lists is not empty < =====NOOOOO don't do this. see next line notes
  // while (lists.length) {//NO DO NOT DO THIS!!! BC THERE'S NO WAY FOR YOU TO SELECTIVELY POP/UNSHIFT FROM MIDDLE LIST FOR EXAMPLE
  while (minHeap.length > 0) {
    //   //'![]' IS NOT A THING!!!!!!! NEITHER IS !lists
    let currMinNode = minHeap.shift();
    tail.next = currMinNode;
    tail = tail.next;
    if (currMinNode.next) {
      //if next node is not null
      minHeap.push(currMinNode.next);
      minHeap.sort((a, b) => a.val - b.val); //add next node in list to heap
      currMinNode.next = null; //detach from original list
    }
  }
  return resultHead.next.next.next.next.next.next;
};

let list1 = new ListNode(1);
list1.next = new ListNode(4);
list1.next.next = new ListNode(5);
let list2 = new ListNode(1);
list2.next = new ListNode(3);
list2.next.next = new ListNode(4);
let list3 = new ListNode(2);
list3.next = new ListNode(6);
// console.log(list1, list2, list3);

console.log(mergeKLists2([list1, list2, list3])); //1->1->2->3->4->4->5->6
