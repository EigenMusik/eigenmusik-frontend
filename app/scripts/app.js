'use strict';

// Globals configuration.
var REST_API;

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
    'ngTouch'
  ])
  .config(function($routeProvider, TokenServiceProvider, APIProvider) {

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
    TokenServiceProvider.setTokenUrl(REST_API + '/oauth/token');
    TokenServiceProvider.setClientDetails('web', 'secret');
    APIProvider.setApiUrl(REST_API);

    $routeProvider.
      when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
      })
      .otherwise({
        redirectTo: '/'
    });
  });