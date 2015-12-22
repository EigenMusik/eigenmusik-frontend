'use strict';

/**
 * @ngdoc function
 * @name eigenmusik.directive:tracksTable
 * @description
 * # tracksTable
 * Directive representing the table of tracks
 */
angular.module('eigenmusik')
.directive('tracksTable', function() {
  return {
    templateUrl: 'partials/usertracks.html',
  };
});