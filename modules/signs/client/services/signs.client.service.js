'use strict';

//Signs service used for communicating with the signs REST endpoints
angular.module('signs').factory('Signs', ['$resource',
  function($resource) {
    return $resource('api/signs/:signId', {
      signId: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);