

'use strict';

let timeStamp = (req, res, next) => {

  let time = new Date();
  req.requestTime = time;
  next();

};
let logRequest = (req, res, next) => {
  console.log('request info:', req.method, req.path, req.requestTime);
  next();
};

module.exports = { timeStamp, logRequest };