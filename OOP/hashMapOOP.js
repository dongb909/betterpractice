// Implement a class called VersionedHashMap. As the name implies, this data structure is backed by a hash map. The interface is similar but it can be used to retrieve previous versions of values.

// Please implement the following methods for our class VersionedHashMap:
// get(key) - return the latest value for key (or return null)
// get(key, timestamp) - return the latest value for key on or before timestamp (or return null)
// put(key, value) - insert the value for key and return the timestamp of the operation
// freeze(timestamp) - returns a plain hash map with the latest value for each key on or before timestamp

// t1: put('dog', ‘a') -> t1
// t2: put('cat', 'b') -> t2
// t3: put('dog', 'c') -> t3
// t4: get('dog') -> 'c'
// t5: get('dog', t2) -> 'a'
// freeze(t0) -> {}
// freeze(t1) -> { dog: 'a’ }
// freeze(t2) -> { dog: 'a', cat: 'b' }
// freeze(t3) -> { dog: 'c', cat: 'b' }
// freeze(t5) -> { dog: 'c', cat: 'b' }

/*


*/

class VersionedHashMap {
  constructor() {
    this.storage = {};
    this.timeStack = [{}];
    this.timeStackLength = 1;
    this.counter = 0;
  }

  put(key, val) {
    this.storage[key] = val;
    this.counter += 1;
    this.timeStack.push({ ...this.storage });
    this.timeStackLength = this.timeStack.length;
    return this.counter;
  }

  get(key) {
    // console.log('hi')
    return !this.storage[key] ? null : this.storage[key];
  }
  // t5: get('dog', t2) -> 'a'
  getAtTime(key, timeStamp) {
    // console.log(this.timeStack)
    // if (this.timeStack[timeStamp]) {
    //   let curr = this.timeStack[timeStamp];
    //   if (curr[key]) return curr[key];
    // }
    let curr = this.timeStack[timeStamp];
    if (curr && curr[key]) return curr[key];
    // for (let i = this.timeStack.length - 1; i > 0; i--) {
    //   console.log(i);
    //   if ((i = timeStamp)) continue;
    //   let curr = this.timeStack[i];
    //   if (curr[key]) return curr[key];
    // }
    let value = this.timeStack[this.timeStack.length - 1][key];
    return !value ? null : value;
  }
  // get(key, timestamp) - return the latest value for key on or before timestamp (or return null)

  freeze(timeStamp) {
    // if (!this.timeStack[timeStamp]) return {};
    // return this.timeStack[timeStamp];
    let status = this.timeStack[timeStamp];
    return !status ? this.timeStack[this.timeStackLength - 1] : status;
    // return this.timeStack[timeStamp];
    //add at new time to end
    //access by index time value
  }
}

let map = new VersionedHashMap();
map.put("dog", "a");
map.put("cat", "b");
map.put("dog", "c");

console.log(map.get("dog"));
console.log(map.getAtTime("dog", 2));
console.log(map.freeze(0));
console.log(map.freeze(1));
console.log(map.freeze(2));
console.log(map.freeze(3));
console.log(map.freeze(4));

// t1: put('dog', ‘a') -> t1
// t2: put('cat', 'b') -> t2
// t3: put('dog', 'c') -> t3
// t4: get('dog') -> 'c'
// t5: get('dog', t2) -> 'a'
// freeze(t0) -> {}
// freeze(t1) -> { dog: 'a’ }
// freeze(t2) -> { dog: 'a', cat: 'b' }
// freeze(t3) -> { dog: 'c', cat: 'b' }
// freeze(t5) -> { dog: 'c', cat: 'b' }
