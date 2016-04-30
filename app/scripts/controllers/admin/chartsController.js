/**
 * Created by apple on 16/4/23.
 */
angular.module('FSGW')
.controller('chartsController',['$scope','$ionicHistory','$stateParams','$http','getSetUserInfoService',function($scope,$ionicHistory,$stateParams,$http,getSetUserInfoService){
    $scope.wupinid=$stateParams.wupinid;
    $scope.wupinname="";
    $scope.yearList=['2015','2016'];
    $scope.year='2016';
    if($scope.wupinid!=='-1') {//具体的某个产品
        $scope.wupinname=$stateParams.wupinname;
    }
    else{//汇总
        $scope.wupinname='所有商品';
    }
    $scope.xiaoliangData=[];//图表数据
    $scope.lirongData=[]

    $scope.goBack=function(){
        $ionicHistory.goBack();
    }
    //获取数据
    var loadDate=function(){

        $http.get(getSetUserInfoService.getAddr()+'/user/getXiaoliang?wupinid='+$scope.wupinid+"&year="+2016)//请求已销量数据
            .success(function(dataXiaoLiang){
                $http.get(getSetUserInfoService.getAddr()+'/user/getLirun?wupinid='+$scope.wupinid+"&year="+2016).success(function(dataLiRong){
                    filterData(dataXiaoLiang.rows,dataLiRong.rows);
                    //初始化图表
                    //初始化图标选项
                    $scope.option= {
                        title:{
                            text:$scope.wupinname
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            data:['已销量','利润']
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data :['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : [
                            {
                                name:'已销量',
                                type:'bar',
                                data:$scope.xiaoliangData
                            },
                            {
                                name:'利润',
                                type:'bar',
                                data:$scope.lirongData
                            }

                        ]
                    };
                    $scope.myCharts=echarts.init(document.getElementById('mayChart'));
                    $scope.myCharts.setOption($scope.option);
                })

            })
    }
    //处理1数据
    var filterData=function(xiaoliangData,lirongData) {
        //先将数据组织成图标需要的格式
        for (var  i= 0; i <12; i++) {
            $scope.flag=false;
            for (var j = 0; j < xiaoliangData.length; j++) {
                //$scope.charData[data[j]._month] = data[j].value;
                if((i+1)==xiaoliangData[j]._month){
                    $scope.xiaoliangData[i]=xiaoliangData[j]._value;
                    $scope.lirongData[i]=lirongData[j]._value;
                    $scope.flag=true;
                    break;
                }
            }
            if(!$scope.flag){
                $scope.xiaoliangData[i]=0;
                $scope.lirongData[i]=0;

            }
        }


    }

    //从后台加载图表数据
    loadDate();


}])
