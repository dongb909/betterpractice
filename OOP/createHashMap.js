function hash(string, size) {
  let result = 0;
  for (i in string) {
    result += string.charCodeAt(i);
  }
  return result % size;
}

class HashTable {
  constructor(size) {
    this.buckets = Array.from({ length: size }, () => new Map()); //CANNOT use the fill method or else it won't create new objs
    this.size = size;
    //can do new Array(size) and then loop through and return new Map for each
    //for (let i = 0; i < size; i++){
    // this.bucket[i] = new Map();
    // }
  }

  insert(key, value) {
    let idx = hash(key, this.size);
    //don't have to check if already have key in that bucket bc .set will override anything there anyways
    this.buckets[idx].set(key, value);
  }

  remove(key) {
    let idx = hash(key, this.size);
    let deleted = this.buckets[idx].get(key);
    this.buckets[idx].delete(key);
    return deleted; // takes care of if the key's not there then it'll just return null/undefined
  }

  lookup(key) {
    let idx = hash(key, this.size);
    let val = this.buckets[idx].get(key);
    return val ? val : "No such key";
  }
}

// console.log(hash('a', 100)) //testing hashing function
let map = new HashTable(10);
map.insert("abcde", 2);
map.insert("abc", 3);
map.insert("ajfklds", 4);
map.insert("ajfiwojnewklflsekfs", 5);
map.remove("abcde");
console.log(map.lookup("ajfiwojnewklflsekfs"));
// console.log(map.buckets)
