'use strict';

// Setting up route
angular.module('signs').config(['$stateProvider',
  function($stateProvider) {
    // Signs state routing

    $stateProvider
      .state('signs', {
        abstract: true,
        url: '/signs',
        template: '<ui-view/>'
      })
      .state('signs.list', {
        url: '',
        templateUrl: 'modules/signs/client/views/list-signs.client.view.html'
      })
      .state('signs.create', {
        url: '/create',
        templateUrl: 'modules/signs/client/views/create-sign.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('signs.view', {
        url: '/:signId',
        templateUrl: 'modules/signs/client/views/view-sign.client.view.html'
      })
      .state('signs.edit', {
        url: '/:signId/edit',
        templateUrl: 'modules/signs/client/views/edit-sign.client.view.html',
        data: {
          roles: ['user', 'admin']
        }
      });
  }
]);