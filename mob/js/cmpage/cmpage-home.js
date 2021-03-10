//关闭back、menu按键监听，这样侧滑主界面会自动获得back和memu的按键事件，仅在主界面处理按键逻辑即可；

var listhtml = "";
mui.init({

});
var main = null;
mui.plusReady(function () {
    //仅支持竖屏显示
    plus.screen.lockOrientation("portrait-primary");
    main = plus.webview.currentWebview().opener();
    getMenuList(); //取菜单
});

mui('.erp-menu-list').on('tap', '.erp-menu-item', function (event) {
    console.log("1111111111111");
    var title = this.innerHTML;
    var menu = this;
    var id = this.getAttribute("id");
    var modulename = this.getAttribute('modulename');
    var parms = this.getAttribute('parms');
    mui.fire(main, "menulist_callback", {
        title: menu.getAttribute('title'),
        id: menu.getAttribute('id'),
        modulename: menu.getAttribute('modulename'),
        url: menu.getAttribute('url'),
        parms: parms
    });
});


/**
 * 从服务器取菜单列表
 *
 */
function getMenuList() {
    plus.nativeUI.showWaiting("数据加载中...");
    mui.ajax(app.getDomain() + "/admin/mob/get_menus", {
        data: {},
        type: "post",
        dataType: 'json',
        timeout: 5000,
        error: function (request) {
            app.toast("服务器获取数据失败！");
        },
        success: function (data) {
            //console.log(JSON.stringify(data));

            var menulist = data.menus;
            var buttonlist = data.btns;

            initview(menulist, buttonlist);

            plus.nativeUI.closeWaiting();
        }
    });
}


function initview(menulist) {
    var z = 0;

    for (var i = 0; i < menulist.length; i++) {

        listhtml += '<div class="mui-card"> <div class="mui-card-header">'+menulist[i].title+'</div> <div class="mui-card-content"> <ul class="mui-table-view mui-grid-view mui-grid-9">';
        for (var j = 0; j < menulist[i].modules.length; j++) {
            if(menulist[i].modules[j].modulename != "Home"){
                listhtml += '<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4"><a id="' + menulist[i].modules[j].modulename + z + '" modulename="' + menulist[i].modules[j].modulename + '" parmsUrl="' + menulist[i].modules[j].parmsUrl + '" title="' + menulist[i].modules[j].title + '" url="' + menulist[i].modules[j].url + '" class="mui-navigate-right erp-menu-item"><span class="mui-icon iconfont '+menulist[i].modules[j].icon+' mui-active"></span></a><div class="mui-media-body" style="font-size:12px;">'+ menulist[i].modules[j].title +'</div></li>';
                z++;
            }
            
        }
        listhtml += '</ul></div></div>';
    }
    document.body.querySelector('.erp-menu-list').innerHTML = listhtml;
    console.log("-----------listhtml--------------");
    console.log(listhtml);

}


