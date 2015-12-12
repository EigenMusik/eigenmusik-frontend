'use strict';

describe('Service: TokenService', function () {

  var oauthEndpoint = 'http://localhost:7070/oauth/token';
  var TokenService, TokenStore, $rootScope, $httpBackend, $http, authRequestHandler;

  function paramsHelper(username, password) {
    return 'grant_type=password&username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
  }

  beforeEach(module('eigenmusik'), function(TokenServiceProvider) {
    TokenServiceProvider.setTokenUrl(oauthEndpoint);
  });

  beforeEach(inject(function (_TokenService_, _TokenStore_, _$rootScope_, _$httpBackend_, _$http_) {
    TokenService = _TokenService_;
    TokenStore = _TokenStore_;
    $rootScope = _$rootScope_;
    $httpBackend = _$httpBackend_;
    $http = _$http_;

    authRequestHandler = $httpBackend.when(
      'POST', 
      oauthEndpoint
    ).respond({'token':'xxx'});

  }));

  afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

  it('should return token for actual user', function() {
    $httpBackend.expectPOST(oauthEndpoint, paramsHelper('aUser', 'aPassword'));
    var result;
    TokenService.login('aUser','aPassword').then(
      function(response) {
        result = response;
      },
      function(err) {
        result = err;
      }
    );
    $httpBackend.flush();
    expect(result.token).toBe('xxx');
  });

  it('should not return token for unauthenticated user', function() {
    authRequestHandler.respond(401);
    $httpBackend.expectPOST(oauthEndpoint, paramsHelper('aUser', 'aPassword'));
    var result;
    TokenService.login('aUser','aPassword').then(
      function(response) {
        result = response;
      },
      function(err) {
        result = err;
      }
    );
    $httpBackend.flush();
    expect(result).toBe(401);
  });

  it('should add token to request header', function() {
    var token = 'xxx';
    TokenStore.set(token);
    $httpBackend.expectGET(oauthEndpoint, {Accept:'application/json, text/plain, */*', Authorization:'Bearer ' + token}).respond(400);
    $http.get(oauthEndpoint);
    $httpBackend.flush();
  });

  it('should not have token in request header', function() {
    $httpBackend.expectGET(oauthEndpoint).respond(400);
    $http.get(oauthEndpoint);
    $httpBackend.flush();
  });
});
