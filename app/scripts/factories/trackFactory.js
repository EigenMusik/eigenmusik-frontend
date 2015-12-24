'use strict';

/**
 * @ngdoc function
 * @name eigenmusik.factory:TrackFactory
 * @description
 * # TrackFactory
 * Builds a track from the given playback source.
 */
angular.module('eigenmusik')
  .factory('TrackFactory', function(SoundcloudTrack) {
    return {
      build: function(track) {
        if (track.type === 'SOUNDCLOUD') {
          return SoundcloudTrack.build(track);
        }
        return;
      }
    };
  });