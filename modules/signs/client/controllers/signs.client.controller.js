'use strict';

// Signs controller
angular.module('signs').controller('SignsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Signs',
  function($scope, $stateParams, $location, Authentication, Signs) {
    $scope.authentication = Authentication;

    // Create new Sign
    $scope.create = function(isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'signForm');

        return false;
      }

      // Create new Sign object
      var sign = new Signs({
        title: this.title,
        location: this.location,
        description: this.description
      });

      // Redirect after save
      sign.$save(function(response) {
        console.log('redirect after save');
        $location.path('signs/' + response.id);

        // Clear form fields
        $scope.title = '';
        $scope.location = '';
        $scope.description = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Sign
    $scope.remove = function(sign) {
      if (sign) {
        console.log(sign);
        sign.$remove();
        console.log(this);
        $location.path('signs');
        
      } else {
        $scope.sign.$remove(function() {
          $location.path('signs');
        });
      }
    };

    // Update existing Sign
    $scope.update = function(isValid) {
      console.log('update called');
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'signForm');
        return false;
      }

      var sign = $scope.sign;
      console.log(sign.title);
      sign.$update(function() {
        $location.path('signs/' + sign.id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Signs
    $scope.find = function() {
      console.log('find list');
      $scope.signs = Signs.query();
    };

    // Find existing Sign
    $scope.findOne = function() {
      console.log('find one');
      console.dir($scope, { depth: null });
      console.log('$stateParams: ' + JSON.stringify($stateParams, null, 4));
      $scope.sign = Signs.get({
        signId: $stateParams.signId
      });
    };
  }
]);