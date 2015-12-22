'use strict';
/* globals REST_API */

/**
 * @ngdoc function
 * @name eigenmusik.factory:API
 * @description
 * # API
 * API for eigenmusik.
 */
angular.module('eigenmusik')
.provider('API', function () {

    var apiUrl = 'http://localhost:7070';
    this.setApiUrl = function(url) {
        apiUrl = url;
    };

    this.$get = function($q, $http) {
        return {
            getMe: function() {
                var ret = $q.defer();
                $http.get(REST_API + '/rest/auth/me')
                    .success(function(r) {
                        ret.resolve(r);
                }).error(function(err) {
                        ret.reject(err);
                });
                return ret.promise;
            },
            getTracks: function() {
                var ret = $q.defer();
                $http.get(apiUrl + '/rest/tracks')
                    .success(function(r) {
                        ret.resolve(r);
                }).error(function(err) {
                    ret.reject(err);
                });
                return ret.promise;
            }
        };
    };
});
