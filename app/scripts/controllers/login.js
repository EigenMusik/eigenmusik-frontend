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

    $scope.processForm = function() {
        TokenService
            .login($scope.username, $scope.password)
            .then(function(data) {
                TokenStore.set(data.access_token); //jscs:disable
                $rootScope.$emit('login');
                $rootScope.checkUser();
            }, function() {
                // Delete faulty token.
                TokenStore.delete();
            }
        );
    };

});
