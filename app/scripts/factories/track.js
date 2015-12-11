'use strict';
/* globals REST_API */

/**
 * @ngdoc function
 * @name eigenmusik.factory:Track
 * @description
 * # Track
 * Track factory
 */
angular.module('eigenmusik')
  .factory('Track', function($resource) {
  return $resource(REST_API + '/rest/tracks', {}, {'query': {method: 'GET', isArray: false }});
});
