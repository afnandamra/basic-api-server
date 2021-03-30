'use strict';

module.exports = (req, res, next) => {
  console.log('__REQ METHOD__: ', req.method);
  console.log('__REQ PATH__: ', req.path);
  next();
};
