'use strict';

/**
 * @ngdoc function
 * @name eigenmusik.controller:LoginController
 * @description
 * # LoginController
 * Login controller of EigenMusik
 */
angular.module('eigenmusik')
  .controller('RegistrationController', function($scope, API, $state) {
    $scope.loading = false;
    $scope.alert = null;

    $scope.register = function() {
      $scope.loading = true;
      API.register({
        name: $scope.username,
        password: $scope.password,
        email: $scope.email
      }).then(function(user) {
        $scope.user = user;
        $scope.loading = false;
        $state.go('login');

      }, function(err) {
        $scope.loading = false;
        $scope.alert = err;
      });
      // Remove any old token.
    };
  });