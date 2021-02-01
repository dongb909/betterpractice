/*
 *only ¥, €, and $ are valid currencys
 *yens don't have commas nor decimals
 *euros don't have commas but can have deci
 *usd has both commas and deci
 *negatives are either '-' or wrapped in parens
 *if there's a deci, must have 2 cents positions and must have a 0 before it if no whole numbers pre deci
 *cannot start with 0 unless right before deci
 *all else return false
 *can have alphabet, other chars, displaced valid chars etc as input which should return false
 */

function isCurrency(strCurr) {
  const numSet = new Set("0123456789".split(""));
  const [symb, symbIdx] = currencySymb(strCurr);
  if (!symb) return false;
  const len = strCurr.length;
  const end = strCurr.charCodeAt(len - 1) === 41 ? len - 1 : len;
  const amt = strCurr.slice(symbIdx + 1, end);
  if (!amt || !numSet.has(amt[0])) return false;
  if (symb === "¥") return isYEN(amt, numSet);
  if (symb === "€") return isEUR(amt, numSet);
  if (symb === "$") return isUSD(amt, numSet);
  return false;
}

function isNeg(strCurr) {
  return strCurr[0] === "-" || (strCurr.charCodeAt(0) === 40 && strCurr.charCodeAt(strCurr.length-1) === 41);
}

function currencySymb(strCurr) {
  const symbs = new Set(["¥", "€", "$"]);
  if (symbs.has(strCurr[0])) return [strCurr[0], 0];
  if (symbs.has(strCurr[1]) && isNeg(strCurr)) return [strCurr[1], 1];
  return [null, -1];
}
function isYEN(amt, numSet) {
  if (amt.length > 1 && amt[0] === "0") return false;
  for (let char of amt) {
    if (!numSet.has(char)) return false;
  }
  return true;
}
function isEUR(amt, numSet) {
  const last = amt.length - 1;
  for (let i = last; i >= 0; i--) {
    if (i === 0 && amt[i] === "0" && amt[i + 1] !== ".") return false;
    if (i === last - 2 && amt[i] === ".") continue; //to not hit next if statment
    if (!numSet.has(amt[i])) return false; //passing the above checks means that '.' will evaluate here if last char
  }
  return true;
}
function isUSD(amt, numSet) {
  console.log(amt)
  const last = amt.length - 1;
  if (amt[0] === "0" && amt[1] !== ".") return false;
  for (let i = last; i >= 0; i--) {
    if (i === last - 2 && amt[i] === ".") continue; //to not hit next if statment
    if (amt[i] === ",") {
      if (!!amt[i + 4] && amt[i + 4] !== "," && amt[i + 4] !== ".")
        return false; //&&&&& NOT || for the ',' and '.'
      continue; //MUST CONTINUE TO SKIP NEXT CHECK bc ',' will not be in nums but valid so don't put the condition all on 1 line
    }
    //&& (amt[i+4] !==',' || amt[i+4] !=='.')) return false //amt[i+4] boundary check
    if (!numSet.has(amt[i])) return false;
  }
  return true;
}

console.log(isCurrency("-$.24"));
//There are multiple passes through the string but ultimately time complexity is O(n)
//Space complexity: O(1)
const misc = ['-', 'ffds', '2342', '0', '.07', '(-32)', ]
const miscAns = [false, false, false, false, false, false]
const testUSDVals = ["-$", "$", "$0", '(-$32)', '($32', '$010', '$12/0.00', "$0.00",'$2','$100', '$1,000', '$1000.0', '$1,000.00','$1000.00','$1,000.000', '$1,00409.', '-$.24' ];
const usdAns = [     false, false,false,false,   false, false, false,      true,    true,true,    true,     true,       true,      false,       true,            false, false];
const testEURVals = ["-€", "€", "€0", '(-€32)', '(€32', '€010', '€12/0.00', "€0.00",'€2','€100', '€1,000', '€1000.0', '€1,000.00','€1000.00','€1,000.000', '€100409.','€.89' ];
const eurAns = [    false, false, false, false, false, false,     false,   true,    true, true,   false,    false,     false,        true,      false,       false,      false]
const testYENVals = ["-¥", "¥", "¥0", '(-¥32)', '(¥32', '¥010', '¥12/0.00', "¥0.00",'¥2','¥100', '¥1,000', '¥1000.0', '¥100409.' ];
const yenAns = [    false, false, true, false, false, false,     false,      false, true, true,   false,       false, false  ]
const allTests = [[misc, miscAns], [testUSDVals, usdAns], [testEURVals, eurAns], [testYENVals, yenAns]]

function runUnitTest(allTests){
  for(let [tests, ans] of allTests){
    tests.forEach((unitTest, i)=>{
      console.assert(isCurrency(unitTest) === ans[i], `Should equal ${ans[i]} for input of ${unitTest}`)
    })
  }
}

// runUnitTest(allTests)

/**$1000.0
Assertion failed: Should equal false for input of $1000.00
Assertion failed: Should equal true for input of $1,000.000 */