'use strict';
angular.module('FSGW', ['ionic', 'ngCordova', 'ngResource'])
    .constant('baseServerPath','192.168.0.105:8080')
    .run(function($ionicPlatform,getSetUserInfoService,baseServerPath) {
    $ionicPlatform.ready(function() {
        if(!getSetUserInfoService.getServerUrl()){
            getSetUserInfoService.setServerUrl(baseServerPath);
        }
    });
  })

  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {
        $stateProvider.state('login',{//登录界面
         url:'/login',
         templateUrl:'templates/login.html',
         controller:'loginController'
        })
        .state('main',{
          url:'/main',
          abstract:true,
         templateUrl:'templates/Main.html'
        })
        .state('main.homePage',{
          url:'/homePage',
          views:{
              'mainPageView':{
                  templateUrl: 'templates/homePage.html',
                  controller:'homePageController'
              }
          }
         })
        .state('main.fenLeiList',{//分类界面
            url:'/fenLeiList',
            views:{
            'mainPageView':{
                templateUrl:"templates/fenLeiList.html",
                controller:"fenLeiListController"
            }
          }
        })
        .state('shangpingDetail',{//详细页面

                url:'/shangpingDetail',
                templateUrl:'templates/shangpingDetail.html',
                controller:'shangpingDetailController'
            })
        .state('shangpingInfo',{ //商品页面
            url: '/shangpingInfo?id=:shangpingid',
            templateUrl: 'templates/shangpingInfo.html',
            controller:'shangpingInfoController',
            cache:false

        })
        .state('shangpingDetail.shangpingInfoDetail',{ //商品详情页面
            url: '/shangpingInfoDetail',
            views: {
                'spiritPageView': {
                    templateUrl: 'templates/shangpingInfoDetail.html'

                }
            }
        })
        .state('shangpingDetail.shangpingParams',{//商品参数页面
            url: '/shangpingParams',
            views: {
                'spiritPageView': {
                    templateUrl: 'templates/shangpingParams.html'

                }
            }
        })
        .state('purchaseInfo',{//购买信息页面(提交订单)
                url: '/purchaseInfo?id=:pid',
                templateUrl:'templates/purchaseInfo.html',
                controller:'purchaseInfoController'

            })
        .state('addressInfo',{//收货地址管理
                url: '/addressInfo',
                templateUrl:'templates/addressInfo.html',
                controller:'addressInfoController'

            })
        .state('yinlianPage',{//支付界面
               url:'/yinlianPage',
               params:{type:null},
               templateUrl:'templates/yinlianPage.html',
               controller:'yinlianPageController',
                cache:false

        })
        .state('main.myRecordPage',{ //订单页面
                url:'/myRecordPage',
                cache:false,
                views:{
                    'mainPageView':{
                        templateUrl: 'templates/myRecordPage.html',
                        controller:'myRecordController'
                    }
                }
            })
        .state('shoppingCar',{
                url:'/shoppingCar',
                templateUrl:'templates/shoppingCar.html',
                controller:'shoppingCarController',
                cache:false
            })
            .state('admin_home',{ //管理员主页面
                url:'/admin_home',
                templateUrl:'templates/admin/home.html',
                controller:'adminHomeController',
                cache:false
            })
            .state('admin_dingdan',{ //管理员订单页面
                url:'/admin_dingdan',
                templateUrl:'templates/admin/dingdan.html',
                controller:'dingdanController',
                cache:false
            })
            .state('admin_dingdanDetail',{ //管理员订单明细页面
                url:'/admin_dingdanDetail',
                params:{id:null},
                templateUrl:'templates/admin/dingdanDetail.html',
                controller:'dingdanDetailController'
            })
            .state('admin_shangpin',{ //管理员商品页面
                url:'/admin_shangpin',
                templateUrl:'templates/admin/shangpin.html',
                controller:'shangpinController'
            })
            .state('admin_yucun',{
                url:'/admin_yucun',
                templateUrl:'templates/admin/yucun.html',
                controller:'yucunController'
            })
            .state('admin_shangpinDetail',{ //管理员商品明细
                url:'/admin_shangpinDetail',
                params:{id:null},
                templateUrl:'templates/admin/shangpinDetail.html',
                controller:'shangpinDetailController'
            })
            .state('admin_mychart',{
                url:'/admin_echarts',
                params:{wupinid:null,wupinname:null},
                templateUrl:'templates/admin/echarts.html',
                controller:'chartsController'
            })
            .state('main.shangpinList',{ //用户商品列表
                url:'/shangpinList',
                cache:false,
                views:{
                    'mainPageView':{
                        templateUrl: 'templates/shangpinList.html',
                        controller:'shangpinListController'
                    }
                }
            })
            .state('main.setting',{ //用户设置
                url:'/setting',
                cache:false,
                views:{
                    'mainPageView':{
                        templateUrl: 'templates/setting.html',
                        controller:'settingController'
                    }
                }
            })
            .state('userDingdan',{ //用户全部订单
                url:'/userDingdan',
                cache:false,
                templateUrl: 'templates/userDingdan.html',
                controller:'userDingdanController'

            })
       $urlRouterProvider.otherwise("login");
  });


