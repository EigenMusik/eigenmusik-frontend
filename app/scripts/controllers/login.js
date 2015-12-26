'use strict';

/**
 * @ngdoc function
 * @name eigenmusik.controller:LoginController
 * @description
 * # LoginController
 * Login controller of EigenMusik
 */
angular.module('eigenmusik')
  .controller('LoginController', function($rootScope, $scope, TokenService, TokenStore, $state) {

    $scope.alert = null;
    $scope.loading = false;
    $scope.forgottenText = 'Forgotten username/password?';

    $scope.login = function() {
      $scope.loading = true;
      // Remove any old token.
      TokenStore.delete();
      TokenService
        .login($scope.username, $scope.password)
        .then(function(data) {
          $scope.alert = null;
          $scope.loading = false;
          TokenStore.set(data.access_token); //jscs:disable
          $state.go('player');
        }, function(response) {
          switch (response) {
            case -1:
              $scope.alert = 'Couldn\'t connect to server.';
              break;
            case 400:
              $scope.alert = 'Incorrect username or password.';
              break;
            default:
              $scope.alert = "Unknown error occurred :(";
          }
          // Delete faulty token.
          TokenStore.delete();
          $scope.loading = false;
        });
    };
  });