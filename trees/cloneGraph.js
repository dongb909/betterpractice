const { nodeInternals } = require("stack-utils")

class Node{
  constructor(val){
    this.val = val
    this.neighbors = []
  }
}

let a = new Node('A')
let b = new Node('B')
let c = new Node('C')
let d = new Node('D')
a.neighbors.push(b)
a.neighbors.push(d)
b.neighbors.push(a)
b.neighbors.push(c)
c.neighbors.push(b)
c.neighbors.push(d)
d.neighbors.push(a)
d.neighbors.push(c)

function cloneGraph(startNode){
  if (!startNode) return null
  // const visited = new Set() keys in map substitutes for a set anyways
  let qu = [startNode]
  const copy = {}
  let curr
  while(qu.length > 0){ //CAN'T JUST COPY OVER THE NEIGHBORS DIRECTLY BC THEY ALL NEED TO BE COPIED OVER AS NEW REFERENCE POINTS
    curr = qu.shift()
    if (!copy[curr.val]) {
      let newNode = new Node(curr.val)
      copy[curr.val] = [curr.val, newNode] 
    } 
    for (let neighbor of curr.neighbors){
      let [currVal, currCopyNode] = copy[curr.val]
      if (!copy[neighbor.val]) {
        let newNeighborNode = new Node(neighbor.val)
        copy[neighbor.val] = [neighbor.val, newNeighborNode]  //hashing old node to new node
        currCopyNode.neighbors.push(newNeighborNode)
        newNeighborNode.neighbors.push(currCopyNode) 
        qu.push(neighbor) //push the entire node, only do this if this is the first time this node is being visited
      } else if (currCopyNode.neighbors.findIndex(el => el.val === neighbor.val) === -1) {
        //   //if already visited then still do linking for both, just not creating new node
        // console.log(currCopyNode.neighbors.findIndex(el => el.val === neighbor.val) === -1)
          currCopyNode.neighbors.push(copy[neighbor.val][1])
          copy[neighbor.val][1].neighbors.push(currCopyNode)
    }
  }

  //just printing out
  // for(let arr of Object.values(copy)){
  //   let [val, node] = arr
    // console.log('VALLLLLL', node.val, 'NEIGHBORRRRRRS 11111', node.neighbors[0], 'NEIGHBORRRRRRS 2222',node.neighbors[1])
    // console.log(node.val, node.neighbors)
  }
  return copy['A'][1]
}

// console.log(cloneGraph(a))
let a2 = cloneGraph(a)
console.log(a)
console.log(a2)
console.log(a.neighbors[0])
console.log(a2.neighbors[0])
console.log(a.neighbors[1])
console.log(a2.neighbors[1])
console.log(a.neighbors[0].neighbors[1])
console.log(a2.neighbors[0].neighbors[1])