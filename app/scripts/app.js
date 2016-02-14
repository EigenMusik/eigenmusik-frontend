'use strict';

// Globals configuration.
var REST_API;
var SELF_URL;

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
    'ui.router',
    'pascalprecht.translate',
  ])
  .config(function($urlRouterProvider, $stateProvider, TokenServiceProvider, APIProvider, $translateProvider, $translatePartialLoaderProvider) {

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
      REST_API = 'http://api.eigenmusik.com';
      SELF_URL = 'http://www.eigenmusik.com';

    } else {
      REST_API = 'http://localhost:7070';
      SELF_URL = 'http://localhost:9000';
    }
    TokenServiceProvider.setTokenUrl(REST_API + '/oauth/token');
    TokenServiceProvider.setClientDetails('web', 'secret');
    APIProvider.setApiUrl(REST_API);

    $urlRouterProvider.otherwise('/player');

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
        abstract: true,
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
        url: '',
        templateUrl: 'partials/tracks.html',
      });

    $translatePartialLoaderProvider.addPart('login');
    $translatePartialLoaderProvider.addPart('player');
    $translatePartialLoaderProvider.addPart('register');
    $translatePartialLoaderProvider.addPart('sources');

    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '/messages/{part}/{lang}.json',
      loadFailureHandler: 'messageLoaderErrorHandler'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useSanitizeValueStrategy('sanitize');
  })
  .factory('messageLoaderErrorHandler', ['$q', function ($q) {
    return function () {
      return $q.when({});
    };
  }])
  // Lock down routes when token is not set.
  .run(function(TokenStore, $rootScope, $state) {
    $rootScope.api = REST_API;
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
