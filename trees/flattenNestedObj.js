/*Consider the nested object which contains the properties "a", "b", "c".
const nestedObj = {
    a:1,
    b:['a', 'b','c'],
    c:{
        c1:1, 
        c2:[{d:1}, {e:2}]} 
    }
        
Write a function that takes it and flattens all the properties so that every 
property value is represented in a top-level property, including the arr
of values represented in property "b" an the obj and arr in "c". Values can be ANTHING.
For true return True, false return False, null return Null
result:
  {
    a: 1,
    b_0: 'a',   top b _ index 0 for arrays :  final value
    b_1: 'b',
    b_2: 'c',
    c-c1: 1,    
    c_c2_0_d: 1,    top c _ objKey c2 _ index 0 _ objKey d :  final value
    c_c2_1_e: 2
  }*/

// import { type } from "os"


//only recurse if arr or obj, thus base case is everything else.
//pass down previous key for each call
//base case join all the previous keys

const flattenObj = (obj) => {
  let finalObj = {}
  flattenMiniObj(obj, finalObj)
  return finalObj
}

const flattenMiniObj = (obj, finalObj, currKeyStr = "") => { //n^2
  //recurse if obj or arr
  // if(obj === undefined) console.log(currKeyStr)
  if (obj.constructor === Object) {
    for (let [key,val] of Object.entries(obj)){
      // if(typeof(val)==='object')
      // console.log(key, val, "obj")
      // let tempKey = currKeyStr
      let newKey = !currKeyStr ? key : currKeyStr + '_' + key
      flattenMiniObj(val, finalObj, newKey) //not worried about values, just the keys bc there's only 1 value at the end
      // currKeyStr = tempKey don't even need this, just name it a different name in the first place
    }
  } else if (Array.isArray(obj)){
    obj.forEach((el, idx) => {
      // console.log(el, key, 'array')

      let newKey = !currKeyStr ? idx : currKeyStr + '_' + idx
      flattenMiniObj(el, finalObj, newKey)
      // currKeyStr = tempKey
    })
  } else if (obj === null) {
    finalObj[currKeyStr] = "Null"
  } else if (typeof(obj)==='number' || typeof(obj)=== 'string') {
    finalObj[currKeyStr] = obj
  } else {
    finalObj[currKeyStr] = obj ? "True" : "False"
  }
  //base case anything else, this is where you add to final obj
}

// console.log(typeof({}))

// console.log(flattenObj({a:{b:1}}))

console.log(flattenObj({
  a:1,
  b:['a', 'b','c'],
  c:{
      c1:1, 
      c2:[{d:1}, {e:2}]} 
  }))









  
//   /*//FIRST ATTEMPT ALONE
//   const flattenObj = (obj) => {
//     // if(obj.constructor !== Object) return "invalid entry" use this and then make a helper function to recurse itself if you can't guarantee that you have an obj on hand
//     if(Object.keys(obj).length === 0)return result //!{} => false thus and empty obj still returns true, same with empty arrays
//     return flattenMiniObj(obj, result)
//   }
//   const flattenMiniObj = (obj, finalObj, currKeyStr = "") => {
//     // if(currKeyStr) {let mainKey = currKeyStr}
//     for(let [key,val] of Object.entries(obj)){  //NOT 'in' and not 'of obj', must be from an iterable arr!or str!
//       if(val === null) finalObj[key] = "Null"
//       else if(typeof(val) === "number" || typeof(val) === "string") finalObj[key] = val
//       else if(typeof(val) === "boolean") finalObj[key] = val === true? "True" : "False"
//       else if(val.constructor === Object) {
//         let mainKey = currKeyStr ? `${mainKey}_${key}` : key
//         flattenMiniObj(val, finalObj, mainKey)
//       }
  
//       // else if(Array.isArray(val)) {
//       //   if(val.length === 0) result[key] = []
//       //   for (let el of val){
//       //     flattenArr(val, )
//       //   }
//       // }
//     }
//     //not returning anything
//   }































// const { type } = require("os");
// const { boolean } = require("yargs");
// const flattenArr = (arr) => {};

// const nestedObj = {
//   a: 1,
//   // b:['a', 'b','c'],
//   c: {
//     c1: 1,
//     // c2:[{d:1}, {e:2}]
//   },
// };

// // console.log(flattenObj(nestedObj))
// */


// //ONLINE EXAMPLES OF PURELY NESTED OBJECTS
// //METHOD 1
// const flattenObject = (obj, prefix = "") =>
//   Object.keys(obj).reduce((acc, k) => {
//     const pre = prefix.length ? prefix + "." : "";
//     if (typeof obj[k] === "object")
//       Object.assign(acc, flattenObject(obj[k], pre + k));
//     else acc[pre + k] = obj[k];
//     return acc;
//   }, {});
// console.log(flattenObject({ a: { b: { c: 1 } }, d: 1 }));

// //METHOD 2
// Object.assign(
//   {},
//   ...(function _flatten(o) {
//     return [].concat(
//       ...Object.keys(o).map((k) =>
//         typeof o[k] === "object" ? _flatten(o[k]) : { [k]: o[k] }
//       )
//     );
//   })(yourObject)
// );

// //METHOD 3
// export const flattenObject = (obj) => {
//   const flattened = {};

//   Object.keys(obj).forEach((key) => {
//     if (typeof obj[key] === "object" && obj[key] !== null) {
//       Object.assign(flattened, flattenObject(obj[key]));
//     } else {
//       flattened[key] = obj[key];
//     }
//   });

//   return flattened;
// };

// //BEST METHOD 4
// const source = {
//   a: 1,
//   b: {
//     c: true,
//     d: {
//       e: "foo",
//     },
//   },
//   f: false,
//   g: ["red", "green", "blue"],
//   h: [
//     {
//       i: 2,
//       j: 3,
//     },
//   ],
// };

// const solution = {
//   a: 1,
//   "b.c": true,
//   "b.d.e": "foo",
//   f: false,
//   "g.0": "red",
//   "g.1": "green",
//   "g.2": "blue",
//   "h.0.i": 2,
//   "h.0.j": 3,
// };

// const flatten = (obj, prefix = "", res = {}) =>
//   Object.entries(obj).reduce((r, [key, val]) => {
//     const k = `${prefix}${key}`;
//     if (typeof val === "object") {
//       flatten(val, `${k}.`, r);
//     } else {
//       res[k] = val;
//     }
//     return r;
//   }, res);

// console.log(flatten(source));
