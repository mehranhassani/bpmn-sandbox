'use strict';

exports.helloUserGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  * user (String)
  **/
  
  
  var examples = {};
  examples['application/json'] = "Hello " + args.user.value + ", i am Node.js! ";
  
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
  
}

