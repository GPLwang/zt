$(function(){
   // mui('.mui-scroll-wrapper').scroll({indicators:false});
    mui.init({
        //需要初始化的组件
        pullRefresh:{
            //需要初始化容器组件的盒子
            container:'.mui-scroll-wrapper',
            //下拉刷新
            down:{
                auto:true, //页面初始化自动刷新一次
                callback:function(){
                    //在下拉操作释放的时候触发回调函数
                    //向后台拉取数据  
                    //拉去成功后  清楚正在刷新的效果
                    //  mui('.mui-scroll-wrapper').pullRefresh()获取组件对象
                    //  文档有问题   endPulldownToRefresh();
                    var _self = this;
                    //this是当前的组件对象
                    // mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                    _self.endPulldownToRefresh(); 
                }
            },
            up:{
                callback:function(){
                    var _self = this;
                    _self.endPullupToRefresh(false); 
                }
            }

        }
    })
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
    this.init();
}
//入口函数
App.prototype.init = function(){

}
//获取数据渲染
App.prototype.render = function(){

}
//初始化上下拉
App.prototype.initPullRefresh = function(){

}
//绑定事件
App.prototype.bindEvent = function(){

}

App.prototype.search = function(){

}
App.prototype.order = function(){

}
