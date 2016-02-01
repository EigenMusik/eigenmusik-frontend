'use strict';

/**
 * @ngdoc function
 * @name eigenmusik.controller:SourcesController
 * @description
 * # SourcesController
 * Sources controller for EigenMusik
 */
angular.module('eigenmusik')
  .controller('SourcesController', function($rootScope, $scope, TokenService, TokenStore, $state, API, $location, $window) {

    $scope.sourceTypes = null;

    $scope.authenticate = function (source) {
      var childWindow;
      // Redirecting to a standalone template because soundcloud doesn't like push state callbacks.
      $window.parentCallback = function(uri) {
        // Process authentication code from child window gand authenticate with backend.
        API.addSourceAccount(source.type, uri).then(
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