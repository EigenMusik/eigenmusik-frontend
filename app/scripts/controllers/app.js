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
                $scope.$emit('login');
            }, function(err) {
                $scope.$emit('logout');
                console.log(err);
            });
        } else {
            $scope.showlogin = true;
        }
    };

    $rootScope.$on('login', function() {
        $scope.showplayer = true;
        $scope.showlogin = false;
    });

    $rootScope.$on('logout', function() {
        $scope.showplayer = false;
        $scope.showlogin = true;
        TokenStore.delete();
    });

    $rootScope.checkUser();
  });