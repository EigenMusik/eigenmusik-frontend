'use strict';

describe('Controller: LoginController', function() {

    var LoginController, $rootScope, scope, mockTokenService, TokenStore;

    beforeEach(module('eigenmusik'));

    beforeEach(inject(function($controller, _$rootScope_, $q, _TokenStore_) {
        $rootScope = _$rootScope_;
        TokenStore = _TokenStore_;

        $rootScope.checkUser = function() {};

        mockTokenService = {
            login: function(username) {
                switch (username) {
                    case 'incorrectUser':
                        return $q.reject(400);
                    case 'userWithBadConnection':
                        return $q.reject(-1);
                    case 'aDodgyUser':
                        return $q.reject(666);
                    case 'aCorrectUser':
                        return $q.resolve({
                            access_token: 'XXX'
                        });
                }
            }
        };

        scope = _$rootScope_.$new();

        LoginController = $controller('LoginController', {
            $rootScope: _$rootScope_,
            $scope: scope,
            TokenService: mockTokenService,
            TokenStore: _TokenStore_
        });
    }));

    it('should alert incorrect user', function() {
        scope.username = 'incorrectUser';
        scope.login();
        $rootScope.$apply();
        expect(scope.alert).toEqual('Incorrect username or password.');
    });

    it('should alert if server is down', function() {
        scope.username = 'userWithBadConnection';
        scope.login();
        $rootScope.$apply();
        expect(scope.alert).toEqual('Couldn\'t connect to server.');
    });

    it('should get an access token for a correct user', function() {
        scope.username = 'aCorrectUser';
        scope.login();
        $rootScope.$apply();
        expect(TokenStore.get()).toEqual('XXX');
    });

    it('should alert if there\'s an unknown error', function() {
        scope.username = 'aDodgyUser';
        scope.login();
        $rootScope.$apply();
        expect(scope.alert).toEqual('Unknown error occurred :(');
    });
});