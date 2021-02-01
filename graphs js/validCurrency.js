/*
 *only ¥, €, and $ are valid currencies
 *yens don't have commas nor decimals
 *euros don't have commas but can have deci
 *usd has both commas and deci
 *negatives are either '-' or wrapped in parens ()
 *if there's a deci, must have 2 cent positions and must have a 0 before it if no whole numbers preceeding the deci
 *cannot start with 0 unless right before deci
 *all else return false
 *can have alphabet, other chars, displaced valid chars etc as input which should return false
 */

//*** EVALUATION ***
//There are multiple passes through the string but ultimately time complexity is O(n)
//Space complexity: O(1)

function validCurrency(strCurr) {
  if(!strCurr) return false;
  const numSet = new Set("0123456789".split(""));
  const [symb, symbIdx] = currencySymb(strCurr);
  if (!symb) return false;
  const len = strCurr.length;
  const end = strCurr.charCodeAt(len - 1) === 41 ? len - 1 : len;
  const amt = strCurr.slice(symbIdx + 1, end);

  if (!amt || !numSet.has(amt[0])) return false;
  if (symb === "¥") return isYEN(amt, numSet, amt.length);
  if (symb === "€") return isEUR(amt, numSet, amt.length);
  if (symb === "$") return isUSD(amt, numSet, amt.length);
  return false;
}

function isNeg(strCurr) {
  return (
    strCurr[0] === "-" ||
    (strCurr.charCodeAt(0) === 40 &&
      strCurr.charCodeAt(strCurr.length - 1) === 41)
  );
}

function currencySymb(strCurr) {
  const symbs = new Set(["¥", "€", "$"]);
  if (symbs.has(strCurr[0])) return [strCurr[0], 0];
  if (symbs.has(strCurr[1]) && isNeg(strCurr)) return [strCurr[1], 1];
  return [null, -1];
}
function isYEN(amt, numSet, n) {
  if (n > 1 && amt[0] === "0") return false;
  for (let char of amt) {
    if (!numSet.has(char)) return false;
  }
  return true;
}
function isEUR(amt, numSet, n) {
  for (let i = n - 1; i >= 0; i--) {
    let char = amt[i];
    if (i === 0 && char === "0" && amt[i + 1] !== ".") return false;
    if (i === n - 3 && char === ".") continue;
    if (!numSet.has(char)) return false;
  }
  return true;
}
function isUSD(amt, numSet) {
  const [int, deci] = amt.split(".");
  let char,
    len = int.length;
  if (deci && (deci.length < 2 || deci.length > 2)) return false;
  if (int[0] === "0" && !deci) return false;
  for (let i = int.length - 1; i >= 0; i--) {
    char = int[i];
    //if there are commas
    if (char === ",") {
      if (!!int[i + 4] && int[i + 4] !== ",") return false;
      continue;
    }
    //if no commas present but there should be
    else if (len > 3 && (len - i) % 4 === 0 && int[i] !== ",") return false;
    if (!numSet.has(char)) return false;
  }
  return true;
}

// console.log(validCurrency(''))

const misc = ["", "-", "ffds", "2342", "0", ".07", "(-32)"];
const miscAns = [false, false, false, false, false, false, false];
const testUSDVals = [
  "-$",
  "$",
  "$0",
  "(-$32)",
  "($32",
  "$010",
  "$12/0.00",
  "$0.00",
  "$2",
  "$100",
  "$1,000",
  "$1000.0",
  "$1,000.00",
  "$1000.00",
  "$1,000.000",
  "$1,00409.",
  "-$.24",
  "$0.",
];
const usdAns = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  true,
  true,
  true,
  true,
  false,
  true,
  false,
  false,
  false,
  false,
  false,
];
const testEURVals = [
  "-€",
  "€",
  "€0",
  "(-€32)",
  "(€32",
  "€010",
  "€12/0.00",
  "€0.00",
  "€2",
  "€100",
  "€1,000",
  "€1000.0",
  "€1,000.00",
  "€1000.00",
  "€1,000.000",
  "€100409.",
  "€.89",
];
const eurAns = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  true,
  true,
  true,
  false,
  false,
  false,
  true,
  false,
  false,
  false,
];
const testYENVals = [
  "-¥",
  "¥",
  "¥0",
  "(-¥32)",
  "(¥32",
  "¥010",
  "¥12/0.00",
  "¥0.00",
  "¥2",
  "¥100",
  "¥1,000",
  "¥1000.0",
  "¥100409.",
];
const yenAns = [
  false,
  false,
  true,
  false,
  false,
  false,
  false,
  false,
  true,
  true,
  false,
  false,
  false,
];
const allTests = [
  [misc, miscAns],
  [testUSDVals, usdAns],
  [testEURVals, eurAns],
  [testYENVals, yenAns],
];

function runUnitTest(allTests) {
  for (let [tests, ans] of allTests) {
    tests.forEach((unitTest, i) => {
      console.assert(
        validCurrency(unitTest) === ans[i],
        `Should equal ${ans[i]} for input of ${unitTest}`
      );
    });
  }
}

runUnitTest(allTests);
