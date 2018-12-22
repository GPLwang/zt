$(function(){
    mui('.mui-scroll-wrapper').scroll({
        indicators:false
    });
    // 1.初始化渲染
    // 1.1 获取顶级分类数据渲染页面
    // 1.2 根据顶级分类的第一个分类 去加载对应的品牌数据且完成渲染
    // 2. 点击顶级分类加载二级分类
    // 2.1 切换选中的样式
    // 2.2 根据点击的顶级分类去加载对应的品牌数据且完成渲染
    new App();
});
var App = function(){
    //设置顶级分类容器
    this.$top = $('.zt_cateLeft');
    //设置二级分类
    this.$second = $('.zt_cateRight');
    this.init();
};

App.prototype.init = function(){
    //页面初始化调用  对象的入口函数
    this.render();
    this.bindEvent();
}
//渲染
App.prototype.render = function(){
    var that = this;
    this.renderTop(function(topId){
        that.renderSecond(topId);
    });

}
//渲染顶级分类
App.prototype.renderTop = function(callback){
    var that = this;
    $.ajax({
        type:'GET',
        url:'/category/queryTopCategory',
        data:'',
        dataType:'json',
        success:function(data){
            that.$top.html(template('top', data.rows));
            var topId = data.rows[0].id;
            callback && callback(topId);
        }
    })
}
//渲染二级分类
App.prototype.renderSecond = function(topId){

}
//绑定事件
App.prototype.bindEvent = function(){

}