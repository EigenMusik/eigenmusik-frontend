'use strict';

/* globals SC_CLIENT_ID, SELF_URL */

/**
 * @ngdoc function
 * @name eigenmusik.controller:SourcesController
 * @description
 * # SourcesController
 * Sources controller for EigenMusik
 */
angular.module('eigenmusik')
  .controller('SourcesController', function($rootScope, $scope, TokenService, TokenStore, $state, API, $location, $window) {

    $scope.soundcloudAuthentication = function() {

      var childWindow;
      // Redirecting to a standalone template because soundcloud doesn't like push state callbacks.
      var redirect_uri = SELF_URL + '/soundcloudCallback.html';
      var authUrl = 'https://soundcloud.com/connect?client_id=' + SC_CLIENT_ID + '&response_type=code&redirect_uri=' + redirect_uri;
      $window.parentCallback = function(code) {
        // Process authentication code from child window and authenticate with backend.
        API.addSoundcloudAccount(code);
        $state.go('player');
        childWindow.close();
      };
      childWindow = $window.open(
        authUrl,
        'Soundcloud Authentication',
        'width=500,height=400'
      );
    };
  });