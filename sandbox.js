var myNum = 10;
evenPromise = function(num){
  return new Promise(function (resolve, reject) {
    if ( num % 2 === 0 ) {
      resolve('even');
    } else {
      reject('odd');
    }
  });
}

console.log(evenPromise(3).then( (result) => {console.log(result)}, (reject) => console.log(reject)));
