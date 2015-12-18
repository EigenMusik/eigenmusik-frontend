'use strict';

/* globals $, SC */

// jscs:disable
SC.initialize({
  client_id: 'f434bba227f3c05662515accf6d287fc',
});
// jscs:enable

function Soundcloud() {
}

Soundcloud.prototype.getAudio = function(track) {
    return SC.stream('/tracks/' + track.uri).then(
        function(player) {

            var streamUrl;

            $.ajax({
                url: player.options.streamUrlsEndpoint,
                success: function (result) {
                    // jscs:disable
                    streamUrl = result.http_mp3_128_url;
                    // jscs:enable
                },
                async: false
            });

            track.stream = new Audio(streamUrl);
            return track;
        }
    );
};
