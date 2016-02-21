'use strict';

/**
 * @ngdoc function
 * @name eigenmusik.controller:LoginController
 * @description
 * # LoginController
 * Login controller of EigenMusik
 */
angular.module('eigenmusik')
  .controller('RegistrationController', function($scope, API, $state, $translatePartialLoader) {
    $translatePartialLoader.addPart('register');
    $scope.loading = false;
    $scope.errors = null;

    $scope.register = function() {
      $scope.loading = true;
      API.register({
        name: $scope.username,
        password: $scope.password,
        email: $scope.email
      }).then(function() {
        $scope.loading = false;
        $state.go('login');
      }, function(resp) {
        $scope.loading = false;
        $scope.errors = resp.errors;
      });
      // Remove any old token.
    };
  });