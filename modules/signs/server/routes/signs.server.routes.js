'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  signsPolicy = require('../policies/signs.server.policy'),
  signs = require(path.resolve('./modules/signs/server/controllers/signs.server.controller'));


module.exports = function(app) {

  // Signs collection routes
  app.route('/api/signs')
    .all(signsPolicy.isAllowed)
    .get(signs.list)
    .post(signs.create);

  // Single sign routes
  app.route('/api/signs/:signId')
    .all(signsPolicy.isAllowed)
    .get(signs.read)
    .put(signs.update)
    .delete(signs.delete);

  // Finish by binding the sign middleware
  app.param('signId', signs.signByID);

};