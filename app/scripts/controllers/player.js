'use strict';

/**
 * @ngdoc function
 * @name eigenmusik.controller:PlayerController
 * @description
 * # PlayerController
 * Player Controller of the eigenmusik
 */
angular.module('eigenmusik')
  .controller('PlayerController', function($scope, $rootScope, API, TrackFactory) {

    var TRACK_RESTART_THRESHOLD = 5;

    $scope.clear = function() {
      if ($scope.currentTrack !== null && $scope.currentTrack !== undefined) {
        $scope.currentTrack.stop();
      }
      $scope.user = null;
      $scope.tracks = null;
      $scope.currentTrack = null;
      $scope.loading = false;
      $scope.currentTrackNumber = null;
    };

    $scope.prev = function() {
      if ($scope.currentTrack !== null && $scope.currentTrack.getCurrentTime() > TRACK_RESTART_THRESHOLD) {
        $scope.currentTrack.restart();
      } else if ($scope.currentTrack !== null && $scope.currentTrackNumber === 0) {
        $scope.currentTrack.restart();
      } else if ($scope.currentTrackNumber !== 0 && $scope.currentTrackNumber !== null) {
        $scope.play($scope.currentTrackNumber - 1);
      }
    };

    $scope.next = function() {
      if ($scope.currentTrackNumber !== null && $scope.tracks.length !== $scope.currentTrackNumber + 1) {
        $scope.play($scope.currentTrackNumber + 1);
      }
    };

    $scope.trackClass = function(index) {
      if (index === $scope.currentTrackNumber) {
        return 'active';
      }
    };

    $scope.playPause = function() {
      if ($scope.loading) {
        return;
      } else if ($scope.currentTrack) {
        if (!$scope.currentTrack.isPlaying()) {
          $scope.currentTrack.play();
        } else {
          $scope.currentTrack.pause();
        }
      } else {
        $scope.play(0);
      }
    };

    $scope.play = function(trackNumber) {

      var track = $scope.tracks[trackNumber];

      // If it's the current track, restart it.
      // If it's not, stop the stream so we can play the new one.
      if ($scope.currentTrack !== null) {
        $scope.stop();
      }

      $scope.currentTrackNumber = trackNumber;

      $scope.loading = true;
      TrackFactory.build(track).then(function(currentTrack) {
        if ($scope.currentTrackNumber !== trackNumber) {
          return;
        }
        currentTrack.onFinish(function() {
          $scope.next();
        });
        currentTrack.play();
        $scope.currentTrack = currentTrack;
        $scope.loading = false;
        $scope.$apply();
      });
    };

    $scope.stop = function() {
      if ($scope.currentTrack !== null) {
        $scope.currentTrack.stop();
        $scope.currentTrack = null;
        $scope.currentTrackNumber = null;
      }
    };

    $scope.logout = function() {
      $scope.clear();
      $rootScope.$emit('logout');
    };

    $scope.playIcon = function() {
      if ($scope.currentTrack && $scope.currentTrack.isPlaying()) {
        return 'glyphicon-pause';
      } else {
        return 'glyphicon-play';
      }
    };

    $scope.clear();

    API.getMe().then(function(user) {
      $scope.user = user;
    }, function() {
      $rootScope.$emit('logout');
    });
    API.getTracks().then(function(r) {
      $scope.tracks = r.content;
    });
  });
