const { showHelpOnFail } = require("yargs");

//with every iteration, if first num is larger than 2nd num then swap them, all the way to end, thus larger number/end gets sorted first
function bubbleSort(arr) {
  let end = arr.length - 1;
  // let swap = NOT SWAP, BETTER TO DO IF SOTRED INSTEAD
  while (end > 0) {
    for (let i = 0; i < end; i++) {
      let left = arr[i],
        right = arr[i + 1];
      if (left > right) [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
      //swap
      else continue;
    }
    end--;
  }
  return arr;
}
//n^2   space: o(1)  https://www.youtube.com/watch?v=uJLwnsLn0_Q&list=PLjOkk6IoTYIFt2aHkhAETfBSgIwjvwfLW&index=5

// console.log(bubbleSort([9,4,7,52,5,7,2,100, 1]))

//hold onto curr value, keep shifting numbers larger than current value over, place current value into the empty slot
function insertionSort(arr) {
  let currVal;
  for (let i = 0; i < arr.length; i++) {
    //bc no point in reinserting first el with itself
    currVal = arr[i]; //i is used ONLY to keep track of curr val! don't touch it
    let j = i - 1;
    while (j >= 0 && arr[j] > currVal) {
      //j is anything to the LEFT of curr val/idx that we have to check to see if is > current val, if so then start shifting that to curr idx and then place currVal to empty slot when done
      //>= 0 for boundary check since j will keep checking more left value
      //DON'T TOUCH i here bc currVal will be held until we find its right place
      arr[j + 1] = arr[j];
      j--;
    }
    //get here bc the curr j AFTER prev j-- did not pass condition thus, curr j is smaller than currVal, leave curr j alone, the slot right next to it is where currVal should be placed, thus ADD back 1
    arr[j + 1] = currVal;
  }
  return arr;
}
//n^2    space: o(1)  https://www.youtube.com/watch?v=nKzEJWbkPbQ&list=PLjOkk6IoTYIFt2aHkhAETfBSgIwjvwfLW&index=3

// console.log(insertionSort([9,4,7,52,5,7,2,100, 1]))

//iterate through to the end each time, keep track on min, and then swap min to next start, thus start/smallest num gets sorted first
function selectionSort(arr) {
  // let start = 0, min = arr[0], minIdx = 0   //NO THIS DOESN'T WORK BUT MIN AT THE START WILL ALWAYS BE THE SMALLEST IF YOU SET MIN TO BE OUTSIDE OF THE LOOP!
  let start = 0,
    min,
    minIdx,
    shouldSwap = false;
  while (start < arr.length) {
    //last number should already be sorted at the time we handle the 2nd to last number
    min = arr[start];
    minIdx = start;
    for (let i = start; i < arr.length; i++) {
      if (arr[i] < min) {
        min = arr[i];
        minIdx = i;
        shouldSwap = true;
      }
    }
    if (shouldSwap) [arr[start], arr[minIdx]] = [arr[minIdx], arr[start]];
    start++;
  }
  return arr;
}
// https://www.youtube.com/watch?v=92BfuxHn2XE&list=PLjOkk6IoTYIFt2aHkhAETfBSgIwjvwfLW&index=10
//n^2    space: o(1)

console.log(selectionSort([9, 4, 7, 52, 5, 7, 2, 100, 1]));

/***************** QUICK SORT START *********************/
//designate a random pivor, have 1 pointer at start, 1 pointer at end, on both sides of pivot, swap if start >pivot && end<pivot, if only 1 applies then move the other pointer up/down to compare the next pair
//even if go BEYOND pivot, still swap anyways, if need to. doesn't nessessarily need to be to the left and right of pivot. pivot is just a number to reference really. stop iteration when start = end
//then partition the arr and do the same thing over. thus recursion needed
function quickSortMain(arr) {
  quickSort(arr, 0, arr.length - 1);
  return arr;
}

function quickSort(arr, left, right) {
  // let pivotIdx = Math.floor(Math.random() * arr.length), //NO! don't use random. Pick the middle of the array always!
  // let pivot = Math.floor((right - left) / 2) NO!!!!! bc need to account for the actual index number NOT just a division number
  //base case first!
  if (left >= right) return;
  let pivotIdx = Math.floor(left + (right - left) / 2); //WE DON'T USE THIS FOR ANYTHING BUT GET THE VALUE TO REFERENCE!!, NOT FOR PARTITIONING
  //Math.floor(right+left  /2 ) also works
  let pivot = arr[pivotIdx];
  let partitionIdx = partitionPtAfterSort(arr, left, right, pivot);
  // quickSort(arr, left, pivotIdx); NO! PIVOT is NOT the partition point bc it's just the idx at the value in the middle for us to use to evaluate, the partition point it where the left and right were last EQUAL, bc there's where all to left is smaller and all to right is larger.
  // quickSort(arr, pivotIdx, right);
  quickSort(arr, left, partitionIdx - 1);
  quickSort(arr, partitionIdx, right);
  //sorting in place so no need to return anything, that's main function's job
}

function partitionPtAfterSort(arr, left, right, pivot) {
  while (left <= right) {
    while (arr[left] < pivot) {
      //WHILE FIRST!!!!
      left++;
    } //remember, we don't care if we go beyong pivot, but also don't have to worry about booundaries bc we're working our way inwards and stopping at middle
    while (arr[right] > pivot) {
      right--;
    }
    // if(left < right && arr[left]>pivot && arr[right] <pivot) [arr[left], arr[right]] = [arr[right], arr[left]]  NO! already checked if less or greater
    if (left <= right) {
      //check left and right again bc we just edited them after we checked condition before
      [arr[left], arr[right]] = [arr[right], arr[left]];
      right--;
      left++;
    }
  }
  return left;
}

//n^2    space: o(log n)
console.log(quickSortMain([9, 4, 7, 52, 5, 7, 2, 100, 1]));

/***************** QUICK SORT end *********************/
