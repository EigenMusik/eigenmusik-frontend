'use strict';

/**
 * @ngdoc function
 * @name eigenmusik.controller:LoginController
 * @description
 * # LoginController
 * Login controller of EigenMusik
 */
angular.module('eigenmusik')
  .controller('RegistrationController', function($scope) {
    $scope.loading = false;

    $scope.register = function() {
      $scope.loading = true;
      // Remove any old token.
    };
  });