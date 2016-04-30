/**
 * Created by xiaofen on 2015/9/1.
 */
"use strict";
angular.module('FSGW')
    .controller('shangpingDetailController',['$scope','$state','$timeout','$ionicHistory','$stateParams',
        function($scope,$state,$timeout,$ionicHistory,$stateParams){
        $scope.shangpingId=$stateParams.id;
        $scope.spiritPage = "spiritInfo";
        $scope.goSpiritPage = function(param){
            $scope.spiritPage = param;
            if(param==="shangpingInfo"){
                $state.go('shangpingDetail.shangpingInfo');
            }else if(param==="shangpingInfoDetail"){
                $state.go('shangpingDetail.shangpingInfoDetail');
            }else{
                $state.go('shangpingDetail.shangpingParams');
            }
        }
 /*******************商品页面***********************************************************************/
        $scope.images = [];
        $scope.images.push({path:"images/jinbuhuan_01.jpg"});
        $scope.images.push({path:"images/jinbuhuan_02.jpg"});
        $scope.images.push({path:"images/jinbuhuan_03.jpg"});
        $scope.images.push({path:"images/gujinggognjiu_01.jpg"});
        $scope.images.push({path:"images/gujinggognjiu_02.jpg"});


/*********************详情*************************************************************/
        $scope.detailImages =[]; //详请页面图片
        $scope.loadMoreParam  = { //一次加载2张图片，下拉加载更多
            moreDataCanBeLoaded:true,
            currentPage:1
        };
        $scope.detailImages.push({path:"images/jinbuhuan_01.jpg"});
        $scope.detailImages.push({path:"images/jinbuhuan_02.jpg"});
        //下拉刷新,详情页面，首先加载两张图片，下拉加载更多
        $scope.loadMore = function(){
            if(!$scope.loadMoreParam.moreDataCanBeLoaded){
                $scope.$broadcast('scroll.infiniteScrollComplete');
                return;
            }
            $scope.loadMoreParam.currentPage += 1;
            $timeout(function(){
                $scope.detailImages.push({path:"images/jinbuhuan_03.jpg"});
                $scope.detailImages.push({path:"images/gujinggognjiu_01.jpg"});
                $scope.detailImages.push({path:"images/gujinggognjiu_02.jpg"});
                $scope.loadMoreParam.moreDataCanBeLoaded = false;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            },1000);
        }
 /*********************************参数***********************************************************/
        $scope.spiritParmas = [
            {paramName:"体积(ml)","paramValue":2700},
            {paramName:"品牌","paramValue":"金不换"},
            {paramName:"系列","paramValue":"52度金呼唤明窖收藏5 450ml 六瓶套装"},
            {paramName:"产地","paramValue":"中国大陆地区"},
            {paramName:"省份","paramValue":"安徽"},
            {paramName:"香型","paramValue":"浓香型"},
            {paramName:"酒精纯度","paramValue":"高度白酒(50%以上)"}
        ];
/*************************************************************************************************/
            /**
             * 返回
             */
        $scope.goBack = function(){
            var currentView = $ionicHistory.currentStateName();

                if(currentView==="shangpingDetail.shangpingInfoDetail" || currentView==="shangpingDetail.shangpingParams"){
                    $scope.spiritPage = "shangpingInfo";
                    $state.go("shangpingDetail.shangpingInfo");
                }else if(currentView==="shangpingDetail.shangpingInfo"){
                    $state.go("main.homePage");
                }

        }
            /**
             * 立即购买
             */
            $scope.purchase = function(){
                $state.go("purchaseInfo",{"id":$scope.shangpingId});
            }
    }]);
