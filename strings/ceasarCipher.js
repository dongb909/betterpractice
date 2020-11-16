// function caesarCipher(s, k) {
//   let res = []
//   let shiftedAsce
//   let charIs, newChar
//   for (let idx in s){
//     let asce = s.charCodeAt(idx)
//     //lowercase
//     if (asce >=65 && asce <91){
//       charIs = asce - 65 + 1 //a = 1
//       newChar = (charIs + k) % 26 //a65+2 = 3%26 aka = 3 c67
//       //NOT JUST shiftedAsce = newChar + 65 -1 bc when z %26 then shiftedAsce would be 64 which is not what you want
//       //bc at z then %26 would be 0 so when newChar is 0 then want to + 25 NOT 26
//       shiftedAsce = newChar  === 0 ? newChar + 65 + 25 : newChar + 65 -1
//       console.log(newChar, '1')
//       console.log(shiftedAsce, 'lower')
//       res.push(String.fromCharCode(shiftedAsce))
//     }
//     //uppercase
//     else if (asce >=97 && asce <123){
//       charIs = asce - 97 + 1 //A = 1
//       newChar = (charIs + k) % 26 //A97+2 = 3%26 aka = 3 C99
//       shiftedAsce = newChar === 0? newChar + 97+25: newChar + 97-1
//       console.log(newChar,'1')
//       console.log(shiftedAsce,'upper')
//       res.push(String.fromCharCode(shiftedAsce))
//     //symbol
//     } else {
//       res.push(s.charAt(idx))
//     } 
//   }
//   console.log(res, 'res')
//   return res.join('')
// }




function caesarCipher(s, k) {
  let res = []
  for (let idx in s){
    let asce = s.charCodeAt(idx)
    let shift = k%26
    let final = asce + shift
    // console.log(asce, shift, final)
    //lowercase
    if (asce >=65 && asce <91){
      // if(final > 90) res.push(String.fromCharCode(final - 26))
      // else res.push(String.fromCharCode(final))
      let char = final > 90 ? final -26: final
      res.push(String.fromCharCode(char))
    }
    //uppercase
    else if (asce >=97 && asce <123){
      // if(final > 122) res.push(String.fromCharCode(final - 26))
      // else res.push(String.fromCharCode(final))
      let char = final > 122 ? final - 26: final
      res.push(String.fromCharCode(char))
    //symbol
    } else {
      res.push(s.charAt(idx))
    } 
  }
  console.log(res, 'res')
  return res.join('')
}


console.log(caesarCipher('159357lcfd', 98))
// console.log(caesarCipher('LCFD', 98))
//159357fwzx