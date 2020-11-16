const { nodeInternals } = require("stack-utils");
const { Z_BEST_COMPRESSION } = require("zlib");

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BST {
  // not putting a val here because want it to be made with a node that takes in the value
  constructor() {
    //tree = new BST()    node = new Node(5)  tree.addnode(node)
    this.root = null; //or just tree.addValue(5) and have that function create a new node within it
    this.count = 0; // or size
  }

  size() {
    return this.count;
  }

  add(data) {
    //ROOT WILL ALWAYS BE THE SAME, only the rest of the tree will change
    //WE ARE NOT MOVING ANY NODES!!! JUST ADDING WHEN THERE'S AN EMPTY SPACE. IF SAME NUM THEN IGNORE, IF LESS THAN CURR NODE THEN KEEP GOING DOWN TREE UNTIL THERE'S A PLACE FOR YOU.
    //IT'LL WORK ITSELF OUT, THERE'S NOT SUCH THING AS REHEAPING OR REARRANGING WHEN ADDING.
    //only time we have to worry about ^^ is when we're REMOVING nodes
    this.count++;
    let n = new Node(data);
    if (this.root === null) return (this.root = n);
    else {
      let current = this.root;
      //check the children recursively, here argument is root node, creating a function here.
      const searchTree = (node) => {
        //check current node's data //aka starting with root
        if (data < node.data) {
          //if less then then go to left child
          if (!node.left) return (node.left = n);
          //if empty then add new node, else recurse on left node //should return each time only if want it to print out, or else just print them out later
          else return searchTree(node.left);
          //if data is greater than current node then go right
        } else if (data > node.data) {
          if (!node.right) return (node.right = n);
          else return searchTree(node.right);
        } else return null;
        //if they're both even then no need for it to be in the tree
      };
      //always remember to call the function
      return searchTree(current);
    }
  }

  findMinNum() {
    let current = this.root;
    while (current.left) current = current.left;
    //while there's a left node, find the deepest, leftest node bc bst
    // return current; RETURN THE VALUE NOT THE NODE
    return current.data;
  }

  findMaxNum() {
    let current = this.root;
    while (current.right) current = current.right; //THIS WORKS!!! WITHOUT THE BRACKETS!
    return current.data;
  }

  contains(data) {
    current = this.root;
    while (current) {
      //check if current even exists first before can compare it to data // aka while there's still a valid node
      if (current.data === data) return true;
      else if (data < current.data) current = current.left;
      else if (data > current.data) current = current.right;
    }
    return false;
  }

  //FOR REMOVING, HAVE TO REORDER ALL THE NODES BELOW IT AS WELL
  // NOOOOOOOOOOOOO/ DON'T DO THIS
  // remove(data) {
  //   if(!this.root) return "tree is empty"
  //   while(!currNode){
  //     if (data < currNode.data) currNode = currNode.left
  //     else if (data > currNode.data) currNode = currNode.right
  //     else if (data === currNode.data) {
  //IGNORE WHAT SAYING HERE.
  //       //the number that makes most sense to replace this node is the current node's right node's furthest left. it's larger then the current left node and smaller than the current right node.
  //       //don't want to just detach that and attach the same right node bc might get a really unbalanced tree if done too many times. want to reorder the rest of the tree from that node being replaced but only its RIGHT side's most left

  //NOOOOOOOOO
  // remove(data) { //not returning other than removing and reordering nodes
  //   function removeNode (node){
  //     // if (!node || (!node.left && !node.right)) return null NOO TWO SEPARATE THINGS
  //     if (!node) return null
  //     if (!)
  //     else if (node.left)
  //   }
  //   return removeNode(this.root)
  //NOT RETURNING THIS.ROOT!!!!!! want to sTART WITH THIS.ROOT (see next try of function)
  // }

  remove(data) {
    //PRACTICE THIS ONEEEEEE. HELLA CONFUSING
    function removeNode(node, data) {
      if (!node) return null; //so if starting at root, if there's no node, then there no tree so root is null still which is fine //or for when reach leaf
      // if(data < node.data) return removeNode(node.left, data) NOOO
      // else if(data > node.data) return removeNode(node.right, data)
      if (data < node.data) {
        node.left = removeNode(node.left, data); //YOU DIDN'T DO THIS
        //CHECKING TO SEE IF NODE.LEFT.DATA IS WHAT WE'RE LOOKING FOR, IF SO THEN REPLACE THAT NODE AND TRICKLE DOWN
        //IF DATA IS STILL < NEW LEFT'S LEFT NODE THEN ENTER HERE AGAIN AND CONTINUE DOWN THE LEFT SIDE. STILL TRYING TO FIND THE SAME DATA NUMBER
        return node; //YOU DIDN'T DO THIS
        //RETURN THIS CURRENT NODE YOU'RE OWN REGARDLESS OF IF ITS LEFT NODE CHANGED.
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else if (node.data === data) {
        //NOT !== can only be equal or < or > !!
        if (!node.left && !node.right) return null;
        //if it's the leaf node your'e deleting or root is the value of data, then return null as root
        else if (!node.left) return node.right;
        //if there's no left node, then replace current node with right node (dont' have to worrying aboubt having to restructure)
        else if (!node.right) return node.left;
        else {
          //if there's both a left and a right makes most sense to replace this node is the current node's right node's furthest left. it's larger then the current left node and smaller than the current right node.
          //don't want to just detach and attach the right node BECAUSE the current node position ALREADY HAS a LEFT NODE, can't have the current right node's LEFT node compete with the current left node at the node we're replacing!!!!
          //thus have to restructure the ENTIRE right side. Doesn't make since to do it to the left bc of the order
          //get right node
          let deepestLeftNodeFromRight = node.right;
          //get right node's leftest left node
          // let rightsFurthestLeftNode = NO!!
          while (deepestLeftNodeFromRight.left)
            deepestLeftNodeFromRight = deepestLeftNodeFromRight.left;
          //take this node's data and replace it with our current main node that matched our data
          node.data = deepestLeftNodeFromRight.data; //aka WE DELETED/OVERWRITTEN THE OLD 'DATA NUMBER' WE WERE RECURSING TO FIND!!
          //YOU THOUGHT => BUT NOOOO =>delete this node now but check it it has a right child too. it def doesn't have a left child, but since now moving this data, need to replace it if there's a right so recurse
          // NOT ^^^^ you're just setting the main node data to the data you need, now you have RECURSE AND REMOVE THE NODE WITH THE VALUE YOU JUST TOOK, BUT HAVE TO GO THROUGH THE WHOLE SUBTREE AGAIN STARTING FROM MAIN NODE.RIGHT AS ROOT
          //MOST CONFUSION CAME FROM THIS LINE BELOW. THINK ABOUT IT.
          //node.right bc we know it's on the right side of our current node.
          node.right = removeNode(node.right, deepestLeftNodeFromRight.data); //NOW TREATING TO FIND THE NODE WITH THE 'DATA NUMBER' THAT WE JUST REPLACED THE OLD DATA NUMBER WITH SO WE CAN REMOVE THAT NODE FROM ITS ORIGINAL POSITION ALL THE WAY UNTIL WE REPLACE THE NODE WE NEEED TO REPLACE WITH NULL
          //also STARTING with node.right because that's the next node that should START 'TRAVERSING'
          //DOESN'T MEAN THAT WE'RE TRYING TO REPLACE / PUT THE NEW DATA THAT MATCHES INTO THIS RIGHT NODE. WE'RE JUST STARTING FROM IT
          //THEN WE FIND THE NODE WITH THE DATA THAT WE JUST USED AND THAT'S THE NODE WE'LL BE REPLACING. THE NODE.RIGHT WILL KEEP CHANGING UNTIL UP TO THAT POINT. NO NODES WILL BE CHANGED UNTIL WE GET TO THE NODE WITH THE DATA WE USED/LOOKING FOR.
          //********THIS IS WHERE YOU THOUGHT THAT NODE.RIGHT WAS THE NEXT TO BE REPLACED. NOOOOO JUST TRAVERSING UNTIL FINDING THE NODE THAT NEEDS TO BE REMOVED AGAIN.
          //is still the OLD RIGHT NODE ATTACHED TO THE CURRENT NODE WE JUST REPLACED DATA FOR, now want to find the value we just used to replace and replace THAT node's value we took  by finding that node again

          return node; //so RETURNING SAME NODE working on, just changed it's data and children
        }
      }
    }
    this.root = removeNode(this.root, data);
    //JUST NEED TO SET THE NEW ROOT and START FROM ROOT IN CASE THAT'S THE TARGET TO REPLACE
  }

  //a tree is balanced if the difference btwn min height and max height is 0 or 1
  isBalanced() {
    // return this.findMinHt(this.root) >= this.findMaxHt(this.root) - 1;

    //OR do max-min <=1
    return this.findMaxHt(this.root) - this.findMinHt(this.root) <= 1;
  }

  //root node is height 0 or ask what the interviewer/prompt considers the root node as
  //root to the first leaf node WITHOUT TWO children, SO ONE child IS ENOUGH, YOU STOP THE HEIGHT THERE!
  findMinHt(node = this.root) {
    //in case want to find the height of subtrees
    //traverse both sides and get count, best to do a recursion here
    // const findMinHeight = (currNode, currLevel) => {
    //   if (!currNode) return currLevel;
    //   return Math.min(this.findMinHeight(node.left, currLevel++), this.findMinHeight(node.right, currLevel++)) NOO!!! CANNOT USE Math.min bc will always be -1 or 0!
    if (!node) return -1;
    let leftHt = this.findMinHt(node.left);
    let rightHt = this.findMinHt(node.right);
    if (leftHt <= rightHt) return leftHt + 1;
    //RETURN THE SMALLER NUMBER +1
    //bc want the lower number
    else return rightHt + 1; //bc right is the smaller number
  }
  //THIS IS COMPLETELY DIFFERENT WAY THAN BALANCED TREES BECAUSE HERE, WE'RE CALCULATING MIN AND MAX HT SEPARATE
  findMaxHt(node = this.root) {
    if (!node) return -1;
    let leftHt = this.findMaxHt(node.left);
    let rightHt = this.findMaxHt(node.right);
    if (leftHt >= rightHt) return leftHt + 1;
    //RETURN THE BIGGER NUMBER +1
    //bc want the larger number
    else return rightHt + 1; //bc right is larger than left
  }

  /* FIRST ATTEMPT
  isBalancedWithoutMinMaxHtFncs(node = this.root) { //NOT CARING ABOUT DATA/VALUES!! JUST THAT THERE'S A VALID NON NULL NODE OR NOT
    // if (!node || !node.left && !node.right) return true //NO NOT RETURNING TRUE OR FALSE, NEED TO CALCULATE IF HT DIFFERENCE IS >1 THUS NEED NUMBERS!!
    //NOT node.left, node.right existance here, we're going from bottom up, no top bottom
    if (!node) return 0;
    let leftSumHt = this.isBalancedWithoutMinMaxHtFncs(node.left) + 1   ///DOESN'T WORK!! NEED 2 FUNCTIONS, ONE THAT DEALS WITH ADDING AND 'RETURNING NUMNBERS'
    let rightSumHt = this.isBalancedWithoutMinMaxHtFncs(node.right) + 1 //THE OUTTER FUNCTION DEALS WITH RETURNING TRUE OR FALSE
    let diff = Math.abs(leftSumHt - rightSumHt) 
    return (diff >1)? false: 
  }
  */

  //SECOND
  isBalancedWithoutMinMaxHtFncs(node = this.root) {
    if (!node) return true;
    function height(currNode) {
      if (!currNode) return 0; //can return 0 or -1 depending on if root counts as 1 or as 0 but result is the same bc returning t/f, if numeric then result will be different. need clearification
      let left = height(currNode.left) + 1;
      let right = height(currNode.right) + 1;
      // let diff = Math.abs(left - right)
      // console.log(diff)
      // return diff > 2 ? Infinity : diff NO NOT HERE, WANT TO GET THE MAX HEIGHT OF THE CURRENT NODE.
      if (Math.abs(left - right) > 1) return Infinity; //IF YOU COMPARE IT AND IT'S ALREADY NOT BALANCED THEN RETURN INFINITIY WHICH STOPS EVERYTHING
      //NOT > 2, if 2 the >= 2
      //YOU DIDN'T ACCOUNT FOR IF ABS IS <=2 //YOU DIDN'T EVEN THINK ABOUT THIS PART AT ALLLLLLLLLL
      return Math.max(left, right);
    }
    // return height(node) < 2//NOOO
    //SINCE THE HEIGHT FUNCTION RETURNS INFINITY OR A 0 OR 1, JUST DO CONDITION ON INFINITY SO IT'S JUST 1 THING TO WORK WITH
    return height(node) !== Infinity;
  }

  //DEPTH FIRST SEARCH - traverses each branch all the way first
  //LMR always returning an array
  secondLargestVal() {
    //PRETTY MUCH YOU CAN DO IT RECURSIVELY BUT YOU'LL BE DOING EXTRA ROUNDS, IT WON'T JUST STOP AT 2
    let result = [];
    function find2ndLargest(node) {
      // if (count >=2) return//these BASES UP HERE DONT DO ANYTHING AT ALL. NOT SURE WHY
      // if(count < 2) {
      node.right && find2ndLargest(node.right);
      result.push(node.data);
      console.log(result);
      // }
      //// if(result.length === 2) console.log(true) //PUTTING IT HERE MAKES IT GO THROUGH THE ENTIRE TREE STILL THO
      //// if(result.length !==2){//it doesn't care if the length is !2, it prints everything anyways
      if (result.length >= 2) return; //ABLE to get it to STOP with at least 1/2 the list, still not at just length 2 though.
      // console.log('hi')
      node.left && find2ndLargest(node.left);
    }
    find2ndLargest(this.root);
    return result[1];
  }
  secondLargestValIterative(node = this.root) {
    if (!node) return "No root";
    let pre;
    let curr = node;
    while (curr.right) {
      //get the max node first
      pre = curr;
      curr = curr.right;
    }
    // if(!curr.left && !curr.right) return pre.data //NO! don't include the right side bc we already accounted for there not being a right side in the previous while loop
    // if(!curr.right){ //NOT RIGHT BUT LEFT
    if (!curr.left) return pre.data;
    //don't need another if condition bc already checked for no right and no left. it's iterative so now it means there's a curr.left
    //only have to go down left side 1 node bc it's RIGHT should be the max for that subtree anyways
    curr = curr.left;
    // console.log(curr.data)
    while (curr.right) {
      curr = curr.right;
    }
    return curr.data;
  }

  reverseInOrder() {
    let result = [];
    function traverse(node) {
      node.right && traverse(node.right);
      result.push(node.data);
      node.left && traverse(node.left);
    }
    traverse(this.root);
    return result;
  }

  inOrderRecursive() {
    let result = [];
    if (this.root === null) return result;
    const traverse = (node) => {
      //DOESN'T RETURN ANYTHING! OTHER THAN TRAVERSE AND ADD TO RESULT
      //will always care about left child first. not even current node
      node.left && traverse(node.left); //if there's a left node, then traverse the left node until you can't no more which this line would not run and the next line is called
      result.push(node.data); //since there's no more left node for this current node, record this current node and then traverse rigth node in which if the right node has a left then traverse that left, if not then record the current right node and then see if it has it's own right node
      node.right && traverse(node.right);
    };
    traverse(this.root);
    return result;
  }

  inOrderIterative() {
    let result = [];
    if (this.root === null) return result;
    let stack = []; //DON'T START OFF WITH THIS.ROOT AND ALSO SET CURR TO THIS.ROOT, OR ELSE WILL GET DUPLICATES OF THE RIGHT SIDE OF THE TREE
    let curr = this.root;
    /* NOOO
    while (curr) {
      stack.push(curr)
      curr = curr.left
    }
    while (stack.length > 0) { DON'T BASE IT OFF OF STACK! BASE IT OFF OF CURR !== NULL
      curr = stack.pop()
      // result.push(curr.data)   //NO BECAUSE WILL print ==> 1,  2,  4, 5, 6,  7, 9, 10, 11, 7, 9, 10,11  INSTEAD OF   1, 2, 4,  5,  6, 7, 8, 9, 10, 11, MISSING ALL THE RIGHT'S LEFTS
      // if (curr.right) stack.push(curr.right)
      //SOLN: JUST forget that we even checked all the lefts, with the curr node, check for left again, then break out if there is left after you pushedm BUT THEN have to be careful not to push the lefts we've already done back either
    }
    */

    /*YES 
    list = new ArrayList<>();
    if(root == null) return list;
    stack = new Stack<>();
    while(root != null || !stack.empty()){
        while(root != null){
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        list.add(root.val);
        root = root.right;}*/
    //so you were separating out the iteration til the end of left branch but only for the root node, you should do that for every node/outerloop BEFORE you pop
    // while (curr && stack.length > 0) { NOOOOO DO ORRRR
    while (curr || stack.length > 0) {
      //iterate and add all the left children of this current node first before moving to the right now or popping from the stack
      while (curr) {
        stack.push(curr);
        curr = curr.left;
      }
      //now work with last node but using the same variable, just reassigning, DON'T USE A NEW VARIABLE BC YOU WANT YOUR OUTTER WHILE LOOP TO STILL WORK
      curr = stack.pop();
      //if there was a left to this node, it would have already been added AFTER this node thus, would already been popped and handled, so don't have to worry about left anymore. just currently popped node
      result.push(curr.data);
      //now if curr node HAS a right, then want to set it to curr to go throuhg the next loop round to add all its possible left nodes, which this right node will be the first node to be added to the stack in the round before the other lefts
      //just set it. not doing anything to the right until the next loop which is right after this
      // if(curr.right) curr = curr.right
      //^^NOOO DON'T EVEN CHECK IF THERE IS A RIGHT, YOU'LL END UP IN AN INFINITE LOOP BC CURR IS NEVER SET TO NULL,
      //JUST GO AHEAD AND ASSIGN CURR AS THE RIGHT NODE WHETHER IT EXISTS OR NOT.
      //****HERE IS THE REASON WHY YOU WANT TO MAKE YOUR OUTTER CONDITIONAL AN || NOT && */
      //IF RIGHT IS NULL THEN THERE WON'T BE ADDITIONAL LEFTS ADDED BUT CURR WILL BE REASSIGNED RIGHT AWAY TO THE NEXT NODE ON THE STACK. NO WORRIES
      curr = curr.right;
    }

    return result;
  }
  //MLR
  preOrder() {
    let result = [];
    if (this.root === null) return result;
    const traverse = (node) => {
      //this function just pushes new values to result to be returned later, it doesn't return anything itself
      result.push(node.data);
      node.left && traverse(node.left);
      node.right && traverse(node.right);
    };
    traverse(this.root);
    return result;
  }

  //LRM
  postOrder() {
    let result = [];
    if (this.root === null) return result;
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      result.push(node.data);
    };
    traverse(this.root);
    return result;
  }

  //BREADTH FIRST SEARCH - traverses each level
  levelOrder() {
    let q = [this.root];
    let result = [];
    let currNode;
    while (q.length > 0) {
      currNode = q.shift();
      result.push(currNode.data);
      currNode.left && q.push(currNode.left);
      currNode.right && q.push(currNode.right);
    }
    return result;
  }
  // The left subtree of a node contains only nodes with keys less than the node's key.
  // The right subtree of a node contains only nodes with keys greater than the node's key.
  // Both the left and right subtrees must also be binary search trees.
  validateBSTRecursive(node = this.root) {
    //putting node here so it looks like if we were writing it out in a separate function instead of a class like on leetcode
    if (!node) return true;
    if (
      (node.left && node.left.data >= node.data) || //need the '=' to make sure there's no duplicates
      (node.right && node.right.data <= node.data)
    )
      return false;
    return (
      this.validateBSTRecursive(node.left) &&
      this.validateBSTRecursive(node.right)
    );
  } //YAYYY did it without looking!
  //Complexity
  // O(n)O(n) time and O(n)O(n) space.
  //
  //
  validateBSTIterative(node = this.root) {
    //should maybe do it level by level but must use a queue in order to keep track of the curr node's children as we work on curr node, and their children's children
    if (!node) return true;
    let q = [node];
    let valid = true;
    let currNode;
    while (q.length > 0 && valid) {
      let currNode = q.shift();
      // console.log(currNode)
      // if(currNode.left && currNode.val > currNode.left.val) q.push(currNode.left) //NO CHECK FOR THINGS TO BREAK OUT FIRST!!!
      // if(currNode.right && currNode.val < currNode.right.val) q.push(currNode.right)
      if (
        (currNode.left && currNode.data < currNode.left.data) ||
        (currNode.right && currNode.data > currNode.right.data)
      ) {
        valid = false;
        console.log(valid);
        break; //CANNOT JUST 'RETURN' FROM WITHIN A WHILE LOOP. MUST BREAK OUT FIRST
      }
      //so left and right child should be valid, now add to q
      // console.log(currNode.data, currNode.left.data, currNode.right.data)
      currNode.left && q.push(currNode.left);
      currNode.right && q.push(currNode.right);
    }
    return valid;
  }

  get2ndMinIterative(node = this.root) {
    //find min node which is the most left node.
    //if no right on min node then parent is 2nd min
    //if right on min node then most left of right of min node is 2nd smallest (just like 2nd max but reversed)
    //if there's NO LEFT CHILD ON ROOT then 2nd smallest is first right child's most left's parent
    if (!node) return "No root";
    let prev,
      curr = this.root;
    while (curr.left) {
      prev = curr;
      curr = curr.left;
    }
    //have smallest node, now check it it as no right, then return parent
    if (!curr.right) return prev.data;
    //if smallest node has a right then check its right's leftmost child
    curr = curr.right;
    while (curr.left) curr = curr.left;
    return curr.data;
  }
  get2ndMinRecursive(node = this.root) {
    //eh just see the 2nd max. too complicated try implementing recursion on the 2ndminnodeintree for regular binary tree problem
  }
}

const bst = new BST();
// for (let i = 1; i < 20; i++){
//   bst.add(i)
// // }
bst.add(7); //don't matter the order you add it, it'll get placed in the right place.
// bst.add(5);
bst.add(9);
bst.add(8);
bst.add(10);
// bst.add(4);
// bst.add(6);
// bst.add(2);
// bst.add(1);
bst.add(11);
// bst.remove(7);
bst.add(20);
bst.add(15);
bst.add(18);
bst.add(19);
bst.add(17);
bst.add(16);
// console.log(bst.inOrder());
// console.log(bst.secondLargestVal())
// console.log(bst.secondLargestValIterative());
console.log(bst.get2ndMinIterative());
// console.log(bst.inOrderRecursive());
// console.log(bst.findMinNum());
// console.log(bst.findMaxNum());
// console.log(bst.findMinHt());
// console.log(bst.isBalanced());
// console.log(bst.isBalancedWithoutMinMaxHtFncs());
// console.log(bst.validateBSTRecursive());
// console.log(bst.validateBSTIterative());

/*          7   //height of root starts at 0, if want start at 1 then just add 1 to the final count before returning
        5     9
      4   6 8   10
    2             11
  1                 20
                  15
                      18
                    17    19
                  16

*/

/*
  // breadth first search - level by level

  // use a queue!
  // 15, 3, 36, 2, 12, 28, 39
  bfs() {
    let result = []
    let queue = []

    queue.push(this.root)

    while(queue.length) {
      let currentNode = queue.shift()

      result.push(currentNode.value)

      if (currentNode.left) {
        queue.push(currentNode.left)
      }
      if (currentNode.right) {
        queue.push(currentNode.right)
      }
    }

    return result
  }
}

const bst = new BST(15)

bst.insert(3)
bst.insert(36)
bst.insert(2)
bst.insert(12)
bst.insert(28)
bst.insert(39)

bst.size()

bst.min()
bst.max()

bst.contains(2)
bst.contains(9)

// DFS!!!
// in-order: 2, 3, 12, 15, 28, 36, 39
bst.dfsInOrder()

// pre-order: 15, 3, 2, 12, 36, 28, 39
bst.dfsPreOrder()

// post-order: 2, 12, 3, 28, 39, 36, 15
bst.dfsPostOrder()

// BFS!!!
// 15, 3, 36, 2, 12, 28, 39
bst.bfs() */
