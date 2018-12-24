$(function(){
   // mui('.mui-scroll-wrapper').scroll({indicators:false});
    // mui.init({
    //     //需要初始化的组件
    //     pullRefresh:{
    //         //需要初始化容器组件的盒子
    //         container:'.mui-scroll-wrapper',
    //         //下拉刷新
    //         down:{
    //             auto:true, //页面初始化自动刷新一次
    //             callback:function(){
    //                 //在下拉操作释放的时候触发回调函数
    //                 //向后台拉取数据  
    //                 //拉去成功后  清楚正在刷新的效果
    //                 //  mui('.mui-scroll-wrapper').pullRefresh()获取组件对象
    //                 //  文档有问题   endPulldownToRefresh();
    //                 var _self = this;
    //                 //this是当前的组件对象
    //                 // mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
    //                 _self.endPulldownToRefresh(); 
    //             }
    //         },
    //         up:{
    //             callback:function(){
    //                 var _self = this;
    //                 _self.endPullupToRefresh(false); 
    //             }
    //         }

    //     }
    // })
    // 1.初始化   获取地址栏参数设置给搜索框   
    // 2.主动触发一次下拉刷新  去加载第一页的商品数据完成渲染
    // 3.当下拉操作后 重新向后台获取第一页数据且完成页面渲染
    // 4.当上拉操作后 去加载下一页数据 且 完成页面渲染
    // 5.点击搜索后 根据输的内容重新搜索 且获取第一页数据完成页面渲染
    // 6.点击排序 根据当前的排序类型和排序的条件 和 升序or降序 去更新列表 获取第一页数据完成渲染
    // 
    new App();
})
var App = function(){
    var that = this;
    this.proName = zt.getParamsByUrl().proName;
    this.page = 1;
    this.pageSize = 4;
    //设置搜索内容给搜索框
    this.$searchInput = $('.zt_search input').val(this.proName);
    this.$searchBtn = $('.zt_search a');
    //排序容器
    this.$order = $('.zt_order');
    //产品容器待渲染
    this.$product = $('.zt_product');
    this.init();
    // that.initPullRefresh();
    
}
//入口函数
App.prototype.init = function(){
    var that = this;
    // this.render();
    that.initPullRefresh();
    that.bindEvent();
}
//获取数据渲染
App.prototype.render = function(callback){  
    var that = this;
    //实现获取数据 成功后区调用回调函数 传入数据给回调函数
    $.ajax({
        type:'get',
        url:'/product/queryProduct',
        data:{
            proName:that.proName,
            page:that.page,
            pageSize:that.pageSize,
            [that.orderType]:that.orderValue
        },
        dataType:'json',
        success:function(data){
            callback && callback(data);
        }
    })
}
//初始化上下拉
App.prototype.initPullRefresh = function(){
    var that = this;
    mui.init({
        pullRefresh:{
            container:'.mui-scroll-wrapper',
            indicators:false,
            down:{
                auto:true,
                callback:function(){
                    var _self = this;
                    that.page = 1;
                    that.render(function(res){
                        //渲染后 清除下拉效果  提换内容
                    //   console.log(res);
                      that.$product.html(template('product',res));
                      _self.endPulldownToRefresh();
                      // 开启上拉加载功能  目的:以前加载的时候可能禁用了上拉加载效果
                      mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
                    });
                }
            },
            up:{
                callback:function(){
                    that.page++;
                    var _self = this;
                    that.render(function(res){
                        //渲染后 清除上拉效果
                        that.$product.append(template('product',res));
                        _self.endPullupToRefresh(!res.data.length);
                    }); 
                }
            }
        }
    })
}
//绑定事件
App.prototype.bindEvent = function(){
    var that = this;
    that.$searchBtn.on('tap',function(){
        that.search();
    })
    that.$order.on('tap','a',function(){
        that.order(this);
    })
}
//搜索操作
App.prototype.search = function(){
    var that = this;
    //获取输入的内容
    var value = $.trim(that.$searchInput.val());
    //简单校验
    if(!value){
        mui.toast('请输入关键字!');
        return;
    }
    //根据输入的内容渲染
    that.proName = value;
    //通过下拉刷新去更新内容
    //触发一次下拉刷新操作   pulldownLoading
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();


}
//排序操作
App.prototype.order = function(btn){
    var $curr = $(btn);
    var $currSpan = $curr.find('span');
    if($curr.hasClass('now')){
       if($currSpan.hasClass('fa-angle-down')){
           $currSpan.attr('class','fa fa-angle-up');
       }else{
           $currSpan.attr('class','fa fa-angle-down');
       }
    }else{
        $curr.addClass('now').siblings('a').removeClass('now').find('span').attr('class','fa fa-angle-down');
    }
    //根据当前的排序徐类型  升还是降  去渲染页面
    this.orderType = $curr.data('type');
    this.orderValue =  $currSpan.hasClass('fa-angle-down')? 2 : 1;
    //触发一次下拉刷新 
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
}
