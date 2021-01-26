function add(num1: number, num2:number): number{  
  return num1 + num2 
}

let add2 =function(num1: number, num2:number): number{  
  return num1 + num2 
}

let add3: (num1: number, num2:number) => number = function (x,y){  
  return x + y 
}

interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any;
}

let sc: SquareConfig = { color: "blue", width: 100, "something": [4,4]  }

console.log(add(7, 2))

interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // ok, length is a number
  name: string; // ok, name is a string
}
let a: NumberOrStringDictionary = {length: 5, name: 'hey', '1': 'a', 2:'b'}
console.log(a[
  '1'

])