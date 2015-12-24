'use strict';

/**
 * @ngdoc function
 * @name eigenmusik.service:TokenStore
 * @description
 * # TokenStore
 * TokenStore for eigenmusik.
 */
angular.module('eigenmusik')
  .service('TokenStore', function($window) {
    return {
      isSet: function() {
        return $window.sessionStorage.token !== undefined;
      },
      get: function() {
        return $window.sessionStorage.token;
      },
      set: function(data) {
        $window.sessionStorage.token = data;
      },
      delete: function() {
        delete $window.sessionStorage.token;
      }
    };
  })
  .provider('TokenService', function($httpProvider) {

    var tokenUrl = '/oauth/token';
    var clientId = null,
      clientSecret = null;

    this.setTokenUrl = function(url) {
      tokenUrl = url || '/oauth/token';
    };

    this.setClientDetails = function(id, secret) {
      clientId = id;
      clientSecret = secret;
    };

    $httpProvider.interceptors.push(function($q, TokenStore) {
      return {
        'request': function(config) {
          if (TokenStore.get()) {
            config.headers.Authorization = 'Bearer ' + TokenStore.get();
          } else if (!!clientId && !!clientSecret) {
            config.headers.Authorization = 'Basic ' + window.btoa(clientId + ':' + clientSecret);
          }
          return config;
        },
        'responseError': function(response) {
          // TODO Redirect
          return $q.reject(response);
        },
      };
    });

    this.$get = function($q, $http) {
      return {
        login: function(username, password) {
          var deferred = $q.defer();
          $http({
            method: 'POST',
            url: tokenUrl,
            data: 'grant_type=password&username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
          }).success(function(data) {
            deferred.resolve(data);
          }).error(function(data, status) {
            deferred.reject(status);
          });
          return deferred.promise;
        }
      };
    };
  });