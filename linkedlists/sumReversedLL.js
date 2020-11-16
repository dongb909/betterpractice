/*You are given two non-empty linked lists representing two non-negative integers. 
The digits are stored in reverse order and each of their nodes contain a single digit. 
Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example:

Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8 //i mean really this is IN ORDER
Explanation: 342 + 465 = 807. */

//no need to check for edge cases, already specified
//very straight forward, two pointers and a carry to make a new list
class Node {
  constructor(data){
    this.val = data
    this.next = null
  }
}
let l1 = new Node(2);
l1.next =  new Node(4)
l1.next.next = new Node(3)
// l1.next.next.next = new Node(4)
let l2 = new Node(5);
l2.next =  new Node(6)
l2.next.next = new Node(4)

var addTwoNumbers = function(l1, l2) {
  if (!l1 || !l2) return l1||l2
  let l3 = new Node(0)
  let current = l3
  let carry=0
  while (l1 !==null || l2!==null) {  //NOT !l2
    let l1val = l1 ?  l1.val:0;
    let l2val = l2  ? l2.val:0;  
    let sum = l1val + l2val + carry
    carry = sum > 9 ? 1 : 0;
    current.next = new Node(sum%10)
    current=current.next
    console.log('333333',10%10)
    // console.log('hiiii', current)
    if(l1!== null) l1=l1.next
    if (l2!== null) l2=l2.next
    
  }
  if (carry>0) {
    current.next = new Node(1)
  }
    return l3.next
};

console.log(addTwoNumbers(l1,l2))


/*var addTwoNumbers = function(l1, l2, carry = null) {
    let node = null
    if (l1 || l2) {
        const val1 = l1 ? l1.val : 0;
        const val2 = l2 ? l2.val : 0;
        const next1 = l1 ? l1.next : null;
        const next2 = l2 ? l2.next : null;
        const val = val1 + val2 + (carry ? 1 : 0);
        node = new ListNode(val % 10)
        node.next = addTwoNumbers(next1, next2, val >= 10)
    } else if (carry) {
        node = new ListNode(1);
        node.next = null;
    }
    return node;
}; */

/*
const addTwoNumbers = (l1, l2) => {
  let p = l1;
  let q = l2;
  let carry = 0;
  const dummyNode = new ListNode(0);
  let curr = dummyNode;
  while (p || q) {
    let x = p ? p.val : 0;
    let y = q ? q.val : 0;
    const sum = x + y + carry;
    carry = parseInt(sum / 10);
    curr.next = new ListNode(sum % 10);
    curr = curr.next;
    if (p) p = p.next;
    if (q) q = q.next;
  }
  if (carry > 0) {
    curr.next = new ListNode(carry);
  }
  return dummyNode.next;
}; */


