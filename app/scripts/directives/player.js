'use strict';

/**
 * @ngdoc function
 * @name eigenmusik.directive:player
 * @description
 * # player
 * Directive for the web player.
 */
angular.module('eigenmusik')
  .directive('player', function() {
    return {
      templateUrl: 'partials/player.html',
      controller: 'PlayerController'
    };
  });