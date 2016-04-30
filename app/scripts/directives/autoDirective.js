/**
 * Created by xiaofen on 2015/9/7.
 */
"use strict";
angular.module('FSGW')
    .directive('autoExtend', [function() {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                var update = function() {
                    element.css('height', 'auto');
                    var height = element[0].scrollHeight;
                    element.css('height', height + 'px');
                };
                scope.$watch(attr.ngModel, function() {
                    update();
                });
            }
        };
    }])
