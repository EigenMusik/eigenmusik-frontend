'use strict';

/**
 * @ngdoc function
 * @name eigenmusik.directive:playBar
 * @description
 * # playBar
 * Directive for the playbar appearing at the top of the player.
 */
angular.module('eigenmusik')
.directive('playBar', function() {
  return {
    templateUrl: 'partials/playbar.html'
  };
});
