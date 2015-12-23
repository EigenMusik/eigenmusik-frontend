'use strict';

/**
 * @ngdoc function
 * @name eigenmusik.directive:loadingButton
 * @description
 * # player
 * Loading button .
 */
angular.module('eigenmusik')
.directive('loadingButton', function() {
    return function (scope, element) {
        scope.isLoading = function () {
            return scope.loading;
        };
        var originalContents = element.contents();
        scope.$watch(scope.isLoading, function (loading) {
            if (loading) {
                element.html('<span class="glyphicon spin glyphicon-refresh" aria-hidden="true"></span>');
            } else {
                element.html(originalContents);
            }
        }, true);
    };
});
