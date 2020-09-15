function fizzBuzz(max) {
  //don't need to create an array at all!
  let i = 0,
    result = "";
  while (i < max + 1) {
    result += i % 3 === 0 ? "Fizz" : "";
    result += i % 5 === 0 ? "Buzz" : "";

    console.log(result ? result : i);
    result = "";
    i++;
  }
  return "done!";
}

// console.log(fizzBuzz(100))

for (let i = 0; i <= 100; i++) {
  let output = "";
  if (i % 3 === 0) output += "Fizz";
  if (i % 5 === 0) output += "Buzz";
  // if(output === "") output = i; also works
  if (!output) output = i;
  console.log(output);
}
console.log("done2");
