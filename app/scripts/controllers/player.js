'use strict';

/**
 * @ngdoc function
 * @name eigenmusik.controller:PlayerController
 * @description
 * # PlayerController
 * Player Controller of the eigenmusik
 */
angular.module('eigenmusik')
  .controller('PlayerController', function($scope, $rootScope, API) {

    $scope.user = null;

    $scope.logout = function() {
        $rootScope.$emit('logout');
    };

    $rootScope.$on('login', function() {
        API.getMe().then(function(user) {
            $scope.user = user;
        });
    });
});
