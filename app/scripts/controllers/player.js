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

    $scope.user = null;
    $scope.tracks = null;
    $scope.currentTrack = null;
    $scope.loadingTrack = false;
    $scope.currentTrackNumber = null;

    var TRACK_RESTART_THRESHOLD = 5;

    $scope.prev = function(force) {
        if ($scope.currentTrack === null) {
            return;
        } else if (($scope.currentTrack.getCurrentTime() < TRACK_RESTART_THRESHOLD && !force) || $scope.currentTrackNumber === 0) {
            $scope.currentTrack.restart();
        } else {
            $scope.play($scope.currentTrackNumber - 1);
        }
    };

    $scope.next = function() {
        if ($scope.currentTrack === null || $scope.tracks.length === $scope.currentTrackNumber + 1) {
            return;
        }
        $scope.play($scope.currentTrackNumber + 1);
    };

    $scope.trackClass = function(index) {
        if (index === $scope.currentTrackNumber) {
            return 'active';
        }
    };

    $scope.playPause = function() {
        if ($scope.currentTrack) {
            if (!$scope.currentTrack.isPlaying()){
                $scope.currentTrack.play();
            } else {
                $scope.currentTrack.pause();
            }
        } else {
            $scope.play(0);
        }
    };

    $scope.play = function(trackNumber) {
        if ($scope.loadingTrack) {
            return;
        } else {
            $scope.loadingTrack = true;
        }

        var track = $scope.tracks[trackNumber];

        // If it's the current track, restart it.
        // If it's not, stop the stream so we can play the new one.
        if (trackNumber === $scope.currentTrackNumber) {
            return;
        } else if ($scope.currentTrack !== null) {
            $scope.stop();
        }

        $scope.currentTrackNumber = trackNumber;

        TrackFactory.build(track).then(function(currentTrack) {
            currentTrack.onFinish(function() {
                $scope.next();
            });
            currentTrack.play();
            $scope.currentTrack = currentTrack;
            $scope.$apply();
            $scope.loadingTrack = false;
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
        $rootScope.$emit('logout');
    };

    $rootScope.$on('login', function() {
        API.getMe().then(function(user) {
            $scope.user = user;
        });
        API.getTracks().then(function(r) {
            $scope.tracks = r.content;
        });
    });

    $rootScope.$on('logout', function() {
        $scope.stop();
    });
});
