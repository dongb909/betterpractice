const { nodeInternals } = require("stack-utils");

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
          if (node.right === null) {
            node.right = n;
            return;
          } else return searchTree(node.right);
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
    //bc want the lower number
    else return rightHt + 1; //bc right is the smaller number
  }

  findMaxHt(node = this.root) {
    if (!node) return -1;
    let leftHt = this.findMaxHt(node.left);
    let rightHt = this.findMaxHt(node.right);
    if (leftHt >= rightHt) return leftHt + 1;
    //bc want the larger number
    else return rightHt + 1; //bc right is larger than left
  }

  //DEPTH FIRST SEARCH - traverses each branch
  //LMR always returning an array
  inOrder() {
    if (this.root === null) return null;
    let result = [];
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

  //MLR
  preOrder() {
    if (this.root === null) return null;
    let result = [];
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
    if (this.root === null) return null;
    let result = [];
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
}

const bst = new BST();
// for (let i = 1; i < 20; i++){
//   bst.add(i)
// }
bst.add(7); //don't matter the order you add it, it'll get placed in the right place.
bst.add(5);
bst.add(9);
bst.add(8);
bst.add(10);
bst.add(4);
bst.add(6);
bst.add(2);
bst.add(1);
bst.add(11);
bst.remove(7);

// console.log(bst.findMinNum());
// console.log(bst.findMaxNum());
// console.log(bst.findMinHt());
console.log(bst.levelOrder());
/*          7   //height of root starts at 0, if want start at 1 then just add 1 to the final count before returning
        5     9
      4   6 8   10
    2             11
  1     
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
