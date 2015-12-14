'use strict';

var Soundcloud;

angular.module('eigenmusik')
.factory('TrackFactory', function () {
    return {
        new: function(track) {
            if (track.type === 'SOUNDCLOUD') {
            	var sc = new Soundcloud();
                return sc.getAudio(track);
            }
            return;
        }
    };
});

