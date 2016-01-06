'use strict';

/**
 * @ngdoc function
 * @name eigenmusik.factory:PlayableTrack
 * @description
 * # SoundCloudTrack
 * A playable track from soundcloud.
 */
angular.module('eigenmusik')
  .factory('PlayableTrack', function($http, API) {

    function PlayableTrack(track, audio) {
      this.track = track;
      this.audio = audio;
    }

    PlayableTrack.prototype.play = function() {
      this.audio.play();
    };

    PlayableTrack.prototype.stop = function() {
      this.audio.src = '';
      this.audio.load();
    };

    PlayableTrack.prototype.pause = function() {
      this.audio.pause();
    };

    PlayableTrack.prototype.onFinish = function(callback) {
      this.audio.addEventListener('ended', callback);
    };

    PlayableTrack.prototype.getArtist = function() {
      return this.track.artist;
    };

    PlayableTrack.prototype.getTitle = function() {
      return this.track.name;
    };

    PlayableTrack.prototype.isPlaying = function() {
      return !this.audio.paused;
    };

    PlayableTrack.prototype.getCurrentTime = function() {
      return this.audio.currentTime;
    };

    PlayableTrack.prototype.restart = function() {
      this.audio.currentTime = 0;
    };

    PlayableTrack.build = function(track) {
      return API.getStream(track).then(
        function(r) {
          return new PlayableTrack(track, new Audio(r.streamUrl));
        }
      );
    };

    return PlayableTrack;
  });