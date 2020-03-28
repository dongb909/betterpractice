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

// var maxProfit = function(prices) {
//     let max = 0; //if there's no positive time to buy and sell at all meaning it's a loss or even
//     let min = prices[0];
// //we don't care about indices because we're just concerned with max difference not the indexes
//     for(let i = 1; i < prices.length; i++){
//       max= Math.max(max, prices[i] - min);
//       min= Math.min(min, prices[i])
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






// var maxProfit = function(prices) {
//   let max=0;
//   let min=Number.POSITIVE_INFINITY;
  
//   for(let i = 0; i < prices.length; i++) {
//     if (prices[i] < min){
//       min = prices[i]
//     } else if (prices[i] - min > max) {
//       max = prices[i]-min;
//     } 
//   }
//   return max
// };
// console.log(maxProfit(
//   [7,2,5,3,1,4]))

let dayToBuySell = (nums) => {
  let maxProfit = 0
  let maxIndex 
  let minIndex = 0;
  let tempMinIndex = 0;
  let minPrice = Number.POSITIVE_INFINITY;

  for (let i =0; i<nums.length; i++){
    if (nums[i] < minPrice){
        minPrice = nums[i]
        tempMinIndex = i
      } else if (nums[i] - minPrice > maxProfit) {
        maxProfit = nums[i]-minPrice;
        maxIndex= i
        minIndex=tempMinIndex

      } 

  }

  return [[minIndex,maxIndex], maxProfit]
}

console.log(dayToBuySell([7,2,5,8,4,9]))