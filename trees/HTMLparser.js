/*Given a string that contains HTML markup, parse it into a DOM tree 

var el = document.createElement( 'html' );
el.innerHTML = "<html><head><title>titleTest</title></head><body><a href='test0'>test01</a><a href='test1'>test02</a><a href='test2'>test03</a></body></html>";

el.getElementsByTagName( 'a' ); // Live NodeList of your anchor elements

ex:
<html>
  <head>
    <title> HTML PARSING
    </title>
  </head>
  <body>
    <div class="jkfldsjfs"> Hiyo
    </div>
    
  </body>
  <footer>
  </footer>
</html>

                    html
                  /     \     \
                head    body    footer
          title         div                   node per tag type
                                            class and properties are WITHIN THE NODE 
*/

class Node {
  constructor(tag) {
    // this.className = []; //for multiple classname
    this.tag = tag;
    this.children = []; //totally forgot about children duh
  }
}

//break up chars into tokens, then lexing aka grp of tokens you give meaning to to build the tags
//recursive operation that tokenizes and lexes so that they become nodes

//Tokenizing "<" and ">" angle bracket = opening html tag
//Tokenizing "</" and ">" angle bracket = closing html tag //valid parenthesis, but here since it's recursive, don't need your own stack, use the callstack
//just ignore closing but only care if the node after it is open, but if the next node is also closing then ignore that too.
//track if prev tag is closing, if current tag and prev tag is closing then jump out to parent level,
//if prev tag is closing but current is open, then stay at same level aka add to same children's array
// else prev tag was open tag, current is open, then current is child of prev
//base case is when at end of string.

//parseHTML always produces a tag given that the input will always at least be 1 tag

const parseHTML = (htmlStr) => {
  //always just creates a single node
  //NOT A FOREACH!
  //opening tag found
  let tag = "";
  let idx = 0;
  if (htmlStr[idx] === "<") {
    let nextIdx = ++idx;
    //expecting full tag string
    while (htmlStr[nextIdx] !== ">") {
      // console.log('hi')
      tag += htmlStr[nextIdx++];
    }
    let root = new Node(tag);
    findTags(htmlStr, nextIdx + 1, root, false);
    // console.log(root.children)
    console.log(
      root.children.forEach((element) => {
        console.log(element);
      })
    );
    // return root;
  }
};

function findTags(htmlStr, idx, prevTag, prevIsClosing) {
  let newNode;
  let nextIdx;
  while (idx < htmlStr.length) {
    let tag = "";
    while (htmlStr[idx] !== "<") {
      idx++;
      // console.log('yo')
    }
    //found opening tag
    if (htmlStr[idx + 1] !== "/") {
      nextIdx = ++idx;
      //expecting full tag string
      while (htmlStr[nextIdx] !== ">") {
        tag += htmlStr[nextIdx++];
      }
      //create tag node
      newNode = new Node(tag);
      // console.log(newNode)
      prevTag.children.push(newNode);
      let lastClosingIdx = findTags(htmlStr, nextIdx + 1, newNode, false);
      idx = lastClosingIdx;
    } else if (htmlStr[idx] === "<" && htmlStr[idx + 1] === "/") {
      while (htmlStr[idx] !== ">") {
        idx++;
      }
      // console.log(htmlStr[idx+1])
      return idx + 1;
    }
  }
}

// console.log(parseHTML("<html></html>"))
//result = {tag: html, children:[], className: []}

console.log(
  parseHTML(
    "<html><head class='foo'><title></title></head><body><div>printing div form body</div><div2></div2><div3></div3></body></html>"
  )
);
//result = {tag: html, className:[], children:[{tag:head, className:['foo'], children:[]}]}

// console.log(parseHTML("<div></div><div></div>"))
//result = [{tag: div, className:[], children:[]}, {tag: div, className:[], children:[]}]

// TREAT ROOT NODE AS CHILDREN ALREAYD
