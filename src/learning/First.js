// write a function that takes an array of numbers and returns the sum of the numbers

function sum(arr) {
  return arr.reduce((acc, curr) => acc + curr, 0);
}

console.log(sum([1, 2, 3, 4, 5]));
