'use strict';

/**
 * @ngdoc function
 * @name eigenmusik.controller:LoginController
 * @description
 * # LoginController
 * Login controller of EigenMusik
 */
angular.module('eigenmusik')
  .controller('LoginController', function(API, $rootScope, $scope, $http, TokenService, TokenStore) {

    // TODO, remove this comment
    $scope.username = 'user0';
    $scope.password = '123450';
    $scope.alert = null;
    $scope.loggingIn = false;

    $scope.login = function() {
        $scope.loggingIn = true;
        TokenService
            .login($scope.username, $scope.password)
            .then(function(data) {
                $scope.alert = null;
                TokenStore.set(data.access_token); //jscs:disable
                $rootScope.$emit('login');
                $rootScope.checkUser();
                $scope.loggingIn = false;
            }, function() {
                // Delete faulty token.
                TokenStore.delete();
                $scope.alert = 'Incorrect username or password.';
                $scope.loggingIn = false;
            }
        );
    };

    // TODO directivise me!
    $scope.loginButton = function() {
        if ($scope.loggingIn) {
            return '<span class="glyphicon spin glyphicon-refresh" aria-hidden="true"></span>';
        } else {
            return 'Login';
        }
    };
});
