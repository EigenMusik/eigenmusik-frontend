'use strict';

/* globals SC_CLIENT_ID, DRIVE_CLIENT_ID, SELF_URL, $ */

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
        // Process authentication code from child window gand authenticate with backend.
        API.addSoundcloudAccount(code).then(
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
        authUrl,
        'Soundcloud Authentication',
        'width=500,height=400'
      );
    };

    $scope.googleDriveAuthentication = function () {
      var childWindow;
      // Redirecting to a standalone template because soundcloud doesn't like push state callbacks.
      var params = {
        redirect_uri : SELF_URL + '/googleDriveCallback.html',
        scope : 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.apps.readonly https://www.googleapis.com/auth/drive.file email profile',
        client_id : DRIVE_CLIENT_ID,
        response_type : 'code',
        approval_prompt : 'force',
      };
      var authUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' + $.param(params);
      $window.parentCallback = function(code) {
        // Process authentication code from child window gand authenticate with backend.
        API.addGoogleDriveAccount(code).then(
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
        authUrl,
        'Google Drive Authentication',
        'width=500,height=400'
      );
    };

    $scope.getSourceAccounts = function() {
      API.getSourceAccounts().then(
            function(resp) {
                console.log(resp);
            },
            function(err) {
                console.log(err);
            }
        );
    };

    $scope.getSourceAccounts();

  });