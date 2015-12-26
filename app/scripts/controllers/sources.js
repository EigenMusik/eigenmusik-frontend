'use strict';

/* globals SC_CLIENT_ID */

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
      var redirect_uri = $location.protocol() + '://' + $location.host() + ':' + $location.port() + '/callbacks/soundcloud.html';
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