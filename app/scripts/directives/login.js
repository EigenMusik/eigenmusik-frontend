'use strict';

/**
 * @ngdoc function
 * @name eigenmusik.directive:login
 * @description
 * # login
 * Directive for the login form.
 */
angular.module('eigenmusik')
  .directive('login', function() {
    return {
      templateUrl: 'partials/login.html',
      controller: 'LoginController'
    };
  });