/*You are given coins of different denominations and a total amount of money amount. Write a function to compute the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.

Example 1:

Input: coins = [1, 2, 5], amount = 11
Output: 3 
Explanation: 11 = 5 + 5 + 1
Example 2:

Input: coins = [2], amount = 3
Output: -1
Note:
You may assume that you have an infinite number of each kind of coin. */


/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */

//coins sorted? assume not and so sort
/*mod as a remainder but at some point the remainder might not be divisiable so you'll have to backtrack
will have to try all combinations regardless to know which is the lowest combo
thus let recursion try all the combos but obviously keep track of the least one
branch factor^ max depth    => Oc^a 
4 directions = 4 branches    board m*n for depth unless there's obstacles in the board.
graphs even allow diag so 8 branches ^ # of nodes*/
var coinChange = function(coins, amount) {
  let result = subRoutine(coins, amount, 0);
  if (result === Infinity) {
      return -1
  }
  return result;
};

//number of coins by calc the depth aka branches = coinsUsed
// function subRoutine(coins, amount, coinsUsed) {
//   if (amount === 0) {
//       return coinsUsed;
//   } 
//   if (amount < 0) {
//       return Infinity;
//   }
//   let arr=[]
//   for (let i = 0; i < coins.length; i++) {
//       // amount = amount - coins[i]; //don't do this beucase it gets saved in the next iteration!!
//       //remainingAmt
//       arr.push(subRoutine(coins, amount - coins[i], coinsUsed + 1));
//   }
//   return Math.min(...arr);
// }

function subRoutine(coins, amount, coinsUsed) {
  if (amount === 0) {
      return coinsUsed;
  } 
  if (amount < 0) {
      return Infinity;
  }
  let smallest = coinsUsed;
  for (let i = 0; i < coins.length; i++) {
      smallest = Math.min(subRoutine(coins, amount - coins[i], coinsUsed + 1), smallest);
      //recurance relation = the formula
  }
  return smallest;
}

//    return coins.reduce((localCoinsUsed, denomination) => {
//   return Math.min(localCoinsUsed, subRoutine(coins, amount - denomination, coinsUsed + 1))
// }, Infinity) 


//recursion is top down 11- something minus something, but dynamic programming is bottoms up
//building from smallet pieces up to our amt, the smallest possibel amt we can start with is 1
//if we found the min # of coins to produce 11, now lets say the min num of coins to make 1, then 2, then 3, then 4 as amount

//use arr bc the indices represent the amount but set it at 0. 




var coinChange = function(coins, amount) {
  let changeCount = Array(amount + 1).fill(Infinity); //bc amount = length but indices need up to 11 not just 0-10
   changeCount[0] = 0;
   for (let amt = 1; amt <= amount; amt++){ //bc arr represents indices so much go up to the amt
       //for every amt we're going to compute the min amt of coins from the least aka bottoms up
        //if subtract from prev it's always 1 tho
       for (coin in coins) { //instead of for let i or can do for each but this way more declarative
           // let subAmt = amt - coin;
           // if (subAmt < 0) {                NOOOOOOOO
           //     continue;
           // } 
           // if (subAmt === 0) {
           //     changeCount[amt] = 1;
           // }
           
           //for coins greater than amt then don't even need to bother.
           if (coin > amt) {
               break;
           }
           changeCount[amt] = Math.min(changeCount[amt], changeCount[amt - coin] + 1); //so +1 for our current coin we just subtracted. 
               // no use of min anywhere
           //min is from the PREVIOUS coin iteration NOT The outer amt loop
           
              
       }
   }
   return changeCount[amount];
};




var coinChange = function(coins, amount) {
  coins.sort((a,b) => a-b); //MUST SORRRRRRTTTTTTTTT and a-b
  //bc if amt is 86 and we - 83 = 3 but we haven't computed for 3 yet. 
 let changeCount = Array(amount + 1).fill(Infinity);
  changeCount[0] = 0;
  for (let amt = 1; amt <= amount; amt++){ 
      for (coin of coins) { ///DON'T DO COIN INNNN, IT'S COIN OFFFF
         
          if (coin > amt) {
              break; //BREAKS ENTIRE coin LOOP so goes to NEXT INDEX amt
              //if use break, must make sure it's sorted, if not sorted then use continue to go to next coin.
              // continue;
          }
          changeCount[amt] = Math.min(changeCount[amt], changeCount[amt - coin] + 1); 
      }
  }
  // console.log(changeCount[249])
  return changeCount[amount] === Infinity ? -1 : changeCount[amount];
};

//time complexity: sort = c log c + create arr = a + iterating = c*a === Oc*a 
//we only care about min(c,a) in the case of a really large c denominations. and it works only when sorted.
//or more accurately O min(c, a) * a NOT c^2 bc still going through all amount up to amount
//space complexity: create arr = a that's it.

//when better to use coninue and not sort? if denominations is humongous, it makes no sense to sort them bc the time would take super long anyways even taking more time iterating through. time complexity would be the same but inefficitient



//note: runtime can be derived by number of changing input?













