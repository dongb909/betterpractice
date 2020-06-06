


test('add item to order', () => {
  let cache = new LRUcache( 2 /* capacity */ );
  cache.add(1, 1);
  cache.add(2, 2);
  expect(cache.access(1)).toBe(1);       // returns 1
  // cache.add(3, 3);    // evicts key 2
  // cache.access(2);       // returns -1 (not found)
  // cache.add(4, 4);    // evicts key 1
  // cache.access(1);       // returns -1 (not found)
  // cache.access(3);       // returns 3
  // cache.access(4); 
});