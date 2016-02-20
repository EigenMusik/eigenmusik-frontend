'use strict';

/**
 * @ngdoc function
 * @name eigenmusik.controller:SourcesController
 * @description
 * # SourcesController
 * Sources controller for EigenMusik
 */
angular.module('eigenmusik')
  .controller('SourcesController', function($rootScope, $scope, TokenService, TokenStore, $state, API, $location, $window, $translatePartialLoader) {
    $translatePartialLoader.addPart('sources');

    $scope.sourceTypes = null;

    var getParameterByName = function(name, uri) {
      if (!uri) {
        uri = window.location.href;
      }
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(uri);
      if (!results) {
        return null;
      }
      if (!results[2]) {
        return '';
      }
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    };

    $scope.authenticate = function (source) {
      var childWindow;
      // Redirecting to a standalone template because soundcloud doesn't like push state callbacks.
      $window.parentCallback = function(uri) {

        var auth = {
          code : getParameterByName('code', uri),
          state : getParameterByName('state', uri),
        };

        // Process authentication code from child window gand authenticate with backend.
        API.addSourceAccount(source.type, auth).then(
            function() {
                $state.go('player.tracks', null, {
                    reload: true
                });
                childWindow.close();
            },
            function() {
                childWindow.close();
            }
        );
      };
      childWindow = $window.open(
        source.authUrl,
        source.name + ' Authentication',
        'width=500,height=400'
      );
    };

    $scope.getSourceTypes = function() {
      API.getSourceTypes().then(
        function(resp) {
          $scope.sourceTypes = resp;
        }
      );
    };

    $scope.getSourceTypes();

  });