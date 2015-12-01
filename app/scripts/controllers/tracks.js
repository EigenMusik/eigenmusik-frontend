'use strict';

/**
 * @ngdoc function
 * @name eigenmusik.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the eigenmusik
 */
angular.module('eigenmusik')
  .controller('TracksCtrl', ['Track', '$scope', function (Track, $scope) {
    Track.query({ id: 1} , function(data) {
      $scope.tracks = data;
    });
  }]);
