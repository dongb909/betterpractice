/*Say you have an array for which the ith element is the price of a given stock on day i.

If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.

Note that you cannot sell a stock before you buy one.

Example 1:

Input: [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
             Not 7-1 = 6, as selling price needs to be larger than buying price.
Example 2:

Input: [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0. */

const { type } = require("os");

// var maxProfit = function(prices) {
//     let max = 0; //if there's no positive time to buy and sell at all meaning it's a loss or even
//     let min = prices[0];
// //we don't care about indices because we're just concerned with max difference not the indexes
//     for(let i = 1; i < prices.length; i++){
//       max= Math.max(max, prices[i] - min); //calc max with the current min
//       min= Math.min(min, prices[i])    //set the current min in case our current number is the smallest
//     }
//     return max
// };

// var maxProfit = function(prices) {
//   var min = Number.MAX_VALUE;
//   var sum = 0;

//   for (var i = 0; i < prices.length; i++) {
//     var v = prices[i];

//     if (v < min) {
//       min = v;
//     } else {
//       sum = Math.max(sum, v - min);
//     }
//   }
//   return sum;
// };

// var maxProfit = function(prices) {
//   let maxProfit = 0;
//   let lowestPrice = prices[0];

//   for (let i = 1; i < prices.length; i += 1) {
//       if (prices[i] < lowestPrice) lowestPrice = prices[i];
//       maxProfit = Math.max(prices[i] - lowestPrice, maxProfit);
//   }

//   return maxProfit;
// };

var maxProfit = function (prices) {
  let max = 0;
  let min = Number.POSITIVE_INFINITY; //they didn't ask you to track any indices. just the max profit is all

  for (let i = 0; i < prices.length; i++) {
    if (prices[i] < min) {
      min = prices[i];
    } else if (prices[i] - min > max) {
      max = prices[i] - min;
    }
  }
  return max;
};
// console.log(maxProfit([7,2,5,3,1,4]))       //if there's [7,2,5,3,1,4, 11], then 11-1=10,
//if [7,2,5,3,11, 1,4] then 11-2 = 9, doesn't matter if there's a min that's 1 because there's no profit greater than 9 after the 1 anyways

//  curr       min     max
//             7        0-7=-7  => 0
//             2        0-2=-2  => 0
//                     5-2=3
//                     3-1=1
//             1
//                     4-1=3

// let dayToBuySell = (nums) => {
//   let maxProfit = 0
//   let maxIndex
//   let minIndex = 0;
//   let tempMinIndex = 0;
//   let minPrice = Number.POSITIVE_INFINITY;

//   for (let i =0; i<nums.length; i++){
//     if (nums[i] < minPrice){
//         minPrice = nums[i]
//         tempMinIndex = i
//       } else if (nums[i] - minPrice > maxProfit) {
//         maxProfit = nums[i]-minPrice;
//         maxIndex= i
//         minIndex=tempMinIndex

//       }

//   }

//   return [[minIndex,maxIndex], maxProfit]
// }

// console.log(dayToBuySell([7,2,5,8,1,4]))
// Input: [7,1,5,3,6,4]

// Output: 5

var maxProfit2 = function (prices) {
  let min = prices[0];
  let maxProfit = 0;
  for (const num of prices) {
    // console.log(typeof(num))
    maxProfit = Math.max(num - min, maxProfit);
    min = Math.min(min, num);
  }
  return maxProfit;
};
// console.log(maxProfit2([7,2,5,8,1,4])) //6
// console.log(maxProfit2([7, 1, 5, 3, 6, 4])); //5

let dayToBuySell = (prices) => {
  let min = prices[0]; //a number here
  let minIdx, maxIdx;
  let maxProfit = 0;
  let finalMinIdx, finalMin; //YOU FORGOT THIS PART BEFORE
  for (const idx in prices) {
    if (prices[idx] < min) {
      min = prices[idx];
      minIdx = parseInt(idx); //GO AHEAD AND SET MIN AND MINIDX HERE BUT IT JUST KEEPS TRACK OF CURRENT
    } else if (prices[idx] - min > maxProfit) {
      maxProfit = prices[idx] - min;
      maxIdx = parseInt(idx);
      finalMinIdx = minIdx; //SET THE ACTUAL MIN IDX AND BUY PRICE HERE BECAUSE THIS IS THE CURRENT MIN FOR THIS NEW MAX PROFIT!!
      finalMin = min;
    }
  }
  //BE CAREFUL!!!! THE CHAR HERE ALTHOUGH REPRESENT INDICES, THEY RETURN AS STRINGSS!! NOT NUMBERED INDICES BUT NUMBERED STRINGS!!
  //THESE WILL WORK FINE IF PLACED IN A MATH EQUATION BUT NOT BY THEMSELVES
  return {
    dayToBuy: finalMinIdx,
    dayToSell: maxIdx,
    buyPrice: finalMin,
    sellPrice: prices[maxIdx],
    maxProfit: maxProfit,
  };
};

console.log(dayToBuySell([7, 2, 5, 8, 1, 4]));
