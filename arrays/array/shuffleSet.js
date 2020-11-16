const _ = require('lodash');

function sayHello() {
  console.log('Hello, World');
}

_.times(5, sayHello);


/* 


SetShuffler 
------------

You're given a Set<T> of entities of type T. You're required to return them in a randomly shuffled order (ensuring that the same entity isn't returned twice).

1. a. Create a class SetShuffler which takes a set of entities in its constructor, and has getShuffledOrder as a method that returns an array of those entities in a random order.

```ts
class SetShuffler<T> {
  constructor(public set: Set<T>) {}

  getShuffledOrder(): T[] {
    // Implement this.
  }
}

const set: Set<string> = new Set(['a', 'b', 'c', 'd', 'e', 'f'])

const shuffledOrder: string[] = new SetShuffler(set).getShuffledOrder()
```

2. Create unit-tests to test the SetShuffler class

3. Create an HTTP service which returns a randomly picked item in the response of a request.
  */


class SetShuffler {
  constructor (set){
    this.set = set
    this.arr = [...set]
  }

  getShuffledOrder(){
    let arr2 = [...this.arr]
    for (let i in this.arr) {
      let randomIndex = Math.floor(Math.random() * arr2.length);
      let temp = arr2[i];
      arr2[i] = arr2[randomIndex];
      arr2[randomIndex] = temp;
    }
    
    return arr2
  }
}

const set = new Set(['a', 'b', 'c', 'd', 'e', 'f']);
let newSet = new SetShuffler(set);

function testLength (testSet){
  return testSet.getShuffledOrder().length === newSet.set.size

}

function testChars(testSet){
  let shuffledTestSet = testSet.getShuffledOrder();
  for (let i in shuffledTestSet){
    if (shuffledTestSet[i] !== testSet.arr[i]) return true;
  }
  return false;
}
fisher shuffle
console.assert(testLength(newSet) === true, "Test length of newSet should return true")
console.assert(testChars(newSet) === true, "Shuffled order was not the same as original set")