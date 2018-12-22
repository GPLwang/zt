$(function () {
    new App();
});
var App = function () {
    this.$el = $('.zt_history');
    this.key = 'zt_heima_history_59';
    $('.zt_search input').val('');
    // 数据类型是array  获取本地存储中列表数据
    this.list = JSON.parse(localStorage.getItem(this.key) || '[]');
    this.init();
};
//入口函数
App.prototype.init = function () {
    this.render();
    this.bindEvent();
}
//默认渲染
App.prototype.render = function () {
    //数据存在localstorage  约定 key  value '["a","b"]'
    this.$el.html(template('history',{list:this.list}));
}
//绑定事件
App.prototype.bindEvent = function () {
    var that = this;
    //点击搜索
    $('.zt_search').on('tap','a',function(){
        var value = $.trim($('.zt_search').find('input').val());
        //未输入内容
        if(!value){
            mui.toast('请输入关键字');     
            return;
        }
        that.pushHistory(value);
    });
}
//追加历史
App.prototype.pushHistory = function (value) {
    //有没有相同的内容  是否到达十条
    var isSame = false;
    var sameIndex = null;
    this.list.forEach(function(item,i){
        if(item === value){
            isSame = true;
            sameIndex = i;
        }
    });
    if(isSame){
        this.list.splice(sameIndex,1);
    }else if(this.list.length >= 10){
        this.list.splice(0,1);
    }
        this.list.push(value); 
        localStorage.setItem(this.key,JSON.stringify(this.list));
        location.href = 'searchList.html';
}
//删除历史
App.prototype.delHistory = function () {

}
//清空历史
App.prototype.clearHistory = function () {

}