//call/console.log the tests to be run

const { isNumber, isString, isBoolean, isArray, isObject, isFunction } = require('./lib/types.js');

console.log(isNumber('3'));
console.log(isString('3'));
console.log(isBoolean('3'));
console.log(isArray('3'));
console.log(isObject('3'));
console.log(isFunction('3'));

