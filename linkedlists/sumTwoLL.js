/*You are given two non-empty linked lists representing two non-negative integers.
 The most significant digit comes first and each of their nodes contain a single digit. 
 Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Follow up:
What if you cannot modify the input lists? In other words, reversing the lists is not allowed.

Example:

Input: (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)     //non negs, single digits
Output: 7 -> 8 -> 0 -> 7 */

/*var addTwoNumbers = function(l1, l2) {
        var s1 = [];
        var s2 = [];

        while(l1 !== null) {
            s1.push(l1.val);
            l1 = l1.next;
        }
        while(l2 !== null) {
            s2.push(l2.val);
            l2 = l2.next;
        }
        
        var sum = 0;
        var list = new ListNode(0);
        while(s1.length > 0 || s2.length > 0) {
            if(s1.length > 0) sum += s1.pop();
            if(s2.length > 0) sum += s2.pop();
            list.val = sum % 10;
            var head = new ListNode((sum / 10)>>0);
            head.next = list;
            list = head;
            sum = (sum / 10) >> 0;
        }
        return list.val === 0 ? list.next : list;    
}; */

function ListNode(val) {
  this.val = val;
  this.next = null;
}
// let l1 = new ListNode(1);
// l1.next =  new ListNode(2)
// l1.next.next = new ListNode(3)

// var addTwoNumbers = function(l1, l2) {
  //hundreds -> ones input and output
  //no need to check l1/l2 bc already said that they are valid
  //ones in front in arr so no need to worry about filling length
//   let list1=[]
//   let list2=[]
//   while (l1 !== null) {
//     list1.push(l1.val)
//     l1=l1.next
//   }
//   while (l2 !== null) {
//     list2.push(l2.val)
//     l2=l2.next
//   }
//   let sum=0
//   let carry=0
//   let sumList = null
//   // let Previous = sumList
//   while (list1.length > 0 || list2.length>0) {
//     sum += carry + (list1.length > 0 ? list1.pop():0)
//     sum += carry + (list2.length > 0 ? list2.pop():0) //adding carry twice!
//     carry = sum/10
//     let head = new ListNode(sum%10)
//     head.next = sumList  //never updated sumList!!
//   }
//   if (carry>0) {
//     head = new ListNode(1)
//     head.next = sumList
//   }
//   return head
    
// };


//CORRECT BUT HELLLLLA LONG
var addTwoNumbers = function(l1, l2) {
let list1=[]
let list2=[]
while (l1 !== null) {
  list1.push(l1.val)
  l1=l1.next
}
while (l2 !== null) {
  list2.push(l2.val)
  l2=l2.next
}
let sum=0, carry = 0, sumList = null, head;
// let Previous = sumList
while (list1.length || list2.length) {
  if(list1.length){
    sum += list1.pop()
  } //NOT AN ELSE BECAUSE WANT BOTH IFS TO HAPPEN
  if (list2.length) {
    sum += list2.pop()
  }
  if (carry){
    sum += carry
  }//BECAUSE DONT WANT TO ADD IF DONT HAVE TO
  carry = sum>9? 1:0;
  head = new ListNode(sum%10)
  head.next = sumList
  sumList = head
  sum = 0
}
if (carry>0) {
  head = new ListNode(carry)
  head.next = sumList
}
return head

}








// Input: (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)     //non negs, single digits
// Output: 7 -> 8 -> 0 -> 7 */
// [7243]          [564] popping
// sum = 7087
// back into linked list =  7807 so must add to linked list by adding to head
/*
var addTwoNumbers = function(l1, l2) {
    
    let stack1 = []
    let stack2 = []
    
    while (l1 !== null) {
        stack1.push(l1.val)
        l1 = l1.next
    }
    while (l2 !== null) {
        stack2.push(l2.val)
        l2 = l2.next
    }
    
    let sum = 0
    let dummy = new ListNode(0)
    while (stack1.length || stack2.length) {
        if (stack1.length) {
            sum += stack1.pop()
        }
        if (stack2.length) {
            sum += stack2.pop()
        }
        
        dummy.val = sum % 10
        let carry = sum >= 10 ? 1 : 0
        let carryNode = new ListNode(carry)
        carryNode.next = dummy
        dummy = carryNode
        sum = Math.floor(sum / 10)
    }
    
    return dummy.val === 0 ? dummy.next : dummy
    
}; */




/*
var addTwoNumbers = function(l1, l2) {
    
    let stack1 = [], stack2 = [];
    let sum_llist = new ListNode(0);
    let i = 0;
    
    while(l1 || l2){
        if (l1){
            stack1.push(l1.val);
            l1 = l1.next;
        };
         if (l2){
            stack2.push(l2.val);
            l2 = l2.next;
        };
    }
    
    
    while((stack1 && stack1.length) || (stack2 && stack2.length) || i === 1){
        let sum = 0;
        let l1_popped = (stack1 && stack1.length) ? stack1.pop() : 0;
        let l2_popped = (stack2 && stack2.length) ? stack2.pop() : 0;
        sum = l1_popped + l2_popped + i;
        i = sum >= 10 ? 1 : 0;
        let node = new ListNode( sum % 10);
        node.next = sum_llist.next;
        sum_llist.next = node;
    }
    
    
    return sum_llist.next;
    
}; */