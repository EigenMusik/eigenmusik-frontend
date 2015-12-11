'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('eigenmusik'));

  var LoginController, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoginController = $controller('LoginController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

});
