/**
 * Created by xiaofen on 2015/9/1.
 */
"use strict";
angular.module('FSGW')
    .controller('spiritListController',['$scope',function($scope){
        $scope.orderFlag = "overAll";

        $scope.orderBy = function(orderBase){
            $scope.orderFlag = orderBase;
        }

    }]);
