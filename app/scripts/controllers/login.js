'use strict';

/**
 * @ngdoc function
 * @name eigenmusik.controller:LoginController
 * @description
 * # LoginController
 * Login controller of EigenMusik
 */
angular.module('eigenmusik')
  .controller('LoginController', function($rootScope, $scope, TokenService, TokenStore, $state, API, $translatePartialLoader) {

    $scope.alert = null;
    $scope.loading = false;
    $scope.forgottenText = 'FORGOTTEN_CREDENTIALS';
    $scope.messages = null;
    $translatePartialLoader.addPart('login');

    $scope.login = function() {
      $scope.loading = true;
      // Remove any old token.
      TokenStore.delete();
      TokenService
        .login($scope.username, $scope.password)
        .then(function(data) {
          $scope.alert = null;
          $scope.loading = false;
          TokenStore.set(data.access_token);
          $state.go('player.tracks');
        }, function(response) {
          switch (response) {
            case -1:
              $scope.alert = 'SERVER_CONNECTION_ERROR';
              break;
            case 400:
              $scope.alert = 'INCORRECT_USERNAME_OR_PASSWORD';
              break;
            default:
              $scope.alert = 'UNKNOWN_ERROR';
          }
          // Delete faulty token.
          TokenStore.delete();
          $scope.loading = false;
        });


    };
  });