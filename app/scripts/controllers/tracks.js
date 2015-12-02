'use strict';

// Player configuration.

SC.initialize({
  client_id: 'f434bba227f3c05662515accf6d287fc',
});

/**
 * @ngdoc function
 * @name eigenmusik.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the eigenmusik
 */
angular.module('eigenmusik')
  .controller('TracksCtrl', ['Track', '$scope', function (Track, $scope) {
    Track.query({} , function(data) {
      $scope.ScTracks = data._embedded.tracks;

      $scope.player;

      $scope.play = function(id) {
        console.log('Playing ' + id);
        SC.stream('/tracks/' + id).then(
            function(player) {
                if ($scope.player) {
                    $scope.player.pause();
                };
                $scope.player = player;
                $scope.player.play();
            });
      }
    });
    // SC.stream('/tracks/109712283').then(function(player){
    //   player.play();
    // });
}])
.directive('track', function() {
  return {
    template: '{{customer.name}} Address: {{customer.address}}'
  };
});


  ;
