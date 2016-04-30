/**
 * Created by xiaofen on 2015/9/7.
 */
"use strict";
angular.module('FSGW')
    .controller('addressInfoController',['$scope','$ionicHistory',function($scope,$ionicHistory){
        $scope.addressInfo={};

        $scope.goBack = function(){
            $ionicHistory.goBack();
        }
        $scope.completeAddress = function(form){
            if(form.$invalid){ //验证失败

            }else{

            }
        }
        var validAddressInfo = function(){
            if(_.isEmpty(_.trim(addressInfo.name,''))){
                return "未填写姓名";
            }else if(_.isEmpty(_.trim(companyInfo.IndustryName,''))){
                return "未填写手机号码";
            }else if(_.isEmpty(_.trim(companyInfo.Nature,''))){
                return "请输入公司性质";
            }else if(_.isEmpty(_.trim(companyInfo.Scale,''))){
                return "请输入公司规模";
            }else if(_.isEmpty(_.trim(companyInfo.Address,''))){
                return "请输入公司地址";
            }else if(_.isEmpty(_.trim(companyInfo.PhoneNum1,''))){
                return "请输入联系电话";
            }else if(_.isEmpty(_.trim(companyInfo.jobRequire,''))){
                return "请输入公司简介";
            }else{
                return "保存失败";
            }
        }
    }]);
