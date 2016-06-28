'use strict';

var url = require('url');


var Default = require('./DefaultService');


module.exports.helloUserGET = function helloUserGET (req, res, next) {
  Default.helloUserGET(req.swagger.params, res, next);
};
