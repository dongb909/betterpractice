// Given a Knapsack of a maximum capacity of W and N items each with its own value and weight, throw in items inside the Knapsack such that the final contents has the maximum value. Yikes !!

// enter image description here

// Here’s the general way the problem is explained – Consider a thief gets into a home to rob and he carries a knapsack. There are fixed number of items in the home – each with its own weight and value – Jewellery, with less weight and highest value vs tables, with less value but a lot heavy. To add fuel to the fire, the thief has an old knapsack which has limited capacity. Obviously, he can’t split the table into half or jewellery into 3/4ths. He either takes it or leaves it
//return the value sum
let cases = [
  [[{weight: 2, value: 1}, {weight:3, value:2}, {weight:5, value:2}], 5, 3],
  [[{weight: 1, value: 1}, {weight:1, value:2}, {weight:2, value:5}], 3, 7],
  [[{weight: 7, value: 5}, {weight:2, value:2}, {weight:3, value:5}], 3, 5],
  [[], 8, 0]
];

//if know wt is too high then throw it out anyways instead of sorting it all first
//knapsaxk is not limited by price but limited by weight so care about wt first
//now instead of relying on largest price etc, you have to try all combos regardless therefore RECURSION so draw tree
//not neccessarily trying to get weight down to 0 in tree because could have less items that have greater value sum
//YOU ONLY HAVE 1 ITEM OF EACH SO THE NEXT LEVEL WON'T HAVE THE SAME NUMBER OF BRANCHES!!!!!!
//BRANCHES ARE NOT BASED OFF OF ITEMS IN THE HOUSE.
//ex: you enter house and see a table. what can you do? what's your choices? so choice is to take it or leave it. THAT's the decision bc it affects the downstream decision
//original runtrhough had branches as the item w and v and nodes as the difference left in sack
//but really it's a binary tree take it or leave it
  //each depth of tree represnet an item/index of the house list item
  //doesn't matter order since going through all options anyways so just start from begining of list.
  //tree ends at list length depth
  //if same largest value but different weight, either works because we just care about max
  //DON'T USE X'S ON TREE, IF SUBTRACTING THEN GO TO NEGATIVE NUMBERS, OR IF BOOLEAN THEN JUST FALSE IF NULL
  //can do negative or if the current remaining sack wt is < item wt then don't even recurse to even get the negative number that's when you can make x's

//EACH LEVEL ON THE TREE IS AN ITEM IN THE HOUSE WHICH IS EACH RECURSIVE CALL OF TAKE IT OR DON'T
//DON'T TAKE SLICES OF ITEMS OR IT'S EXPENSIVE
// function knapsack (items, itemIndex, sackWt, value) {
//   //recursion so first think of base case
//   if (items.length === itemIndex) return value;
//   if (sackWt === 0) return value;
//   //DO NOT ITERATE THROUGH THE ITEMS LIST SINCE YOUR BRANCHES ARE TO TAKE OR LEAVE
//   //no forloops bc only 2 decisions not unlimited coins like in coin change
//   if (items[itemIndex].weight > sackWt) return knapsack(items, itemIndex + 1, sackWt , value); //prev

//   return Math.max(                          //cannot subtract undefined from sackwt  vs sackwt is given to you as the main param so it'll always be there just like n
//   //i absolutely need to have the wt exist inorder to move on like in fib, (n-1) must exist and (n-2) must exist, n is given and always avail but not the 1 and 2
//                                             //the wt subtracting must be there
//                                             //loop items first before wt
//     knapsack(items, itemIndex + 1, sackWt - items[itemIndex]["weight"], value + items[itemIndex].value), //current value added
//     knapsack(items, itemIndex + 1, sackWt, value) //previous value added cached
    // ); //you're taking the max value from wether you take current item or not take current item
    //recurance relation = f(items,sackwt) = f(items, sackwt - )
// let take = 
// let notake = 
// Math.max(take, notake)
// }
//remember how many demensions for memo table is the parameter that changes, so here it's 3
//x, y = sackwt, itemindex  cell value aka accumulated value = value, dp/memo table. the way you fill it is with recursion formula, 


//MUST DECOUPLE YOURSELF FROM DIAGRAMMING AND WRITING THE FORMULA FOR DP BC ARE TWO DISTINCT
//THE CHANGING PARAMS MATCH TO THE NUMBER OF DEMENSIONS TO YOUR TABLE. YOU HAVE TO LOOK AT YOUR RECURSIVE FUNCTION AND THE SUBROUTINE NOT THE ONE THAT WRAPS IT
//EX: f(n) = f(n-1) +f(n-2)  botoms up adding the 2 subroutine, the only param that's changing is 1 so just a 1D arr
//here, 2 changing params well technically 3 but store the value in the cell

// cases.forEach(([items, wt, expected]) => {
//   let result = knapsack(items, 0, wt, 0)
//   if (result !== expected) {
//     console.log(result, items, wt, expected)
//   }
// })

function knapsackdp (items, maxSackWt) {
  let rows = maxSackWt + 1; //+ 1 to add additional row
  let cols = items.length;
  // let sack = Array(rows).fill (Array(cols).fill(0));//DON'T EVER DO THIS EVERRRR
  //https://stackoverflow.com/questions/8301400/how-do-you-easily-create-empty-matrices-javascript
  let sack = Array(rows).fill().map(()=>Array(cols).fill(0))
  //[ undefined, undefined, undefined, undefined ]
  //> Array(4) NOOOOOO
// [ <4 empty items> ] NOOOOO
  // let sack = []
  // for (let i = 0; i <= maxSackWt; i++) {
  //   let row = []
  //   for (let j = 0; j < items.length; j++) {
  //     row.push(0);
  //   }
  //   sack.push(row)
  // }
  //be careful what you're looping first
  // console.log(sack)
  for (let sackWt = 1; sackWt <= maxSackWt; sackWt++ )  { //already defaulted entire matrix as 0 so can start at sackwt 1
    // console.log(sack[sackWt])
    // if (sackWt ===2) break;
    for (let item = 0; item < items.length; item++) {
      let currItem = items[item]
      if (item === 0){
        if (currItem.weight <= sackWt) {
          sack[sackWt][item] = currItem.value 
        }
      } else if (currItem.weight > sackWt){
        sack[sackWt][item] = sack[sackWt][item-1] //same sack wt but with 1 less item aka 1 col over
      } else { //no need else if , and don't do two inner ifs bc just let Math.max do the conditional work for you
        sack[sackWt][item] = Math.max(currItem.value + sack[sackWt - currItem.weight][item - 1], sack[sackWt][item-1])
                                  //curr item val when = sack wt OR also when less than sack weight       //NOT considering item at all
                                  // REMEMBER THE ROW WHERE SACK WT = 0 SO ^ EQ STILL WORRRRRKS!!!!        
      }
    }
  }
  //what do you wish you had so you don't have to repeat

  return sack[maxSackWt][items.length - 1]
}




cases.forEach(([items, wt, expected]) => {
  let result = knapsackdp(items, wt)
  // if (result !== expected) {
  //   // console.log(result, items, wt, expected)
  // }
})