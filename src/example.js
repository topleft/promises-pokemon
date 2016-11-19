module.exports = {

  simplePromise: (bool) => {
    return new Promise(function (resolve, reject) {
      if (bool) {
        resolve('OK');
      } else {
        reject('BAD');
      }
    }).then(
      function(result) {return result}
    ).catch(
      function(result) {return result}
    );
  },

  add10Promise: (num) => {
    return new Promise(function(resolve, reject) {
      if (!num) {
        num = 0
      }
      return resolve(num + 10);
    }).then(function (result) {
      return result
    }).catch(function (result) {
      return result
    });
  },

  reject: (input) => {
    return new Promise(function(resolve, reject) {
      return reject(input);
    })
  },

  sum50: () => {
    return new Promise(function(resolve, reject) {
      return resolve(50)
    })
  }

}
