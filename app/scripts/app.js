'use strict';

// Globals configuration.
var REST_API;
var SC_CLIENT_ID;
var SC;

/**
 * @ngdoc overview
 * @name eigenmusik
 * @description
 * # eigenmusik
 *
 * Configuration of the application.
 */
angular
  .module('eigenmusik', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(function($urlRouterProvider, $stateProvider, TokenServiceProvider, APIProvider) {

    var prod;
    // Detect current environment.
    switch (window.location.hostname) {
      case 'localhost':
      case '127.0.0.1':
        prod = false;
        break;
      case 'www.eigenmusik.com':
      case 'eigenmusik.com':
        prod = true;
        break;
      default:
        throw ('Unknown environment: ' + window.location.hostname);
    }

    // Configure for the detected environment.
    if (prod) {
      REST_API = 'http://eigenmusik-backend.herokuapp.com';
      SC_CLIENT_ID = 'f434bba227f3c05662515accf6d287fc';
    } else {
      REST_API = 'http://localhost:7070';
      SC_CLIENT_ID = '184ffc1f8e74dcb4aba252c10235a121';
    }

    // jscs:disable
    SC.initialize({
      client_id: SC_CLIENT_ID,
    });
    // jscs:enable

    TokenServiceProvider.setTokenUrl(REST_API + '/oauth/token');
    TokenServiceProvider.setClientDetails('web', 'secret');
    APIProvider.setApiUrl(REST_API);

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'partials/register.html',
        controller: 'RegistrationController',
      })
      .state('player', {
        url: '/player',
        templateUrl: 'partials/player.html',
        controller: 'PlayerController',
        data: {
          authorization: true
        }
      })
      .state('player.sources', {
        url: '/sources',
        templateUrl: 'partials/sources.html',
        controller: 'SourcesController',
      })
      .state('player.tracks', {
        url: '/tracks',
        templateUrl: 'partials/tracks.html',
      });

  })
  // Lock down routes when token is not set.
  .run(function(TokenStore, $rootScope, $state) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
      if (!TokenStore.isSet() && toState.data && toState.data.authorization) {
        $state.go('login');
      }
    });
    $rootScope.$on('logout', function() {
      TokenStore.delete();
      $state.go('login');
    });
  });