$(function () {
    mui('.mui-scroll-wrapper').scroll({
        indicators: false
    });
    new App();
})
var App = function () {
    this.$el = $('.mui-scroll');
    this.proId = zt.getParamsByUrl().proId;
    this.init();
}
App.prototype.init = function () {
    var that = this;
    that.initPullRefreshDown();
    that.bindEvent();
}
App.prototype.render = function (callback) {
    var that = this;
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetail',
        data: { id: that.proId },
        dataType: 'json',
        success: function (data) {
            callback&&callback(data)
        }
    })
}
App.prototype.bindEvent = function () {
    var that = this;
    that.$el.on('tap','.pro_size span',function(){
        that.changeSize(this);
    })
    $('.btn_cart').on('tap',function(){
        that.addCart();
    })
}
App.prototype.initPullRefreshDown = function () {
    var that = this;
    mui.init({
        pullRefresh: {
            container: '.mui-scroll-wrapper',
            indicators: false,
            down: {
                auto: true,
                callback: function () {
                    var _self = this;
                    that.render(function (data) {
                        //渲染
                        that.$el.html(template('detail',data))
                        //需要初始化 动态渲染轮播图组件
                        mui('.mui-slider').slider();
                        mui('.mui-numbox').numbox();
                        //清除下拉刷新效果
                        _self.endPulldownToRefresh();
                    })
                }
            }
        }
    })
}
//尺码
App.prototype.changeSize = function (btn) {
    var $curr = $(btn);
    $curr.addClass('now').siblings('span').removeClass('now');
}
App.prototype.addCart = function () {
    var that = this;
    // 获取尺码数量
    var num = mui('.mui-numbox').numbox().getValue();
    var size = $('.pro_size span.now').data('size');
    if(!size){
        mui.toast('请选择尺码');
        return;
    }
    $.ajax({
        type:'post',
        url:'/cart/updateCart',
        data:{
            size:size,
            num:num,
            proId:that.proId
        },
        dataType:'json',
        success:function(data){
            if(data.error === 400){
                location.href = '/mobile/user/login.html?returnUrl='+encodeURIComponent(location.href);
            }
        }
    })
}

