'use strict';

module.exports = (req, res, next) => {
  if (!req.params.id) {
    throw new Error('validator error');
  } else {
    console.log('__REQ PARAMS__: ', req.params.id);
    next();
  }
};
