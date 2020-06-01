
// unique id for each item
// launch in uS
// order = id and postal code of where ordered
// store id of bottle with zipcode for delivery
// at any point of time , want know last 100 ids and their corresponding zipcode
//input: blank and then [id, zipcode] as input one at a time read sensitive 
//id = string, all over the place, not in order
//zip = string
//output = last 100 to be stored in a data store for quick access
//access by id

// class Node(val) {
//     this.val = val;
//     this.prev = null;
//     this.next = null;
// }

// class List {
//     this.head = null;
//     this.tail = null;
// }

// class Orders (capacity) {
//     this.orders = new Map();
//     this.list = new List();
//     this.capacity = capacity;
    
//     access(id){
//         if (!this.orders.get(id)) return null;
//         return this.orders.get(id);
//     }
    
//     add(id, zip){
//         //empty list to create list and map
//         let node = new Node(zip);
//         if (this.orders.size() === 0) {
//             this.orders.set(id, node);
//             this.list.head = node;
//             this.list.tail = node;
//             return;
//         }
//         //check if id valid then take out and add to end with new zip
//         if (this.orders.get(id)) {
//             let nodeToDel = this.orders.get(id);
//             if(nodeToDel === this.list.head && nodeToDel ===this.list.tail){
//                 nodeToDel.val = node.val;
//             } else if(nodeToDel === this.list.head) {
//                 this.list.head = this.list.head.next;
//                 nodeToDel.next = null;
//                 this.list.head.prev = null;
//             } else if (nodeToDel === this.list.tail) {
//                 nodeToDel.val = node.val;
//             } else {
//                 nodeToDel.prev.next = nodeToDel.next;
//                 nodeToDel.next.prev = nodeToDel.prev;
//                 //need to remember if there's only 1 node or think about deleting on both ends and middle
//                 //write down what your variables are at each point in time when running through
//             }
//             this.orders.delete(id);
//             this.orders.set(id, node);
//             this.list.tail.next(node);
//             node.prev = this.list.tail;
//             this.list.tail = this.list.tail.next;
//             return;
//         }
//         //if id not valid then check map size if > capacit the dequeue enqueue
//         else {
//             if (this.orders.size() < this.capacity) {
//                 this.orders.set(id, node);
//                 this.list.tail.next(node);
//                 node.prev = this.list.tail;
//                 this.list.tail = this.list.tail.next;
//                 return;
//             } else {
//                 let nodeToDel = this.list.head;
//                 nodeToDel.next.prev = null;
//                 this.list.head = this.list.head.next;
//                 this.orders.delete(need to have id in node for this case);
//                 this.orders.set(id, node);
//                 this.list.tail.next(node);
//                 node.prev = this.list.tail;
//                 this.list.tail = this.list.tail.next;
//                 return;
//             }
//         }
//     }
// }


// make it dry,
// need to find the mistakes when going through examples on your own
// should really think about edge cases prior
// you didn't see the zip on line 38
// and then seeing the edgecases
// you were explaining your ASSUMPTION of what's happening not what actually happened!
// you were testing your own logic with assumptions.



// Given a string of characters, find the first character that occurs only once.



// babacbcdddef
 
/*is it just a-z
are there spaces? how do you want to handle spaces
what types of characters and are there any to omit?
have to handle empty string? how to handle, like what to return? what's the expected output if we have an empty string
if alpha, casing?
return single char string
input is a string, valid string -clarify
first char that occurs only once means WHAT
    only 1 count for that char in entire string
    or meaning not in a repeat
    ********how handle if all are repeating chars . am i guaranteed that there's a character that occurs only once?
    *****what does first mean? going left to right or right to left?


are there time and space constraints
*/
//BRUTE FORCE
//{a:2, b:3} key = char, val = freq by 1 pass through string
//minumum = -1
//go through original string and match that with frequency map aka attempt to walk through original string and return the first character with the value of 1

function singularOccurence (str) {
    let chars = {}
    for(char of str) {
        if (chars[char]) chars[char]++
        else chars[char] = 1
    }
    for (char of str) {
        if (chars[char] === 1) return char
    }
    return -1
}
//time = 2n
//space = n

//OPTIMAL
function singularOccurence (str) {
    //min variable you only care about the 

}

console.log(singularOccurence('bababcdddef'))
                                           
map with charCodeAt-offset bc indices is 0 Staart
single pass bc only going through 26 char, the pass is for frequency and then loop through keys
it's been hard for me to come up with examples for this but here's a scenario that i've seen before and i saw them go throuhg a dispute, this is how some people respond and this is how i would respond.