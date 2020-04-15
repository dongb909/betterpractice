/*
The nnth Fibonacci number is defined in terms of the two previous Fibonacci numbers, so this seems to lend itself to recursion.
As with any recursive function, we just need a base case and a recursive case:

Base case: nn is 0 or 1. Return nn.
Recursive case: Return fib(n - 1) + fib(n - 2).
  function fib(n) {
  if (n === 0 || n === 1) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}

So our total runtime is O(2^n)O(2 
n
 ). That's an "exponential time cost

   class Fibber {
  constructor() {
    this.memo = {};
  }

  fib(n) {

    // Edge case: negative index
    if (n < 0) {
      throw new Error('Index was negative. No such thing as a negative index in a series.');
    }

    // Base case: 0 or 1
    else if (n === 0 || n === 1) {
      return n;
    }

    // See if we've already calculated this
    if (this.memo.hasOwnProperty(n)) {
      return this.memo[n];
    }

    const result = this.fib(n - 1) + this.fib(n - 2);

    // Memoize
    this.memo[n] = result;

    return result;
  }
}

 What about space? memo takes up nn space. Plus we're still building up a call stack that'll occupy nn space. Can we avoid one or both of these space expenses?

Look again at that tree. Notice that to calculate fib(5) we worked "down" to fib(4), fib(3), fib(2), etc.

What if instead we started with fib(0) and fib(1) and worked "up" to nn?

What if instead we started with fib(0) and fib(1) and worked "up" to nn?

Solution
We use a bottom-up ↴ approach, starting with the 0th Fibonacci number and iteratively computing subsequent numbers until we get to nn.

  function fib(n) {

  // Edge cases:
  if (n < 0) {
    throw new Error('Index was negative. No such thing as a negative index in a series.');
  } else if (n === 0 || n === 1) {
    return n;
  }

  // We'll be building the fibonacci series from the bottom up
  // So we'll need to track the previous 2 numbers at each step
  let prevPrev = 0;  // 0th fibonacci
  let prev = 1;      // 1st fibonacci
  let current;       // Declare current

  for (let i = 1; i < n; i++) {

    // Iteration 1: current = 2nd fibonacci
    // Iteration 2: current = 3rd fibonacci
    // Iteration 3: current = 4th fibonacci
    // To get nth fibonacci ... do n-1 iterations.
    current = prev + prevPrev;
    prevPrev = prev;
    prev = current;
  }

  return current;
}

Complexity
O(n)O(n) time and O(1)O(1) space.
 */