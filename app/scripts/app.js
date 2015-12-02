'use strict';

// Globals configuration.
var REST_API;

/**
 * @ngdoc overview
 * @name eigenmusik
 * @description
 * # eigenmusik
 *
 * Main module of the application.
 */
angular
  .module('eigenmusik', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, TokenServiceProvider) {

    var prod;
    // Detect current environment.
    switch( window.location.hostname ){
      case 'localhost':
      case '127.0.0.1':
        prod = false;
        break;
      case 'www.eigenmusik.com':
      case 'eigenmusik.com':
        prod = true;
        break;
      default:
        throw('Unknown environment: ' + window.location.hostname );
    }

    // Configure for the detected environment.
    if (prod) {
      REST_API = 'http://eigenmusik-backend.herokuapp.com';
    } else {
      REST_API = 'http://localhost:7070';
    }

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/account', {
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl',
        controllerAs: 'account'
      })
      .when('/tracks', {
        templateUrl: 'views/tracks.html',
        controller: 'TracksCtrl',
        controllerAs: 'tracks'
      })
      .otherwise({
        redirectTo: '/'
      });


      TokenServiceProvider.setTokenUrl(REST_API + '/oauth/token');
      TokenServiceProvider.setClientDetails('web', 'secret');

  });
