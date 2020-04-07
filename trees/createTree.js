class Node{
  constructor(data, left=null, right=null) {
    this.data=data;
    this.left=left;
    this.right=right;
  } 
}

class BST {       // not putting a val here because want it to be made with a node that takes in the value
  constructor(){    //tree = new BST    node = new Node(5)  tree.addnode(node)
    this.root=null;   //or just tree.addValue(5) and have that function create a new node within it
    this.count=0
  }
  
  size(){
    return this.count
  }

  add(data){
    this.count++
    let n = n
    let current = this.root
    if(this.root === null){
      this.root= n;
      return;
    } else {
      //check the children recursively, here argument is root node
      const searchTree = node => {
        //check current node's data 
        if (data < node.data) {
          //if less then then go to left child
          if (!node.left){
            //if empty then add new node, else recurse on left node
            node.left= n
            return; //should return each time only if want it to print out, or else just print them out later
          } else {
            return searchTree(node.left)
          }
          //if data is greater than current node then go right
        } else if (data > node.data) {
          if (node.right === null){
            node.right = n
            return
          } else {
            return searchTree(node.right)
          }
        } else {
          //if they're both even then no need for it to be in the tree
          return null;
        }
      }
      //always remember to call the function
      return searchTree(current)
    }
  }

  findMin(){
    current = this.root;
    while (current.left){
      current=current.left
    }
    // return current; RETURN THE VALUE NOT THE NODE
    return current.data
  }

  findMax(){
    current = this.root;
    while(current.right) {
      current = current.right;
    }
    return current.data;
  }

  contains(data){
    current = this.root;
    while (current) { //check if current even exists first before can compare it to data
      if (current.data === data) {
        return true;
      } else if (data < current.data){
        current=current.left;
      } else if (data > current.data) {
        current=current.right
      }
    }
    return false;
  }

  remove(data){

  }

    //a tree is balanced if the difference btwn min height and max height is 0 or 1
  isBalanced(){

  }

  //root node is height 0
  //root to the first leaf node WITHOUT TWO children
  findMinHeight(node=this.node){

  }

  //
  findMaxHeight(node=this.node){

  }

  
  //DEPTH FIRST SEARCH - traverses each branch
  //LMR always returning an array
  inOrder(){
    if(this.root===null) return null
    let result = []
    const traverse = node => {
      //will always care about left child first. not even current node
      node.left && traverse(node.left);
      result.push(node.data);
      node.right && traverse(node.right); 
    }
    traverse(this.root)
    return result
  }

  //MLR
  preOrder(){
    if(this.root===null) return null
    let result = []
    const traverse = node => {  //this function just pushes new values to result to be returned later, it doesn't return anything itself
      result.push(node.data);
      node.left && traverse(node.left);
      node.right && traverse(node.right);
    }
    traverse(this.root)
    return result
  }
 
  //LRM
  postOrder(){
    if(this.root ===null) return null
    let result = []
    const traverse = node => {
      if (node.left){
        traverse(node.left);
      } 
      if (node.right){
        traverse(node.right);
      }
      result.push(node.data);
    }
    traverse(this.root);
    return result;
  }

  //BREADTH FIRST SEARCH - traverses each level
  levelOrder(){

  }


}

