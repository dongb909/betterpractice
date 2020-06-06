/*Given an array of strings, group anagrams together.

Example:

Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
Output:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
Note:

All inputs will be in lowercase.
The order of your output does not matter. */
/**
 * @param {string[]} strs
 * @return {string[][]}
 */

//edge: if no words are anagrams, then still return each in its own batch within an arr
//all same length or diff? allll are going to be same length

var groupAnagrams = function(strs) {
    //length => grp by length
    //char
    //grouping track by using objs, made up of properties and values
        //property = key
    //operation is called hash function, generates sorted string
    const groupings = strs.reduce((grps, str) => {
        let key = hash(str)
        if (grps[key]) {
            grps[key].push(str)
        } else {
             grps[key] = [str]
        }
         return grps
    }, {}) //must always RETURN at each iteration!!!!!!!!!!!
    return Object.values(groupings)
};

let hash = function (str) {
    return str.split('')
        .sort((a,b) => a.charCodeAt(0)-b.charCodeAt(0))
        .join('')
}
//s=strs , t = str chars
//time : O(s *  t log t ) 
/*space: O(s * max t)
    accummulator key: []   s
    str split t
    )*/
//don't use n bc tho 1 input you have 2 functions