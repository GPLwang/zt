if(!window.zt){
    window.zt = {};
}


zt.getParamsByUrl = function(){
    var obj = {};
    var search = location.search;
    if(search){
        search = search.replace(/^\?/,'');
        var arr = search.split('&');
        arr.forEach(function(item,i){
            var itemArr = item.split('=');
            obj[itemArr[0]] = decodeURIComponent(itemArr[1]); 
        })
    }
 
 
    return obj;
}