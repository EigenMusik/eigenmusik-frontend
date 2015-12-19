'use strict';

var $;

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
    $scope.queue = null;
    $scope.currentTrack = null;
    $scope.playing = false;
    $scope.loadingTrack = false;

    var TRACK_RESTART_THRESHOLD = 5;

    $scope.prev = function(force) {
        if ($scope.currentTrack === null) {
            return;
        } else if (($scope.currentTrack.stream.currentTime < TRACK_RESTART_THRESHOLD && !force) || $scope.currentTrackNumber === 0) {
            $scope.currentTrack.stream.currentTime = 0;
        } else {
            $scope.play($scope.currentTrackNumber - 1);
        }
    };

    $scope.next = function() {
        if ($scope.currentTrack === null || $scope.tracks.length === $scope.currentTrackNumber - 1) {
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
            if ($scope.currentTrack.stream.paused){
                $scope.currentTrack.stream.play();
                $scope.playing = true;
            } else {
                $scope.currentTrack.stream.pause();
                $scope.playing = false;
            }
        } else {
            $scope.play(0);
            $scope.playing = true;
        }
    };

    $scope.play = function(trackNumber) {

        if ($scope.loadingTrack) {
            return;
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

        $scope.loadingTrack = true;
        TrackFactory.new(track).then(
            function(playableTrack) {
                $scope.currentTrack = playableTrack;
                $scope.currentTrack.stream.play();
                $scope.playing = true;
                $scope.$apply();
                $scope.loadingTrack = false;
                $scope.currentTrack.stream.addEventListener('ended', function(){
                    $scope.next();
                });
            }
        );
    };

    $scope.stop = function() {
        if ($scope.currentTrack !== null) {
            $scope.currentTrack.stream.src = '';
            $scope.currentTrack.stream.load();
            $scope.currentTrack = null;
            $scope.playing = false;
            $scope.loadingTrack = false;
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

    // TODO move into a directive
    $scope.resizeTable = function() {
        // In case of premature resizing.
        if (typeof $('#tracks-wrapper').offset() === 'undefined') {
            return;
        }
        // Let wrapper fill screen.
        var wrapperHeight = ($(window).height() - $('#tracks-wrapper').offset().top) + 'px';
        $('#tracks-wrapper').css('height', wrapperHeight);
        // Let table fill wrapper.
        var newHeight = ($('#tracks-wrapper').height() - 50) + 'px';
        $('#tracks-table tbody').css('height', newHeight);
    };

    $(window).resize(function(){
        $scope.resizeTable();
    });

});
