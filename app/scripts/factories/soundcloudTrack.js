'use strict';

/* globals SC */

// jscs:disable
SC.initialize({
  client_id: 'f434bba227f3c05662515accf6d287fc',
});
// jscs:enable

/**
 * @ngdoc function
 * @name eigenmusik.factory:SoundcloudTrack
 * @description
 * # SoundCloudTrack
 * A playable track from soundcloud.
 */
angular.module('eigenmusik')
.factory('SoundcloudTrack', function ($http) {

    function SoundcloudTrack(track, audio) {
        this.track = track;
        this.audio = audio;
    }

    SoundcloudTrack.prototype.play = function() {
        this.audio.play();
    };

    SoundcloudTrack.prototype.stop = function() {
        this.audio.src = '';
        this.audio.load();
    };

    SoundcloudTrack.prototype.pause = function() {
        this.audio.pause();
    };

    SoundcloudTrack.prototype.onFinish = function(callback) {
        this.audio.addEventListener('ended', callback);
    };

    SoundcloudTrack.prototype.getArtist = function() {
        return this.track.artist.name;
    };

    SoundcloudTrack.prototype.getTitle = function() {
        return this.track.name;
    };

    SoundcloudTrack.prototype.isPlaying = function() {
        return !this.audio.paused;
    };

    SoundcloudTrack.prototype.getCurrentTime = function() {
        return this.audio.currentTime;
    };

    SoundcloudTrack.prototype.restart = function() {
        this.audio.currentTime = 0;
    };

    SoundcloudTrack.build = function(track) {
        return SC.stream('/tracks/' + track.uri).then(
            function(player) {
                return $http.get(player.options.streamUrlsEndpoint).then(
                    function(result) {
                        // jscs:disable
                        return new SoundcloudTrack(track, new Audio(result.data.http_mp3_128_url));
                        // jscs:enable
                    }
                );
            }
        );
    };

    return SoundcloudTrack;
});
