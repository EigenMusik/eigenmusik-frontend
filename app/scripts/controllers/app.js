'use strict';

/**
 * @ngdoc function
 * @name eigenmusik.controller:AppController
 * @description
 * # AppCotrollerController
 * Base controller of EigenMusik
 */
angular.module('eigenmusik')
.controller('AppController', function(TokenStore, API, $scope, $rootScope) {

    $rootScope.checkUser = function() {
        if (TokenStore.get()) {
            API.getMe().then(function() {
                $rootScope.$emit('login');
            }, function() {
                $rootScope.$emit('logout');
            });
        } else {
            $scope.showLogin = true;
        }
    };

    $rootScope.$on('login', function() {
        $scope.showPlayer = true;
        $scope.showLogin = false;
    });

    $rootScope.$on('logout', function() {
        $scope.showPlayer = false;
        $scope.showLogin = true;
        TokenStore.delete();
    });

    $rootScope.checkUser();
  });