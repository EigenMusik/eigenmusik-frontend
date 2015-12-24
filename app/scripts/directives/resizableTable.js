'use strict';

/**
 * @ngdoc function
 * @name eigenmusik.directive:resizableTable
 * @description
 * # resizableTable
 * A fixed header table that resizes with the window.
 */
angular.module('eigenmusik')
  .directive('resizableTable', function($window) {
    return function(scope) {
      var w = angular.element($window);
      var TOP = 100;
      scope.getWindowDimensions = function() {
        return {
          'h': w.height(),
          'w': w.width()
        };
      };

      scope.$watch(scope.getWindowDimensions, function(newValue) {
        scope.windowHeight = newValue.h;
        scope.windowWidth = newValue.w;

        scope.wrapperStyle = function() {
          return {
            'height': (newValue.h - TOP) + 'px',
            'width': newValue.w + 'px',
            'top': TOP + 'px'
          };
        };

        scope.tbodyStyle = function() {
          return {
            'height': (newValue.h - TOP - 50) + 'px',
            'width': newValue.w + 'px',
          };
        };

      }, true);

      w.bind('resize', function() {
        scope.$apply();
      });
    };
  });