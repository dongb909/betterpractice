/*
Recreate continuous banking transaction stream, given:
The first 3 lines is batchSize, transactionLimit, windowSize
The lines after that are all transactions
Print out the transaction difference for each account by batches
Flag and print the accounts that meet or exceet the transactionLimit within the provided windowSize
Account should only be flagged once within the WINDOW size
Print flagged accounts, or EMPTY if no accounts were needed to be flagged

Questions to ask interviewer:
  -Assume valid input string? Input string never just "" or not contain any transaction stream?
  -What would like output to be if no transactions in stream?
  -Only Print with console.log?
  -Or am I to return a stringified output and HackerRank prints it the right way?

Implementation thought process:
  - use of QUEUE: javascript doesn't have queue data structure, so would have to create a class so it's O(1) for enqueue and dequeue, but using array because of interviewing time contraint pretending that shift() is O(1) instead of O(n)
*/

const stdin = "3\n4\n5\ndeposit,1,100\nwithdrawal,2,100\ntransfer,1,2,100\ndeposit,1,100\ntransfer,2,3,100\ndeposit,3,100";
//expected output  1,0   2,0  line   EMPTY  1,100  2,-100  3,200  line  EMPTY
//other option for parsing is using regex

function parseInput(input) {
  let parsedInput = input.split("\n").map((el, idx) => {
    //know that the first 3 lines are not transactions
    if (idx < 3) return el;
    //parsing string based on knowledge of it's layout structure instead of doing it by each character
    let transaction = el.split(",");
    const LAST_IDX = transaction.length - 1;
    transaction[LAST_IDX] = parseInt(transaction[LAST_IDX]);
    return {
      type: transaction[0],
      id: transaction[1],
      sendToId: transaction.length === 4 ? transaction[2] : null,
      amt: transaction[LAST_IDX],
    };
  });
  return parsedInput;
}


function bankingTransactionSummary() {
  //Please Note: the function given to me to work with had no parameters, or else the inputs would have been placed here.
  const input = parseInput(stdin);
  let batchSize = input[0];
  let transactionLimit = input[1];
  let windowSize = input[2];
  let accounts = {};
  let flaggedIds = new Set();
  let windowQu = [];
  let transactionCount = 0;
  //Handling transactions
  let transactions = input.slice(3); //O(n) time and space, just writing this for cleaness here. Otherwise would use forloops to iterate start at input[3] 
  if (transactions === []) return "No transactions available"
  transactions.forEach((transaction) => { //O(n)
    let { type, id, amt, sendToId } = transaction;
    transactionCount++;
    if (!accounts[id]) accounts[id] = { balance: 0, count: 0 }; 
    //Handling transaction types
    if (type === "deposit") accounts[id].balance += amt;
    else if (type === "withdrawal") accounts[id].balance -= amt;
    else if (type === "transfer") {
      accounts[id].balance -= amt;
      if (!accounts[sendToId]) accounts[sendToId] = { balance: 0, count: 0 };
      accounts[sendToId].balance += amt;
      if (++accounts[sendToId].count >= transactionLimit && !flaggedIds.has(sendToId)) flaggedIds.add(sendToId);
    }
    if (++accounts[id].count >= transactionLimit && !flaggedIds.has(id)) flaggedIds.add(id);
    //Handling sliding window
    type === "transfer" ? windowQu.push({ id: id, sendToId: sendToId }) : windowQu.push({ id: id, sendToId: null });
    if (windowQu.length > windowSize) flagByWindow(windowQu, accounts, transactionLimit, flaggedIds);
    //Handling batch size: I dont' recall it asking to return string so it prints out itself, literally just printing
    if (transactionCount % batchSize === 0) printBatch(accounts, flaggedIds);
  });
}

function flagByWindow(windowQu, accounts, transactionLimit, flagged) {
  let { id, sendToId } = windowQu.shift();
  if (--accounts[id].count < transactionLimit) flagged.delete(id);
  if (sendToId && --accounts[sendToId].count < transactionLimit) flagged.delete(sendToId);
}

function printBatch(accounts, flagged) {
  let output = ""
  for (let [id, account] of Object.entries(accounts)) {
    output += `${id},${account.balance}\n`;
  }
  output += "\n";
  // console.log("\n");
  if (flagged.size === 0) output += "EMPTY";
  else flagged.forEach((val) =>  output += val + '\n');
  output+="\n";
  console.log(output);
}

bankingTransactionSummary();

/*
time complexity:O(n)
space complexity:O(n) in the case all transactions are by completely different people
  Was thinking O(n + windowSize) but I'm assuming (since I can't ask) that windowSize is a constant
*/
