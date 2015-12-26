'use strict';

/* globals SC, SC_CLIENT_ID */

/**
 * @ngdoc function
 * @name eigenmusik.factory:SoundcloudTrack
 * @description
 * # SoundCloudTrack
 * A playable track from soundcloud.
 */
angular.module('eigenmusik')
  .factory('SoundcloudTrack', function($http) {

    // jscs:disable
    SC.initialize({
      client_id: SC_CLIENT_ID,
    });
    // jscs:enable

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
              return new SoundcloudTrack(track, new Audio(result.data.http_mp3_128_url));
            }
          );
        }
      );
    };

    return SoundcloudTrack;
  });