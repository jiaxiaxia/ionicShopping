/**
 * Created by xiaofen on 2015/9/7.
 */
"use strict";
angular.module('FSGW')
    .controller('purchaseInfoController',['$scope','$ionicHistory','$http','$filter','$stateParams',
        '$state','getSetService','getSetUserInfoService','purchaseInfoService',
        function($scope,$ionicHistory,$http,$filter,$stateParams,$state,getSetService,getSetUserInfoService,purchaseInfoService){
        //默认余额支付
        $scope.purcharType="3";
        //减少标志
        $scope.clicked=false;
        //接收商品id
        var id = $stateParams.id;
        //购买信息
        $scope.purchaseInfo={purchaseNum:1};
        //用户信息
        $scope.loginUser=getSetUserInfoService.getLoginUser();
        //商品信息
        $scope.shangpingInfo  = $filter('filter')(getSetService.get(),{'id':id})[0];
            //总价
        $scope.purchaseInfo.totalprice =  $scope.purchaseInfo.purchaseNum * $scope.shangpingInfo.price;
            //返回
        $scope.goBack = function(){
            $ionicHistory.goBack();
        }
            /**
             * 减少数量
             */
        $scope.subNum=function(){
            if($scope.purchaseInfo.purchaseNum <=0){
                return;
            }
            $scope.purchaseInfo.purchaseNum--;
            if($scope.purchaseInfo.purchaseNum<=0){
                $scope.clicked=true;
            }
            else{
                $scope.clicked=false;
                $scope.purchaseInfo.totalprice =  $scope.purchaseInfo.purchaseNum * $scope.shangpingInfo.price;
            }
        }
            /**
             * 添加数量
             */
        $scope.addNum=function(){
            $scope.purchaseInfo.purchaseNum++;
            if($scope.purchaseInfo.purchaseNum<=0){
                $scope.clicked=true;
            }
            else{
                $scope.clicked=false;
                $scope.purchaseInfo.totalprice =  $scope.purchaseInfo.purchaseNum * $scope.shangpingInfo.price;
            }
        }
            /**
             * 提交订单
             */
        $scope.submitRecord=function(){
            if($scope.loginUser.jine<$scope.purchaseInfo.totalprice){
                alert("金额不足，请选择其他支付方式");
                return;
            }
            $scope.recordInfo={
                "wupinid":id,
                "num":$scope.purchaseInfo.purchaseNum,
                "totalprice":$scope.purchaseInfo.totalprice ,
                "userid": $scope.loginUser.id,
                "purcharType":$scope.purcharType,
                "username":$scope.loginUser.username,
                "address":$scope.loginUser.address,
                "telephone":$scope.loginUser.telephone
            }
            //将购买信息暂存于service中
            purchaseInfoService.set($scope.recordInfo);
            $state.go('yinlianPage',{
                type:'shangpinlist'
            });
        }
    }]);
