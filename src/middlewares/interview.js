const array = [[1],[4],[5,6]]

function flatArray(array){
  //base condition
  if(array.length === 0){
    return finalArray
  } 
  //if the item is not nested array then add it
  /**
   * [[1],[4],[5,6]]
   *  */ 
  if(!Array.isArray(array[0])){
    return array[0]
  }
  //[[1],[4],[5,6]]
  return [...flatArray(array.slice(0,1)),...flatArray(array.slice(1,array.length))]

}


console.log(flatArray(array))