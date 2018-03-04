'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  db = require(path.resolve('./config/lib/sequelize')).models,
  Sign = db.sign;

/**
 * Create a sign
 */
exports.create = function(req, res) {

  req.body.userId = req.user.id;

  Sign.create(req.body).then(function(sign) {
    if (!sign) {
      return res.send('users/signup', {
        errors: 'Could not create the sign'
      });
    } else {
      return res.jsonp(sign);
    }
  }).catch(function(err) {
    return res.status(400).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current sign
 */
exports.read = function(req, res) {
  res.json(req.sign);
};

/**
 * Update a sign
 */
exports.update = function(req, res) {
  var sign = req.sign;
  console.log(sign.title);
  console.log(req.body);
  sign.updateAttributes({
    title: req.body.title,
    location: req.body.location,
    description: req.body.description
  }).then(function(sign) {
    res.json(sign);
  }).catch(function(err) {
    return res.status(400).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Delete a sign
 */
exports.delete = function(req, res) {
  var sign = req.sign;

  // Find the sign
  Sign.findById(sign.id).then(function(sign) {
    if (sign) {

      // Delete the sign
      sign.destroy().then(function() {
        return res.json(sign);
      }).catch(function(err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      });

    } else {
      return res.status(400).send({
        message: 'Unable to find the sign'
      });
    }
  }).catch(function(err) {
    return res.status(400).send({
      message: errorHandler.getErrorMessage(err)
    });
  });

};

/**
 * List of Signs
 */
exports.list = function(req, res) {
  Sign.findAll({
    include: [db.user]
  }).then(function(signs) {
    if (!signs) {
      return res.status(404).send({
        message: 'No signs found'
      });
    } else {
      res.json(signs);
    }
  }).catch(function(err) {
    res.jsonp(err);
  });
};

/**
 * Sign middleware
 */
exports.signByID = function(req, res, next, id) {

  if ((id % 1 === 0) === false) { //check if it's integer
    return res.status(404).send({
      message: 'Sign is invalid'
    });
  }

  Sign.find({
    where: {
      id: id
    },
    include: [{
      model: db.user
    }]
  }).then(function(sign) {
    if (!sign) {
      return res.status(404).send({
        message: 'No sign with that identifier has been found'
      });
    } else {
      req.sign = sign;
      next();
    }
  }).catch(function(err) {
    return next(err);
  });

};