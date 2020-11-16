const { tsTypeAliasDeclaration } = require("@babel/types");

class Node {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  insertToFront(data) {
    //check if is first node (purely to set the tail) since the head will always be changed in this fucntion anyways
    const node = new Node(data);
    if (this.tail === null) this.tail = node;
    //dont' need to check if head.next is null bc node.next will be null or be the head val anyways
    node.next = this.head;
    this.head = node;
    this.size++;
    // console.log("new data inserted to front", this);
  }

  insertLastNode(data) {
    const node = new Node(data);
    this.tail.next = node;
    this.tail = node;
    this.size++;
    // console.log("new data inserted to back", this);
  }

  insertAtIndex(data, i) {
    //check size to see if even possible
    if (this.size < i) return "Cannot be added"; //can add if i = size bc can just insert Last Node
    if (this.size === i) {
      this.insertLastNode(data);
      return;
    }
    if (i === 0) {
      this.insertToFront(data);
      return;
    }
    let count = 0;
    let current = this.head;
    let previous;
    while (count < i) {
      previous = current; //you forgot to reference previous node in your first attempt
      current = current.next;
      count++;
    }
    const node = new Node(data);
    node.next = current;
    previous.next = node;
    this.size++;
    return;
  }

  getAtIndex(i) {
    let count = 0;
    if (i === 0) return this.head;
    if (i === this.size - 1) return this.tail;
    if (i < 0 || i >= this.size) return "No such index"; //you forgot to account for out of bounds
    let current = this.head;
    // while(count < i){    //could do this way but the latter is better
    //   current = current.next
    //   count++
    // }
    // return current
    while (current) {
      if (i === count) return current.val;
      count++;
      current = current.next;
      // console.log(count === i)
    }
    return "something went wrong with get index at";
  }

  removeAtIndex(i) {
    let current = this.head;
    if (i === 0) {
      this.head = current.next;
      current.next = null;
    }
    let prev;
    let count = 0;
    //must use this method to get to last node as well since is a singly linked list
    while (current) {
      if (count === i) {
        prev.next = current.next;
        current.next = null;
      }
      prev = current;
      current = current.next;
      count++;
    }
    this.size--;
  }

  clearList() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  printListData() {
    let current = this.head;
    while (current) {
      console.log(current.val);
      current = current.next;
    }
  }
}

let ll = new LinkedList();
// ll.insertToFront(1);
// ll.insertLastNode(2);
// ll.insertLastNode(3);
// // ll.insertLastNode(4)
// ll.insertLastNode(5);
// ll.insertAtIndex(4, 3);
// console.log(ll.getAtIndex(3))
// ll.removeAtIndex(3)
// console.log(ll.size)
// ll.printListData()

//ITERATIVE REVERSING LL
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
// reverseLL(ll.head);
// console.log(reverseLL(ll.head));
// console.log(ll)
// ll.printListData()

// ll.insertToFront(7);
// ll.insertLastNode(2);
// ll.insertLastNode(4);
// ll.insertLastNode(3);

let ll2 = new LinkedList();
// ll2.insertToFront(5);
// ll2.insertLastNode(6);
// ll2.insertLastNode(4);

// ll.printListData()
// ll2.printListData()

//sum 2 ll without reversing it
const sum2LL = (l1, l2) => {
  //get the numbers in the same order bc you'll just be popping it later in the right order
  let nums1 = [];
  let nums2 = [];

  while (l1) {
    nums1.push(l1.val);
    l1 = l1.next;
  }
  while (l2) {
    nums2.push(l2.val);
    l2 = l2.next;
  }
  // console.log(nums1, nums2) [ 7, 2, 4, 3 ] [ 5, 6, 4 ]
  //add the 2 arrays and put digit into new list
  const l3 = new LinkedList();
  let carry = 0,
    currentSum = 0;
  //NOT THE BELLOW BECAUSE YOU'RE DOING && THAT'LL BE EXTRA STEPS LATER
  // while(nums1.length > 0 && nums2.length>0){
  //   currentSum = nums1.pop() + nums2.pop() + carry
  //   carry = currentSum > 9 ? 1 : 0
  //   l3.insertToFront(currentSum % 10)
  // }
  // //check if both are empty then return
  // if(nums1.length === 0 && nums2.length === 0) return l3 //or can completely not have this and return at the end
  // //now 1 list is empty so account for the remaining list and carried number
  while (nums1.length || nums2.length) {
    //set for while either so the loop keeps going
    if (nums1.length) currentSum += nums1.pop();
    if (nums2.length) currentSum += nums2.pop();
    if (carry) currentSum += carry;
    l3.insertToFront(currentSum % 10);
    carry = currentSum > 9 ? 1 : 0; //for next round
    currentSum = 0; //reset for next round
  }
  //if there's still a carry after
  if (carry) l3.insertToFront(carry);
  l3.printListData();
  return l3;
};
// sum2LL(ll.head, ll2.head);

// ll.insertToFront(2);
// ll.insertLastNode(4);
// ll.insertLastNode(3);

// ll2.insertToFront(5);
// ll2.insertLastNode(6);
// ll2.insertLastNode(4);

//(2 -> 4 -> 3) + (5 -> 6 -> 4) = 7=>0=>8  342 + 465 = 807. really just adding IN ORDER bc the ones are at the head already
const sumReversedLL = (l1, l2) => {
  //remember to account for if uneven lists
  let l3 = new Node(null),
    currSum = 0,
    carry = 0,
    head = l3; //start with a dummy node so don't have to worry about extra steps
  while (l1 || l2) {
    //if node is present
    if (l1) {
      currSum += l1.val;
      l1 = l1.next;
    }
    if (l2) {
      currSum += l2.val;
      l2 = l2.next;
    }
    if (carry) currSum += carry;
    console.log(currSum);
    carry = currSum > 9 ? 1 : 0;
    head.next = new Node(currSum % 10);
    head = head.next;
    currSum = 0; //MUST RESET THIS!!
  }
  if (carry) head.next = new Node(carry);
  return l3.next;
};

// console.log(sumReversedLL(ll.head, ll2.head))

// ll.insertToFront(1);
// ll.insertLastNode(2);
// ll.insertLastNode(4);

// ll2.insertToFront(2);
// ll2.insertLastNode(3);
// ll2.insertLastNode(5);

//recursive
function mergeSortedLL(l1, l2) {
  if (!l1 || !l2) return l1 || l2;
  let node;
  if (l1.val <= l2.val) {
    node = l1;
    node.next = mergeSortedLL(l1.next, l2);
  } else {
    node = l2;
    node.next = mergeSortedLL(l1, l2.next);
  }
  return node;
}

//Iterative
function mergeSortedLL2(l1, l2) {
  if (!l1 || !l2) return l1 || l2;
  let head, tail;
  // while (l1 || l2) { //BETTER TO DO && so you don't have so many redundant ifs
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      if (!head) {
        head = l1; //YOU HAD A HUGE BUG BY DOING HEAD = l1 = TAIL. NEVER DO THIS EVER!!
        tail = l1;
      } else {
        tail.next = l1;
        tail = tail.next;
      }
      l1 = l1.next;
    } else {
      if (!head) head = l2 = tail;
      else {
        tail.next = l2;
        tail = tail.next;
      }
      l2 = l2.next;
    }
  }
  if (!l1) tail.next = l2;
  if (!l2) tail.next = l1;
  // console.log(tail);
  return head;
}

// console.log(mergeSortedLL(ll.head, ll2.head));

function removeNthFromLL(ll, n) {
  //THIS REMOVES FROM NTH FROM HEAD
  if (!ll || !n) return null;
  if ((n = 0)) return ll.next;
  //ll is head already
  //keep track of prev to target node
  let prev = ll; //head node is index 0 already which is already accounted for above
  for (let i = 1; i < n - 1; i++) {
    //so if want 5th place from start, that's the 4th index, we want the 3rd index then so go up to <n-1, NOT <n
    prev = prev.next;
  }
  //prev should be where we need it now
  let tartgetNode = prev.next;
  prev.next = prev.next.next;
  // unlink targetNode from list
  tartgetNode.next = null;
  return ll;
}

//REMOVING NTH FROM END
function removeNthFromEND(ll, n) {
  if (!ll || !n) return null;
  //best to treat everything the same so give it a dummy node
  let head = new Node(0); //as long as it's a node of any number and not just null aka no node at all
  head.next = ll; //FORGOT TO LINK THE ORIGINAL LIST TO DUMMY HEAD
  let slow = head; //to end up to be the node right before n
  let fast = head; //to keep track of where null is and to separate from slow by n nodes
  //separate slow and fast pointers by n distance
  // console.log(slow, fast)
  for (let i = 1; i < n + 1; i++) {
    // dummyHead, 1,  2,  3,  4,  5,  6,  7, null
    fast = fast.next; //     f0     f1  f2  f3
  } //    slow            fast3 inclusive
  //        s           f
  while (fast.next) {
    //while fast.next is not null or can do while fast, but will be different logic
    //advance both at same time/speed
    slow = slow.next;
    fast = fast.next;
  }
  // console.log(slow)
  slow.next = slow.next.next;
  // console.log(slow)
  return head.next;
}

ll.insertToFront(1);
ll.insertLastNode(2);
ll.insertLastNode(3);
ll.insertLastNode(4);
ll.insertLastNode(5);
ll.insertLastNode(6);
ll.insertLastNode(7);

// console.log(removeNthFromEND(ll.head, 3)); //removing 3rd from end thus remove #5

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