'use strict';
/* globals REST_API */


/**
 * @ngdoc function
 * @name eigenmusik.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the eigenmusik
 */
angular.module('eigenmusik')
  .factory('Track', function($resource) {
  return $resource(REST_API + '/rest/tracks', {}, {'query': {method: 'GET', isArray: false }});
});
