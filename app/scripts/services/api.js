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
  .provider('API', function() {

    var apiUrl = 'http://localhost:7070';
    this.setApiUrl = function(url) {
      apiUrl = url;
    };

    this.$get = function($q, $http) {
      return {
        register: function(userData) {
          var ret = $q.defer();
          $http({
              url: REST_API + '/users/register',
              method: 'POST',
              data: userData
            })
            .success(function(r) {
              ret.resolve(r);
            }).error(function(err) {
              ret.reject(err);
            });
          return ret.promise;
        },
        getMe: function() {
          var ret = $q.defer();
          $http.get(REST_API + '/users/me')
            .success(function(r) {
              ret.resolve(r);
            }).error(function(err) {
              ret.reject(err);
            });
          return ret.promise;
        },
        checkToken: function(token) {
          var ret = $q.defer();
          $http.post(REST_API + '/oauth/check_token?token=' + token)
            .success(function(r) {
              ret.resolve(r);
            }).error(function(err) {
              ret.reject(err);
            });
          return ret.promise;
        },
        getTracks: function() {
          var ret = $q.defer();
          $http.get(apiUrl + '/tracks')
            .success(function(r) {
              ret.resolve(r);
            }).error(function(err) {
              ret.reject(err);
            });
          return ret.promise;
        },
        getStream: function(track) {
          var ret = $q.defer();
          $http.get(apiUrl + '/tracks/stream/' + track.id)
            .success(function(r) {
              ret.resolve(r);
            }).error(function(err) {
              ret.reject(err);
            });
          return ret.promise;
        },
        getSourceAccounts: function() {
          var ret = $q.defer();
          $http.get(apiUrl + '/sources/accounts/')
            .success(function(r) {
              ret.resolve(r);
            }).error(function(err) {
              ret.reject(err);
            });
          return ret.promise;
        },
        getSourceTypes: function() {
          var ret = $q.defer();
          $http.get(apiUrl + '/sources/')
            .success(function(r) {
              ret.resolve(r);
            }).error(function(err) {
              ret.reject(err);
            });
          return ret.promise;  
        },
        addSourceAccount: function(sourceType, auth) {
          var ret = $q.defer();
          $http.post(apiUrl + '/sources/add/' + sourceType, auth)
            .success(function(r) {
              ret.resolve(r);
            }).error(function(err) {
              ret.reject(err);
            });
          return ret.promise;
        },
      };
    };
  });