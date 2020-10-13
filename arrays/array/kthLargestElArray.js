/*
Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Example 1:

Input: [3,2,1,5,6,4] and k = 2
Output: 5
Example 2:

Input: [3,2,3,1,2,4,5,5,6] and k = 4
Output: 4
Note:
You may assume k is always valid, 1 ≤ k ≤ array's length. */

//brute force
// var findKthLargest = function(nums, k) {
//   let sorted = nums.sort((a,b) =>{
//     return b-a
//   })
//   // console.log(sorted[k-1])
//   return sorted[k-1]
// };
// let distinct = [...new Set(nums)]


//nonbruteforce and without sorting
var findKthLargest = function(nums, k) {
  if (nums.length < k) return null
  sort(nums, nums.length, 0, nums.length-1)
  return arr[nums.length-k-1]
};

let sort = (arr, length, start, end) => {
  //get pivot
  if(length <2){
    return 
  }
  let pivot = Math.floor(Math.random() * length)
  //move pivot out of the way, swap with last el
  let temp = arr[pivot] 
  arr[pivot] = arr[length - 1];
  arr[length-1] = temp;
  //don't count pivot in length; i is just where to place the next smaller element than pivot; j is the main iterator
  let i=start
  for(let j=start; j < end-1;){
    if (arr[j] < arr[length-1]) {
      temp = arr[i];
      arr[i]=arr[j];
      arr[j] = arr[i];
      i++;
      j++;
    } else { //if j is greater than or equal to pivot then leave it alone
      j++
    }
  }
  //move the pivot to it's right position it should be in the original arr
  temp = arr[i]
  arr[i] = arr[length-1]
  arr[length-1]=temp
  //now split the array around the pivot and recurse
  // sort left
  sort(arr, pivot, 0, pivot-1)
  // sort right
  sort(arr, arr.length-pivot-1, pivot+1, arr.length)
  //not returning anything. working on the referrence to the same arr
} 


// console.log(findKthLargest([3,2,3,1,2,4,5,5,6],4))



/*
var findKthLargest = function(nums, k) {
    let h = nums.length + 1 - k;
    return findKthSmallestWithRange(nums, h);
};
    
function findKthSmallestWithRange(nums, k) {
    k--;
    
    let low = 0, 
        high = nums.length - 1, 
        mid,
        partitionPoint;
    
        while (high > low) {
            mid = low + Math.floor((high - low + 1) * Math.random()),
            partitionPoint = partition(nums, mid, low, high);
            if (partitionPoint === k) return nums[k];
            else if (partitionPoint > k) high = partitionPoint - 1;
            else if (partitionPoint < k) low = partitionPoint + 1;
        }
        return nums[k];
    
    
}

function partition(nums, iPivot, begin, end) {


    let low = begin, high = end + 1, pivot = nums[iPivot];
    
    [nums[begin], nums[iPivot]] = [nums[iPivot], nums[begin]];

    while (true) {
        while (nums[++low] < pivot) if (low === end) break;
        while (nums[--high] > pivot) if (high === begin) break;
        if (low >= high) break;
        [nums[low], nums[high]] = [nums[high], nums[low]];
    }
    [nums[begin], nums[high]] = [nums[high], nums[begin]];
    return high;    
}
 */

 /*var findKthLargest = function(nums, k) {
  return  nthElement(nums,k)
function nthElement(arr,n,l = 0,r = arr.length - 1){ 
    let pivot = Math.floor( Math.random() * (r - l + 1) ) + l;//Math.random 区间为[0,1);
    swap(arr,pivot,r);
    let j = l - 1;
    for(let i = l;i < r; i++){
        if(arr[i] < arr[r]){
            j++;
            swap(arr,j,i);
        }
    }
    j++;
    swap(arr,j,r);//这里需要注意换回来。
    if(j === arr.length - n ){
        return arr[j]
    }else if(j < arr.length - n ){
        return nthElement(arr,n,j + 1 ,r);
    }else{
        return nthElement(arr,n, l, j - 1);
    }
}
  function swap(arr,i,j){
    let t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
}
}; */


//using heaps
var findKthLargest2 = function(nums, k) {
  if(nums.length < k) return null
  const minHeap = []
  let i = k
  //making minheap default
  while(k){
    minHeap.push(nums.pop())
    k--
  }
  // //heapify so not counting this as sorting in this case
  minHeap.sort((a,b) => a - b)
  while(nums.length > 0) {
    let currNum = nums.pop()
    if (currNum > minHeap[0]){
      minHeap.shift()
      minHeap.push(currNum)
    }
  }
  console.log(minHeap)
  return minHeap.shift()
}

console.log(findKthLargest2([3,2,3,1,2,4,5,5,6],4)) //4
// console.log(findKthLargest2([3,2,1,5,6,4],2)) //5
