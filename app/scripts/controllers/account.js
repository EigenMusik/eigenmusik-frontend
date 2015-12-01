'use strict';

/**
 * @ngdoc function
 * @name eigenmusik.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the eigenmusik
 */
angular.module('eigenmusik')
  .controller('AccountCtrl', ['$scope', '$http', 'TokenService', 'TokenStore', function($scope, $http, TokenService, TokenStore) {
    $scope.user = {username:'user0', password:'123450'};

    $scope.processForm = function() {
        TokenService
            .login('user0', '123450')
            .then(function(data) {
                TokenStore.set(data.access_token); //jscs:disable
                console.log('Success!');
            }, function() {
                console.log('Fail.');
            }
        );
    };

}]);
