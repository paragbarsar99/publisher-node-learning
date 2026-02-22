const array = [[1], [4], [5, 6]];

function flatArray(array) {
 
  if (array.length === 0) {
    return []
  }

  if (!Array.isArray(array[0])) {
    console.log(array)
    return [array[0]]
  }

  return [
    ...flatArray(...array.slice(0, 1)),
    ...flatArray(array.slice(1, array.length)),
  ];
}

console.log(flatArray(array));
