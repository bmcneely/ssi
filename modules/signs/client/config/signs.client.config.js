'use strict';

// Configuring the Signs module
angular.module('signs').run(['Menus',
  function(Menus) {
    // Add the signs dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Signs',
      state: 'signs',
      type: 'dropdown',
      roles: ['*'],
      position: 1
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'signs', {
      title: 'List Signs',
      state: 'signs.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'signs', {
      title: 'Create Sign',
      state: 'signs.create',
      roles: ['user']
    });
  }
]);