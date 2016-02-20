'use strict';

describe('Controller: PlayerController', function() {

    var PlayerController, $rootScope, scope, mockTrackFactory, mockAPI, $httpBackend;

    var tracks = [{
        album: null,
        artist: null,
        createdBy: null,
        createdOn: '2015-12-23T21:09:53.836+0000',
        duration: 12345678,
        name: 'Sticky Fingers - How To Fly',
        type: 'SOUNDCLOUD',
        uri: '109712283',
    }, {
        album: null,
        artist: null,
        createdBy: null,
        createdOn: '2015-12-23T21:09:53.836+0000',
        duration: 12345678,
        name: 'Sticky Fingers - How To Fly',
        type: 'SOUNDCLOUD',
        uri: '109712283',
    }];

    var response = {
        content: tracks
    };

    beforeEach(module('eigenmusik'));

    // Ignore the initial template GET request with ui-router.
    beforeEach(module(function($urlRouterProvider, $translateProvider) {
        $urlRouterProvider.deferIntercept();
        $translateProvider.translations('en', {});
    }));

    beforeEach(inject(function($controller, _$rootScope_, $q, _$httpBackend_) {
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;

        var mockTrack = {
            onFinish: function() {

            },
            play: function() {

            },
            track: null
        };

        mockTrackFactory = {
            build: function(track) {
                mockTrack.track = track;
                return $q.resolve(mockTrack);
            }
        };

        mockAPI = {
            getMe: function() {
                return $q.resolve({
                    displayName: 'user0',
                    gravatarUrl: null,
                    reputation: 1295,
                });
            },
            getTracks: function() {
                return $q.resolve(response);
            },
            checkToken: function() {
                return $q.resolve(response);
            }
        };

        scope = _$rootScope_.$new();

        PlayerController = $controller('PlayerController', {
            $scope: scope,
            $rootScope: _$rootScope_,
            API: mockAPI,
            TrackFactory: mockTrackFactory
        });
    }));

    beforeEach(function() {
        $httpBackend.expectGET('partials/player.html').respond('<div>mock template</div>');
    });

    it('should load user details and tracks on login', function() {
        $rootScope.$emit('login');
        $rootScope.$apply();
        expect(scope.user.displayName).toEqual('user0');
        expect(scope.tracks).toEqual(tracks);
    });

    it('should play first track of logged in user', function() {
        $rootScope.$emit('login');
        $rootScope.$apply();
        scope.play(0);
        expect(scope.currentTrackNumber).toEqual(0);
    });

    it('should play next track of logged in user', function() {
        $rootScope.$emit('login');
        $rootScope.$apply();
        scope.play(0);
        scope.next();
        expect(scope.currentTrackNumber).toEqual(1);
    });

    it('should play previous track of logged in user', function() {
        $rootScope.$emit('login');
        $rootScope.$apply();
        scope.play(1);
        scope.prev();
        expect(scope.currentTrackNumber).toEqual(0);
    });

    it('should not play previous when current is 0', function() {
        $rootScope.$emit('login');
        $rootScope.$apply();
        scope.play(0);
        scope.prev();
        expect(scope.currentTrackNumber).toEqual(0);
    });

    it('should play first track', function() {
        $rootScope.$emit('login');
        $rootScope.$apply();
        scope.playPause();
        expect(scope.currentTrackNumber).toEqual(0);
    });
});
